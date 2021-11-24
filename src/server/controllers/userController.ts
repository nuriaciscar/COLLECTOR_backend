import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../database/models/user";

const debug = Debug("collector:user:controller");

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.redBright("Wrong credentials"));
    const error: {
      message: string;
      code?: number;
    } = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.redBright("Wrong password"));
      const error: {
        message: string;
        code?: number;
      } = new Error("Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.SECRET,
        {
          expiresIn: 72 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

// const createUser = async () => {
//   const user = User.create({
//     name: "nunu",
//     username: "nunu",
//     password: await bcrypt.hash("pwd", 10),
//     email: "nuriaciscar@hohot.com",
//     collections: [],
//   });
// };

// createUser();
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = req.body;
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    debug(chalk.redBright("Username already taken"));
    const error: {
      message: string;
      code?: number;
    } = new Error("Username already taken");
    error.code = 400;
    next(error);
  } else {
    newUser.collections = [];
    newUser.password = await bcrypt.hash(newUser.password, 10);
    User.create(newUser);
    res.json().status(200);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById(idUser);
    if (user) {
      res.status(200).json(user);
    } else {
      const error: {
        message: string;
        code?: number;
      } = new Error("User not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Cannot found any user";
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { idUser } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(idUser, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot update the user";
    next(error);
  }
};
export { getUser, loginUser, registerUser, updateUser };
