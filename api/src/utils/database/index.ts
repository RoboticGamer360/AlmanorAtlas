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

function initialize() {
  if (!fs.existsSync(dbPath)) {
    Logger.info('Initializing database...');
    fs.mkdirSync(config.dataPath, {recursive: true});
    let db: sqlite3.Database | undefined;
    try {
      db = sqlite3(dbPath);
      const initSQLPath = path.join(__dirname, 'initialize.sql');
      let init = fs.readFileSync(initSQLPath).toString();
      const statements = init.split(';');
      for (const statement of statements) {
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
