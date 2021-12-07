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
import { loginValidation } from "../schemas/userSchema";

const router = express.Router();

router.get("/:idUser", auth, verifyUser, getUser);
router.post("/login", validate(loginValidation), loginUser);
router.post("/register", registerUser);
router.patch(
  "/:idUser",
  auth,
  verifyUser,
  upload.single("image"),
  firebase,
  updateUser
);

export default router;
