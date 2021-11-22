const debug = require("debug")("collector:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const initializeDB = (connectionString) => 
  new Promise<void>((resolve, reject) => {
    mongoose.set("toJSON", {
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
        debug(chalk.red("Cannot connect to database"));
        debug(chalk.red(error.message));
        reject(error);
      }
    });

    mongoose.connection.on("close", () => {
      debug(chalk.green());
      resolve();
    });
  });


export = {initializeDB};
