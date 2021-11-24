import express from "express";

import { getUser, loginUser } from "../controllers/userController";

const router = express.Router();

router.get("/:idUser", getUser);

router.post("/login", loginUser);

router.post("/register", () => {});

router.patch("/:idUser", () => {});

export default router;
