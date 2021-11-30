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
// import auth from "../middlewares/auth";
import verifyCollection from "../middlewares/verifyCollection";

const router = express.Router();

router.get("/", getCollections);
router.post(
  "/",
  validate(addCollectionValidation),

  verifyCollection,
  addCollection
);
router.delete("/:idCollection", verifyCollection, deleteCollection);
router.patch(
  "/:idCollection",
  validate(updateCollectionValidation),

  verifyCollection,
  updateCollection
);
router.get("/:idCollection", getCollection);

export default router;
