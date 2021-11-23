import { NextFunction, Request, Response } from "express";

import User from "../../database/models/user";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { idUser } = req.params;
    const user = await User.findById(idUser);
 
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default getUser;
