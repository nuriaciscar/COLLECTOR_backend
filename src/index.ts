/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import initializeDB from "./database";

import { initializeServer } from "./server";

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  try {
    await initializeDB(process.env.MONGODB_STRING);
    initializeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
