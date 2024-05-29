import express from 'express';
import config from './config';

import notFoundRouter from '../routers/not-found';
import staticRouter from '../routers/static';

import shoppingLocationsRouter from '../routers/locations/shopping';
import foodLocationsRouter from '../routers/locations/food';
import fishingLocationsRouter from '../routers/locations/fishing';
import verifyTokenRouter from '../routers/verify_token';

const server = express();
server.disable('x-powered-by');

// API Routes
const routers: express.Router[] = [
  shoppingLocationsRouter,
  foodLocationsRouter,
  fishingLocationsRouter,
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
