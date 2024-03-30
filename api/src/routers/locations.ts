import express from 'express';
import { getDatabase } from '../utils/database';
import sqlite3 from 'better-sqlite3';
import fs from 'fs';

import { API, DB } from '../../';
import { Logger } from '../utils/logger';
import path from 'path';

const router = express.Router();

router.use(express.json());

function hexColorToInt(color: string): number {
  color = color.replace('#', '');
  return parseInt(color, 16);
}

function intColorToRGB(color: number): {r: number, g: number, b: number} {
  return {
    r: (color & 0xff0000) >> 16,
    g: (color & 0x00ff00) >> 8,
    b: color & 0x0000ff
  };
}

function hexColorToRGB(color: string): {r: number, g: number, b: number} {
  const intClr = hexColorToInt(color);
  return intColorToRGB(intClr);
}

function intColorToHex(color: number): string {
  const r = ((color & 0xff0000) >> 16).toString(16).padStart(2, '0');
  const g = ((color & 0x00ff00) >> 8).toString(16).padStart(2, '0');
  const b = (color & 0x0000ff).toString(16).padStart(2, '0');
  return '#'+r+g+b;
}

router.get('/locations', (_req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase()
    const dbResponse = db.prepare('SELECT * FROM locations').all() as DB.Location[];

    const response: API.LocationsResponse = {
      data: dbResponse.map((row: DB.Location) => {
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

        return {
          id: row.id,
          name: row.name,
          description: row.description ?? undefined,
          address: row.address ?? undefined,
          category: row.category,
          color: apiColor,
          image: imageURI
        };
      })
    };

    res.json(response);
  } catch(err) {
    Logger.error(`Couldn't GET /locations`, err);

    const response: API.LocationsResponse = {
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

router.post('/locations', (req, res) => {
  try {
    const body: API.NewLocationRequest = req.body;

    let dbColor: number | null = null;
    if (body.color !== undefined) {
      dbColor = hexColorToInt(body.color)
    }

    const db = getDatabase();
    db.prepare('INSERT INTO locations(name, description, address, category, color, image) VALUES(?, ?, ?, ?, ?, ?)')
      .run(body.name, body.description, body.address, body.category, dbColor, body.image);

    res.status(201).json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't POST /locations`, err);

    res.json({
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  }
});

router.delete('/locations/:id', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    const id = req.params.id;

    db = getDatabase();
    db.prepare('DELETE FROM locations WHERE id = ?').run(id);

    res.json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't DELETE /locations/${req.params.id}`, err)

    res.json({
      error: {
        name: 'EUNKNOWN',
        message: 'An unknown error has occurred.'
      }
    });
  } finally {
    db?.close();
  }
});

router.patch('/locations/:id', (req, res) => {
  let db: sqlite3.Database | undefined;
  try {
    db = getDatabase();
    const loc = db.prepare('SELECT * FROM locations WHERE id = ? LIMIT 1')
      .get(req.params.id) as DB.Location;
    db.close();

    Object.assign(loc, req.body);

    db = getDatabase();
    db.prepare('UPDATE locations SET name = ?, description = ?, address = ?, category = ?, color = ?, image = ? WHERE id = ?')
      .run(loc.name, loc.description, loc.address, loc.category, loc.color, loc.image, req.params.id);

    res.json({ status: 'success' });
  } catch(err) {
    Logger.error(`Couldn't PATCH /locations/${req.params.id}`, err);

    res.json({ status: 'error', error: {
      name: 'EUNKNOWN',
      message: 'An unknown error has occurred.'
    }});
  } finally {
    db?.close();
  }
});

export default router;
