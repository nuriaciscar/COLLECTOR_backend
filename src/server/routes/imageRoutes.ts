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
// import verifyImage from "../middlewares/verifyImage";

const router = express.Router();

router.get("/:idImage", getImage);
router.get("/", getImages);
router.patch("/:idImage", updateImage);
router.delete("/:idImage", auth, deleteImage);
router.post("/addImage", auth, upload.array("images"), firebase, addImage);
router.post(
  "/:idCollection",
  auth,
  upload.array("images"),
  firebase,
  addImageOnCollection
);

export default router;
