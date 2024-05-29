import express from 'express';
import { getDatabase } from '../../utils/database';
import sqlite3 from 'better-sqlite3';

import { API, DB } from '../../../';
import { Logger } from '../../utils/logger';
import { requireAuthorization } from '../../utils/auth';
import { hexColorToInt, intColorToHex } from '../../utils/colors';

const router = express.Router();

router.use(express.json());

router.get('/locations/shopping', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase();
    const dbResponse = db.prepare('SELECT * FROM shopping_locations WHERE pending = 0').all() as DB.ShoppingLocation[];

    const response: API.ShoppingLocationsResponse = {
      data: dbResponse.map((row: DB.ShoppingLocation) => {
        let apiColor: string | undefined = undefined;
        if (row.color !== null) {
          apiColor = intColorToHex(row.color);
        }

        let imageURI: string;
        if (row.image !== null) {
          imageURI = row.image;
        } else {
          imageURI = '/assets/images/location-placeholder.svg';
        }

        const response: API.ShoppingLocation = {
          id: row.id,
          name: row.name,
          description: row.description ?? undefined,
          address: row.address ?? undefined,
          color: apiColor,
          image: imageURI,
        };

        return response;
      }),
      error: null
    };

    res.json(response);
  } catch(err) {
    Logger.error(`Couldn't GET ${req.path}`, err);

    const response: API.ShoppingLocationsResponse = {
      data: null,
      error: {
        name: 'UNKNOWN',
        message: "An unknown error has occurred."
      }
    };

    res.json(response);
  } finally {
    db?.close();
  }
});

async function insertShoppingLocation(request: API.NewShoppingLocationRequest, pending: boolean): Promise<void> {
  let db: sqlite3.Database | undefined;
  try {
    const pendingInt = pending ? 1 : 0;

    let dbColor: number | null = null;
    if (request.color !== undefined) {
      dbColor = hexColorToInt(request.color);
    }

    db = getDatabase();
    db.prepare('INSERT INTO shopping_locations(name, description, address, color, image, pending) VALUES(?, ?, ?, ?, ?, ?)')
      .run(request.name, request.description, request.address, dbColor, request.image, pendingInt);
  } catch(err) {
    // idk if this is necessary w/ the `finally`, but I'm keeping it here to be safe.
    throw err;
  } finally {
    db?.close();
  }
}

router.post('/contribute/locations/shopping', async (req, res) => {
  const body = req.body as API.NewShoppingLocationRequest;
  try {
    await insertShoppingLocation(body, true);
    res.status(201).json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't POST ${req.path}`, err);
    res.json({
      data: null,
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  }
});

router.post('/locations/shopping', requireAuthorization, async (req, res) => {
  try {
    const body: API.NewShoppingLocationRequest = req.body;

    await insertShoppingLocation(body, false);
    res.status(201).json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't POST ${req.path}`, err);

    res.json({
      data: null,
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  }
});

router.patch('/locations/shopping/:id', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body = req.body as API.UpdateShoppingLocationRequest;

    db = getDatabase();
    const loc = db.prepare('SELECT * FROM shopping_locations WHERE id = ? LIMIT 1')
      .get(req.params.id) as DB.ShoppingLocation;
    db.close();

    if (body.name !== undefined) loc.name = body.name;
    if (body.description !== undefined) loc.description = body.description;
    if (body.address !== undefined) loc.address = body.address;
    if (body.image !== undefined) loc.image = body.image;
    if (body.color !== undefined && body.color !== null) loc.color = hexColorToInt(body.color);

    db = getDatabase();
    db.prepare('UPDATE shopping_locations SET name = ?, description = ?, address = ?, color = ?, image = ? WHERE id = ?')
      .run(loc.name, loc.description, loc.address, loc.color, loc.image, req.params.id);

    res.json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't PATCH ${req.path}`, err);

    res.json({
      data: null,
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  } finally {
    db?.close();
  }
});

router.delete('/locations/shopping/:id', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const id = req.params.id;

    db = getDatabase();
    db.prepare('DELETE FROM shopping_locations WHERE id = ?').run(id);

    res.json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't DELETE ${req.path}`, err)

    res.json({
      data: null,
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  } finally {
    db?.close();
  }
});

export default router;
