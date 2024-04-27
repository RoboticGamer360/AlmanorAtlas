import jwt from 'jsonwebtoken';
import { User } from './auth.d';
import config from './config';
import sqlite from 'better-sqlite3';
import { getDatabase } from './database';
import { NextFunction, Request, Response } from 'express';

function generateAccessToken(user: User, indefinite = false): string {
  let tokenExpiryMS: number;
  if (indefinite) {
    tokenExpiryMS = -1;
  } else {
    const duration = 1000 * 60 * 60 * 24; // 24h
    tokenExpiryMS = (Date.now() + duration);
  }

  delete user.iat;
  user.exp = Math.floor(tokenExpiryMS / 1000);
  const accessToken = jwt.sign(user, config.accessTokenKey);
  return accessToken;
}

function _registerRefreshToken(token: string): void {
  let db: sqlite.Database | undefined;
  try {
    db = getDatabase()
    db.prepare(`INSERT INTO tokens(token, type) VALUES(?, ?)`).run(token, 'refresh');
  } catch(err) {
    throw err;
  } finally {
    db?.close()
  }
}

function deregisterRefreshToken(token: string): void {
  let db: sqlite.Database | undefined;
  try {
    db = getDatabase()
    db.prepare(`DELETE FROM tokens WHERE token = ?`).run(token);
  } catch(err) {
    throw err;
  } finally {
    db?.close()
  }
}

function generateRefreshToken(user: User): string {
  delete user.exp;
  user.exp = Math.round((new Date().getTime() + 1000 * 60 * 60 * 24) / 1000); // 24hr
  const refreshToken = jwt.sign(user, config.refreshTokenKey);
  _registerRefreshToken(refreshToken);
  return refreshToken;
}

function verifyAccessToken(token: string): User {
  try {
    jwt.verify(token, config.accessTokenKey, { ignoreExpiration: true });

    const tokenData = jwt.decode(token) as {[key: string]: any};
    if (tokenData.exp !== -1 && new Date(tokenData.exp * 1000).getTime() < new Date().getTime()) {
      throw new Error('JWT expired.');
    }

    return jwt.decode(token) as User;
  } catch(err) {
    if ((err as Error).message === 'jwt malformed') throw new Error('Invalid JWT.');
    if ((err as Error).message === 'JWT expired.') throw err;
    throw new Error('Invalid token.');
  }
}

function verifyRefreshToken(refreshToken: string): User {
  let db: sqlite.Database | undefined;
  try {
    jwt.verify(refreshToken, config.refreshTokenKey);

    db = getDatabase();
    const foundTokens = db.prepare('SELECT token FROM tokens WHERE token = ?').get(refreshToken) as {token: string} | undefined;
    if (foundTokens === undefined) throw new Error(`Refresh token doesn't exist in database.`);

    return jwt.decode(foundTokens.token) as User;
  } catch(err) {
    if ((err as Error).message === 'jwt expired') {
      deregisterRefreshToken(refreshToken);
      throw new Error('Refresh token expired.');
    }

    throw new Error('Invalid refresh token.');
  }
}

function authorize(req: Request, _res: Response): object {
  // If auth header or cookie doesn't exist, return false
  if (!req.headers.authorization && !req.cookies.authorization) throw new Error('Unauthorized.');

  // Get JWT from request
  let requestJwt: string;
  req.headers.authorization
    ? requestJwt = req.headers.authorization.replace('Bearer ', '')
    : requestJwt = req.cookies.authorization;

  // Validate
  return verifyAccessToken(requestJwt);
}

function requireAuthorization(req: Request, res: Response, next: NextFunction): void {
  // Authorize & add JWT data to request object
  try {
    const user = authorize(req, res);
    delete (user as {[key: string]: any}).iat;
    (req as {[key: string]: any}).user = user;

    next();
  } catch(_err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authorize,
  requireAuthorization
}
