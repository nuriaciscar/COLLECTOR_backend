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

const router = express.Router();

router.get("/", auth, getCollections);
router.post("/", auth, verifyCollection, addCollection);
router.delete("/:idCollection", auth, verifyCollection, deleteCollection);
router.patch("/:idCollection", auth, verifyCollection, updateCollection);
router.get("/:idCollection", auth, getCollection);

export default router;
