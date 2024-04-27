import sqlite3 from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import config from "../config";
import { Logger } from '../logger';

const dbPath = path.join(config.dataPath, 'data.db');

function getDatabase(): sqlite3.Database {
  return sqlite3(dbPath);
}

const initStatements = [`
CREATE TABLE shopping_locations(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  color INTEGER,
  image TEXT
);`, `
CREATE TABLE food_locations(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  color INTEGER,
  image TEXT
);`, `
CREATE TABLE fishing_locations(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color INTEGER,
  image TEXT,
  location TEXT NOT NULL,
  accessibility TEXT
);`, `
CREATE TABLE fish(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);`, `
CREATE TABLE bait(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);`, `
CREATE TABLE fishing_location_fish(
  location_id INTEGER NOT NULL,
  fish_id INTEGER NOT NULL,
  FOREIGN KEY(location_id) REFERENCES fishing_locations(id),
  FOREIGN KEY(fish_id) REFERENCES fish(id)
);`, `
CREATE TABLE fishing_location_bait(
  location_id INTEGER NOT NULL,
  bait_id INTEGER NOT NULL,
  FOREIGN KEY(location_id) REFERENCES fishing_locations(id),
  FOREIGN KEY(bait_id) REFERENCES bait(id)
);`, `
CREATE TABLE tokens(
  token TEXT PRIMARY KEY,
  type TEXT NOT NULL
);`];

function initialize() {
  if (!fs.existsSync(dbPath)) {
    Logger.info('Initializing database...');
    fs.mkdirSync(config.dataPath, {recursive: true});
    let db: sqlite3.Database | undefined;
    try {
      db = sqlite3(dbPath);
      for (const statement of initStatements) {
        db.exec(statement);
      }
      db.close();
      Logger.info('Database initialized');
    } catch(err) {
      Logger.error(`Couldn't initialize database`, err);
      db?.close();
      fs.rmSync(dbPath);
      exit(1);
    }
  }
}

export { initialize, getDatabase };
