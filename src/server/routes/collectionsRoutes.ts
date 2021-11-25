import express from "express";

import {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
} from "../controllers/collectionsController";

import auth from "../middlewares/auth";

const router = express.Router();

router.get("/", auth, getCollections);
router.post("/", addCollection);
router.delete("/:idCollection", deleteCollection);
router.patch("/:idCollection", updateCollection);
router.get("/:idCollection", getCollection);

export default router;
