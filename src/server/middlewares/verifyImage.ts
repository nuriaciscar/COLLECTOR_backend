import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import Image from "../../database/models/image";
import { RequestAuth } from "../../utils/mocks/mockFunctions";

const debug = Debug("collector:middleware:verifyImage");

const verifyImage = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idImage } = req.params;
    const image = await Image.findById(idImage);
    if (image.owner.includes(req.idUser)) {
      next();
    }
    const error: {
      code?: number;
      message: string;
    } = new Error("Not allowed");
    error.code = 401;
    next(error);
  } catch (error) {
    error.message = "Image not found";
    debug(chalk.redBright("Image not found"));
    error.code = 400;
    next(error);
  }
};

export default verifyImage;
