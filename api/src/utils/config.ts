import path from "path";

require('dotenv').config();

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

export default { production, PORT, dataPath }
