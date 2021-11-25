import { Request, Response, NextFunction } from "express";
import Debug from "debug";
import jwt from "jsonwebtoken";
import chalk from "chalk";

const debug = Debug("collector:middleware:auth");

interface RequestAuth extends Request {
  idUser?: string;
  username?: string;
  params: any;
}

const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error: {
      message: string;
      code?: number;
    } = new Error("Not authorized sorry");
    debug(chalk.redBright("No Authorization"));
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      const error: {
        message: string;
        code?: number;
      } = new Error("Token missing...");
      error.code = 401;
      next(error);
    } else {
      try {
        const userData: any = jwt.verify(token, process.env.SECRET);
        req.idUser = userData.id;
        req.username = userData.username;
        next();
      } catch (error) {
        error.message = "Token invalid";
        error.code = 401;
        next(error);
      }
    }
  }
};

export default auth;
