import express from "express";
import { validate } from "express-validation";
import {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
} from "../controllers/collectionsController";
import { updateCollectionValidation } from "../schemas/collectionSchema";
import auth from "../middlewares/auth";
import verifyCollection from "../middlewares/verifyCollection";
import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";

const router = express.Router();

router.get("/", auth, getCollections);
router.post("/", auth, upload.array("images"), firebase, addCollection);
router.delete("/:idCollection", auth, verifyCollection, deleteCollection);
router.patch(
  "/:idCollection",
  validate(updateCollectionValidation),
  auth,
  verifyCollection,
  updateCollection
);
router.get("/:idCollection", getCollection);

export default router;
