import server from './utils/server';
import config from './utils/config';
import './utils/math';

server.listen(config.PORT, () => {
  console.log(`Server listening at http://localhost:${config.PORT}`);
});