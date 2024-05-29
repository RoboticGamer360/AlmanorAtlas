import express from 'express';
import { getDatabase } from '../../utils/database';
import sqlite3 from 'better-sqlite3';

import { API, DB } from '../../../';
import { Logger } from '../../utils/logger';
import { requireAuthorization } from '../../utils/auth';
import { hexColorToInt, intColorToHex } from '../../utils/colors';

const router = express.Router();

router.use(express.json());

router.get('/locations/fishing', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase();
    const dbResponse = db.prepare('SELECT * FROM fishing_locations').all() as DB.FishingLocation[];

    const response: API.FishingLocationsResponse = {
      data: dbResponse.map((row: DB.FishingLocation) => {
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

        const response: API.FishingLocation = {
          id: row.id,
          name: row.name,
          image: imageURI,
          color: apiColor,
          gmapurl: row.gmapurl ?? undefined,
          description: row.description ?? undefined,
          accessibility: row.accessibility ?? undefined,
          fish: row.fish ?? undefined
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
        name: 'EUNKNOWN',
        message: "An unknown error has occurred."
      }
    };

    res.json(response);
  } finally {
    db?.close();
  }
});

async function insertFishingLocation(request: API.NewFishingLocationRequest, pending: boolean): Promise<void> {
  let db: sqlite3.Database | undefined;
  try {
    const pendingInt = pending ? 1 : 0;

    let dbColor: number | null = null;
    if (request.color !== undefined) {
      dbColor = hexColorToInt(request.color);
    }

    db = getDatabase();
    db.prepare('INSERT INTO fishing_locations(name, description, color, image, gmapurl, accessibility, fish, pending) VALUES(?, ?, ?, ?, ?, ?, ?, ?)')
      .run(request.name, request.description, dbColor, request.image, request.gmapurl, request.accessibility, request.fish, pendingInt);

  } catch(err) {
    throw err;
  } finally {
    db?.close();
  }
}

router.post('/contribute/locations/fishing', async (req, res) => {
  const body = req.body as API.NewFishingLocationRequest;
  try {
    await insertFishingLocation(body, true);
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

router.post('/locations/fishing', requireAuthorization, async (req, res) => {
  const body = req.body as API.NewFishingLocationRequest;
  try {
    await insertFishingLocation(body, false);
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

router.patch('/locations/fishing/:id', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body = req.body as API.UpdateFishingLocationRequest;

    db = getDatabase();
    const loc = db.prepare('SELECT * FROM fishing_locations WHERE id = ? LIMIT 1')
      .get(req.params.id) as DB.FishingLocation;
    db.close();

    if (body.name !== undefined) loc.name = body.name;
    if (body.description !== undefined) loc.description = body.description;
    if (body.gmapurl !== undefined) loc.gmapurl = body.gmapurl;
    if (body.image !== undefined) loc.image = body.image;
    if (body.accessibility !== undefined) loc.accessibility = body.accessibility;
    if (body.fish !== undefined) loc.fish = body.fish;
    if (body.color !== undefined && body.color !== null) loc.color = hexColorToInt(body.color);

    db = getDatabase();
    db.prepare('UPDATE fishing_locations SET name = ?, description = ?, color = ?, image = ?, gmapurl = ?, accessibility = ?, fish = ? WHERE id = ?')
      .run(loc.name, loc.description, loc.color, loc.image, loc.gmapurl, loc.accessibility, loc.fish, req.params.id);

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

router.delete('/locations/fishing/:id', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const id = req.params.id;

    db = getDatabase();
    db.prepare('DELETE FROM fishing_locations WHERE id = ?').run(id);

    res.json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't DELETE ${req.path}`, err);

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
