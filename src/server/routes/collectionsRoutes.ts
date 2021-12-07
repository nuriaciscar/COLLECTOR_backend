import express from "express";
import {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
} from "../controllers/collectionsController";
import auth from "../middlewares/auth";
import verifyCollection from "../middlewares/verifyCollection";
import upload from "../middlewares/uploadLocal";
import firebase from "../middlewares/firebase";

const router = express.Router();

router.get("/", auth, getCollections);
router.post("/", auth, upload.single("images"), firebase, addCollection);
router.delete("/:idCollection", auth, verifyCollection, deleteCollection);
router.patch(
  "/:idCollection",
  auth,
  upload.single("images"),
  firebase,
  updateCollection
);
router.get("/:idCollection", getCollection);

export default router;
