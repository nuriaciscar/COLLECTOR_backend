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
// import auth from "../middlewares/auth";
import verifyImage from "../middlewares/verifyImage";

const router = express.Router();

router.get("/:idImage", getImage);
router.get("/", getImages);
router.patch("/:idImage", verifyImage, updateImage);
router.delete("/:idImage", verifyImage, deleteImage);
router.post("/addImage", upload.array("image"), firebase, addImage);

export default router;
