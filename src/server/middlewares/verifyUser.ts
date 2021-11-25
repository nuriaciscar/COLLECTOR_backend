import { Response, NextFunction } from "express";
import Debug from "debug";
import chalk from "chalk";
import { RequestAuth } from "../../utils/mocks/mockFunctions";

const debug = Debug("collector:middleware:authenticate");

const verifyUser = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idUser } = req.params;
  if (req.idUser === idUser) {
    next();
  } else {
    const error: {
      code?: number;
      message: string;
    } = new Error("User not verified");
    debug(chalk.redBright("User not verified"));
    error.code = 401;
    next(error);
  }
};

export default verifyUser;
