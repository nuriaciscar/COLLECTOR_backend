import * as express from 'express';

import Debug from 'debug';

const debug = Debug('collector:server-errors');
const chalk = require('chalk');

export const notFoundErrorHandler = (req: any, res: express.Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const errorHandler = (
  error,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
) => {
  debug(chalk.red("An error has occurred: ", error.message));

  const message = error.code ? error.message : "All broken";
  res.status(error.code || 500).json({ error: message });
};

export default {notFoundErrorHandler, errorHandler}