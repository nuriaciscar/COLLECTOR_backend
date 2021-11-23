import { NextFunction, Request, Response } from "express";

import User from "../../database/models/user";

const getCollections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await User.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default getCollections;
