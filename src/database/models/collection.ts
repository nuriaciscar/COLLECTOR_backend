import { Schema, model, Types, Model } from "mongoose";

interface ICollection {
  name: string;
  date: string;
  images: string[];
  id?: any;
}

const collectionSchema: Schema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  images: {
    type: [Types.ObjectId],
    ref: "Image",
    default: [],
  },
});

const Collection: Model<ICollection> = model(
  "Collection",
  collectionSchema,
  "collections"
);

export default Collection;
