import * as express from "express";

const { ValidationError } = require("express-validation");
const debug = require("debug")("collector:errors");
const chalk = require("chalk");



const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

const errorHandler = (
  error: { message: String; code: number },
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: any
) => {
  debug(chalk.red("An error has occurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Bad request sorry";
  }
  const message = error.code ? error.message : "All broken";
  res.status(error.code || 500).json({ error: message });
};
export = { notFoundErrorHandler, errorHandler };




