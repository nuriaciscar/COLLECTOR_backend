require('dotenv').config();

const { initializeServer } = require('./server/index');

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
