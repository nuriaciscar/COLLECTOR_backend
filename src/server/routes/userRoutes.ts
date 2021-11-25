import express from "express";

import auth from "../middlewares/auth";
import {
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";

import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";

const router = express.Router();

router.get("/:idUser", auth, getUser);

router.post("/login", loginUser);

router.post("/register", upload.single("image"), firebase, registerUser);

router.patch("/:idUser", auth, upload.single("image"), firebase, updateUser);

export default router;
