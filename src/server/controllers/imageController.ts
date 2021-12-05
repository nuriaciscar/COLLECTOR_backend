import { NextFunction, Request, Response } from "express";
import Collection from "../../database/models/collection";

import Image from "../../database/models/image";
import User from "../../database/models/user";
import { RequestAuth } from "../../utils/mocks/mockFunctions";

const getImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idImage } = req.params;
    const image = await Image.findById(idImage).populate({ path: "owner" });
    if (image) {
      res.status(200).json(image);
    } else {
      const error: {
        message: string;
        code?: number;
      } = new Error("Image not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Cannot found any image";
    next(error);
  }
};

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot found any image sorry";
    next(error);
  }
};

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  const { idImage } = req.params;
  try {
    const updatedImage = await Image.findByIdAndUpdate(idImage, req.body, {
      new: true,
    });
    res.json(updatedImage);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot update this image";
    next(error);
  }
};

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idImage } = req.params;
    const imageToDelete = await Image.findByIdAndDelete(idImage);
    if (imageToDelete) {
      res.json(imageToDelete);
    } else {
      const error: {
        message: string;
        code?: number;
      } = new Error("Image not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Cannot delete this image";
    next(error);
  }
};

const addImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    error.message = "Cannot add this image";
    error.code = 400;
    next(error);
  }
};

const addImagOnCollection = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCollection } = req.params;
    const newImage = await Image.create({
      ...req.body,
      owner: req.idUser,
    });
    await Collection.findByIdAndUpdate(idCollection, {
      $push: { images: newImage.id },
    });
    res.status(201).json(newImage);
  } catch (error) {
    error.message = "Cannot add this image";
    error.code = 400;
    next(error);
  }
};

export {
  getImage,
  updateImage,
  deleteImage,
  addImage,
  getImages,
  addImagOnCollection,
};
