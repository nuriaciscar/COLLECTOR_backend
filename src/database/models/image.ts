import { Schema, model, Types, Model } from "mongoose";

interface IImage {
  description: string;
  date: Date;
  image: string;
  imageLocal: string;
  category: string;
  owner: string[];
}

const imageSchema: Schema = new Schema({
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageLocal: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  owner: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  collection: {
    type: [Types.ObjectId],
    ref: "Collection",
    default: [],
  },
});

const Image: Model<IImage> = model("Image", imageSchema, "images");

export default Image;
