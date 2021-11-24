import express from "express";

import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/:idUser", getUser);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.patch("/:idUser", () => {});

export default router;
