import express from "express";
import {
  addImage,
  deleteImage,
  getImage,
  getImages,
  updateImage,
  addImageOnCollection,
} from "../controllers/imageController";
import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";
import auth from "../middlewares/auth";
import verifyImage from "../middlewares/verifyImage";

const router = express.Router();

router.get("/:idImage", getImage);
router.get("/", getImages);
router.patch("/:idImage", verifyImage, updateImage);
router.delete("/:idImage", auth, verifyImage, deleteImage);
router.post("/addImage", auth, upload.array("image"), firebase, addImage);
router.post(
  "/:idCollection",
  auth,
  upload.array("image"),
  firebase,
  addImageOnCollection
);

export default router;
