import Debug from "debug";

import chalk from "chalk";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { notFoundErrorHandler, errorHandler } from "./middlewares/error";

import userRoutes from "./routes/userRoutes";

import collectionRoutes from "./routes/collectionsRoutes";

import imageRoutes from "./routes/imageRoutes";

const debug = Debug("collector:server");

const app = express();
app.use(cors());

const initializeServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Listening to port ${port}`));
      resolve(server);
    });

    server.on("error", (error: { message: string; code?: string }) => {
      debug(chalk.red("Error to initialize Server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
        reject();
      }

      debug(chalk.red(error.code));
    });

    server.on("close", () => {
      debug(chalk.blue("Server disconnected, see you soon"));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/collections", collectionRoutes);
app.use("/image", imageRoutes);

app.use(notFoundErrorHandler);
app.use(errorHandler);

export { initializeServer, app };
