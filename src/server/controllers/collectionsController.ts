import { NextFunction, Request, Response } from "express";
import { Collection } from "mongoose";


const getCollections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot found any collection";
    next(error);
  }
};

export default getCollections;
