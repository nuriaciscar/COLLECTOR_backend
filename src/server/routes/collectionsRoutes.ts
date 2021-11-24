import express from "express";

import getCollections from "../controllers/collectionsController";

const router = express.Router();

router.get("/", getCollections);

export default router;
