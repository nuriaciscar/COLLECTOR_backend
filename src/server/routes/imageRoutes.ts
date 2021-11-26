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
import auth from "../middlewares/auth";
import verifyImage from "../middlewares/verifyImage";

const router = express.Router();

router.get("/:idImage", getImage);
router.get("/", getImages);
router.patch("/:idImage", auth, verifyImage, updateImage);
router.delete("/:idImage", auth, verifyImage, deleteImage);
router.post("/addImage", auth, upload.single("image"), firebase, addImage);

export default router;
