/* eslint-disable no-param-reassign */
import chalk from'chalk';

import mongoose from'mongoose';

import Debug from "debug"

const debug = Debug('collector:database');

const initializeDB = (connectionString) => new Promise<void>((resolve, reject) => {
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      // eslint-disable-next-line no-underscore-dangle
      delete ret._id;
      // eslint-disable-next-line no-underscore-dangle
      delete ret.__v;
    },
  });

  mongoose.connect(connectionString, (error) => {
    if (error) {
      debug(chalk.red('Cannot connect to database'));
      debug(chalk.red(error.message));
      reject(error);
    }
    debug(chalk.green('Connected to database'));
    resolve();
  });
});

export default initializeDB;
