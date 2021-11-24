import express from "express";

import {
  getCollections,
  addCollection,
  deleteCollection,
} from "../controllers/collectionsController";

const router = express.Router();

router.get("/", getCollections);
router.post("/", addCollection);
router.delete("/:idCollection", deleteCollection);

export default router;
