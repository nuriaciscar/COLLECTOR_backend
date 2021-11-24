import express from "express";

import {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
} from "../controllers/collectionsController";

const router = express.Router();

router.get("/", getCollections);
router.post("/", addCollection);
router.delete("/:idCollection", deleteCollection);
router.patch("/:idCollection", updateCollection);
router.get("/:idCollection", getCollection);

export default router;
