
import express from "express";

import getUser from "../controllers/userController";


const router = express.Router();

router.get("/:idUser", getUser);

router.post("/login", () =>{});

router.post("/register", () => { });

router.patch("/:idUser", () => {});

export default router;
