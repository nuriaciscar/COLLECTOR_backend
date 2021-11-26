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

const router = express.Router();

router.get("/:idImage", getImage);
router.get("/", getImages);
router.patch("/:idImage", auth, updateImage);
router.delete("/:idImage", auth, deleteImage);
router.post("/addImage", auth, upload.single("image"), firebase, addImage);

export default router;
