import express from "express";

import { validate } from "express-validation";
import auth from "../middlewares/auth";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";

import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";
import verifyUser from "../middlewares/verifyUser";
import { loginValidation, registerValidation } from "../schemas/userSchema";

const router = express.Router();

router.get("/:idUser", validate(loginValidation), auth, verifyUser, getUser);
router.post(
  "/login",

  loginUser
);
router.post(
  "/register",
  validate(registerValidation),
  upload.single("image"),
  firebase,
  registerUser
);
router.patch(
  "/:idUser",
  auth,
  verifyUser,
  upload.single("image"),
  firebase,
  updateUser
);

export default router;
