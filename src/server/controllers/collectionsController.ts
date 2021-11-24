import { NextFunction, Request, Response } from "express";
import Collection from "../../database/models/collection";

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

const addCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCollection = await Collection.create(req.body);
    res.json(newCollection);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot create the collection";
    next(error);
  }
};

const deleteCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCollection } = req.params;
    const deletedCollection = await Collection.findByIdAndDelete(idCollection);
    if (deletedCollection) {
      res.json(deletedCollection);
    } else {
      const error: {
        message: string;
        code?: number;
      } = new Error("Collection not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Cannot delete the collection";
    next(error);
  }
};
export { getCollections, addCollection, deleteCollection };
