import express from "express";
import {
  addImage,
  deleteImage,
  getImage,
  getImages,
  updateImage,
} from "../controllers/imageController";

import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";

const router = express.Router();

router.get("/:idImage", getImage);

router.get("/", getImages);

router.patch("/:idImage", updateImage);

router.delete("/:idImage", deleteImage);

router.post("/addImage", upload.single("image"), firebase, addImage);

export default router;
