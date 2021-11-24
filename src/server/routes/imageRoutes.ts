import express from "express";
import {
  addImage,
  deleteImage,
  getImage,
  updateImage,
} from "../controllers/imageController";

const router = express.Router();

router.get("/:idImage", getImage);

router.patch("/:idImage", updateImage);

router.delete("/:idImage", deleteImage);

router.post("/addImage", addImage);

export default router;
