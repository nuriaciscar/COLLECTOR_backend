import express from "express";
import { validate } from "express-validation";
import {
  getCollections,
  addCollection,
  deleteCollection,
  updateCollection,
  getCollection,
} from "../controllers/collectionsController";
import {
  updateCollectionValidation,
  addCollectionValidation,
} from "../schemas/collectionSchema";
import auth from "../middlewares/auth";
import verifyCollection from "../middlewares/verifyCollection";

const router = express.Router();

router.get("/", auth, getCollections);
router.post(
  "/",
  validate(addCollectionValidation),
  auth,
  verifyCollection,
  addCollection
);
router.delete("/:idCollection", auth, verifyCollection, deleteCollection);
router.patch(
  "/:idCollection",
  validate(updateCollectionValidation),
  auth,
  verifyCollection,
  updateCollection
);
router.get("/:idCollection", auth, getCollection);

export default router;
