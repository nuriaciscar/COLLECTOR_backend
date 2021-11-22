require("dotenv").config();

const { initializeDB } = require("./database/index");

const { initializeServer } = require("./server/index");

// const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    await initializeDB(process.env.MONGODB_STRING);
    initializeServer(6000);
  } catch (error) {
    process.exit(1);
  }
})();
