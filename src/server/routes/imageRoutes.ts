import express from "express";
import {
  addImage,
  deleteImage,
  getImage,
  updateImage,
} from "../controllers/imageController";

import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";

const router = express.Router();

router.get("/:idImage", getImage);

router.patch("/:idImage", updateImage);

router.delete("/:idImage", deleteImage);

router.post("/addImage", upload.single("image"), firebase, addImage);

export default router;
