/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import Collection from "../../database/models/collection";
import { RequestAuth } from "../../utils/mocks/mockFunctions";
import User from "../../database/models/user";

const debug = Debug("collector:controllers:collection");

const getCollections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collections = await Collection.find().populate({ path: "images" });
    res.json(collections);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot found any collection";
    next(error);
  }
};

const addCollection = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCollection = await Collection.create(req.body);
    await User.findOneAndUpdate(
      { id: req.idUser },
      { $push: { collections: newCollection.id } }
    );
    debug(chalk.green(`New collection created in user: ${req.username}`));
    res.json(newCollection);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot create the collection";
    next(error);
  }
};

const deleteCollection = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCollection } = req.params;
    const deletedCollection = await Collection.findByIdAndDelete(idCollection);
    if (deletedCollection) {
      await User.findOneAndUpdate(
        { id: req.idUser },
        { $pull: { collections: deletedCollection.id } }
      );
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

const getCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCollection } = req.params;
    const collection = await Collection.findById(idCollection).populate({
      path: "images",
    });
    if (collection) {
      res.status(200).json(collection);
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
    error.message = "Cannot found any collection";
    next(error);
  }
};

const updateCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idCollection } = req.params;
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      idCollection,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedCollection);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot update the collection";
    next(error);
  }
};
export {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
};
