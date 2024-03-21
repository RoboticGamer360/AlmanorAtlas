import server from './utils/server';
import config from './utils/config';
import './utils/math';
import * as database from './utils/database';
import { Logger } from './utils/logger';

database.initialize();
server.listen(config.PORT, () => {
  Logger.info(`Server listening at http://localhost:${config.PORT}`);
});
