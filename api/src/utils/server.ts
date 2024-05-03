import express from 'express';
import config from './config';

import notFoundRouter from '../routers/not-found';
import staticRouter from '../routers/static';

import locationsRouter from '../routers/locations';
import verifyTokenRouter from '../routers/verify_token';

const server = express();
server.disable('x-powered-by');

// API Routes
const routers: express.Router[] = [
  locationsRouter,
  verifyTokenRouter,
];

routers.forEach((router) => {
  server.use('/api', router);
});

// Not Found
server.use('/api', notFoundRouter);

// Static Routes
if (config.production) server.use(staticRouter);

export default server;
