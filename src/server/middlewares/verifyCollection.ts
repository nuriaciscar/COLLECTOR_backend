import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Response } from "express";
import { RequestAuth } from "../../utils/mocks/mockFunctions";
import User from "../../database/models/user";

const debug = Debug("collector:middleware:verifyCollection");

const verifyCollection = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idCollection } = req.params;
  const user = await User.findOne({ id: req.idUser });
  if (user.collections.includes(idCollection)) {
    next();
  } else {
    const error: {
      code?: number;
      message: string;
    } = new Error("Not allowed");
    debug(chalk.redBright("Not allowed"));
    error.code = 401;
    next(error);
  }
};

export default verifyCollection;
