import path from "path";

require('dotenv').config();

const accessTokenKey = process.env.ACCESS_TOKEN_KEY ?? undefined;
if (accessTokenKey == undefined) {
  const err = new Error();
  err.name = "EMISSINGENV";
  err.message = `Environment is missing ACCESS_TOKEN_KEY. Please set the variable before continuing.`;
  throw err;
}

const refreshTokenKey = process.env.REFRESH_TOKEN_KEY ?? undefined;
if (refreshTokenKey == undefined) {
  const err = new Error();
  err.name = "EMISSINGENV";
  err.message = `Environment is missing REFRESH_TOKEN_KEY. Please set the variable before continuing.`;
  throw err;
}

let production: boolean;
process.env.ENVIRONMENT ??= 'development';
switch (process.env.ENVIRONMENT.toLowerCase()) {
  case 'dev':
  case 'development':
    production = false;
    break;

  case 'prod':
  case 'production':
    production = true;
    break;

  default:
    production = false;
}

let PORT: number;
if (production) {
  if (process.env.PORT !== undefined) {
    PORT = parseInt(process.env.PORT);
  } else PORT = 80;
} else PORT = 3000;

let dataPath: string;
if (production) {
  if (process.platform === 'win32') {
    dataPath = 'C:\\ProgramData\\almanor-atlas';
  } else {
    dataPath = '/var/lib/almanor-atlas';
  }
} else {
  dataPath = path.resolve('data');
}

export default {
  production,
  PORT,
  dataPath,
  accessTokenKey,
  refreshTokenKey
}
