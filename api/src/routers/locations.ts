import express from 'express';
import { getDatabase } from '../utils/database';
import sqlite3 from 'better-sqlite3';

import { API, DB } from '../../';
import { Logger } from '../utils/logger';
import { requireAuthorization } from '../utils/auth';
import { hexColorToInt, intColorToHex } from '../utils/colors';

const router = express.Router();

router.use(express.json());

router.get('/locations/shopping', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase();
    const dbResponse = db.prepare('SELECT * FROM shopping_locations').all() as DB.ShoppingLocation[];

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

router.post('/locations/shopping', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body: API.NewShoppingLocationRequest = req.body;

    let dbColor: number | null = null;
    if (body.color !== undefined) {
      dbColor = hexColorToInt(body.color);
    }

    db = getDatabase();
    db.prepare('INSERT INTO shopping_locations(name, description, address, color, image) VALUES(?, ?, ?, ?, ?)')
      .run(body.name, body.description, body.address, dbColor, body.image);

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
  } finally {
    db?.close();
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

router.get('/locations/food', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase();
    const dbResponse = db.prepare('SELECT * FROM food_locations').all() as DB.FoodLocation[];

    const response: API.FoodLocationsResponse = {
      data: dbResponse.map((row: DB.FoodLocation) => {
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

        const response: API.FoodLocation = {
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

    const response: API.FoodLocationsResponse = {
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

router.post('/locations/food', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body: API.NewFoodLocationRequest = req.body;

    let dbColor: number | null = null;
    if (body.color !== undefined) {
      dbColor = hexColorToInt(body.color);
    }

    db = getDatabase();
    db.prepare('INSERT INTO food_locations(name, description, address, color, image) VALUES(?, ?, ?, ?, ?)')
      .run(body.name, body.description, body.address, dbColor, body.image);

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
  } finally {
    db?.close();
  }
});

router.patch('/locations/food/:id', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body = req.body as API.UpdateFoodLocationRequest;

    db = getDatabase();
    const loc = db.prepare('SELECT * FROM food_locations WHERE id = ? LIMIT 1')
      .get(req.params.id) as DB.FoodLocation;
    db.close();

    if (body.name !== undefined) loc.name = body.name;
    if (body.description !== undefined) loc.description = body.description;
    if (body.address !== undefined) loc.address = body.address;
    if (body.image !== undefined) loc.image = body.image;
    if (body.color !== undefined && body.color !== null) loc.color = hexColorToInt(body.color);

    db = getDatabase();
    db.prepare('UPDATE food_locations SET name = ?, description = ?, address = ?, color = ?, image = ? WHERE id = ?')
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

router.delete('/locations/food/:id', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const id = req.params.id;

    db = getDatabase();
    db.prepare('DELETE FROM food_locations WHERE id = ?').run(id);

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

        let fish: string[] = [];
        if (row.fish !== null) {
          fish = row.fish.split(';');
        }

        const response: API.FishingLocation = {
          id: row.id,
          name: row.name,
          image: imageURI,
          color: apiColor,
          gmapurl: row.gmapurl ?? undefined,
          description: row.description ?? undefined,
          accessibility: row.accessibility ?? undefined,
          fish: fish
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

router.post('/locations/fishing', requireAuthorization, (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const body: API.NewFishingLocationRequest = req.body;

    let dbColor: number | null = null;
    if (body.color !== undefined) {
      dbColor = hexColorToInt(body.color);
    }

    const fish = body.fish.join(';');

    db = getDatabase();
    db.prepare('INSERT INTO fishing_locations(name, description, color, image, gmapurl, accessibility, fish) VALUES(?, ?, ?, ?, ?, ?, ?)')
      .run(body.name, body.description, dbColor, body.image, body.gmapurl, body.accessibility, fish);

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
  } finally {
    db?.close();
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
    if (body.fish !== undefined) loc.fish = body.fish.join(',');
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
