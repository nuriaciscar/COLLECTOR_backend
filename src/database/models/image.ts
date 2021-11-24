import { Schema, model, Types, Model } from "mongoose";

interface IImage {
  description: string;
  date: Date;
  image: string;
  imageLocal: string;
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
  owner: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const Collection: Model<IImage> = model("Image", imageSchema, "images");

export default Collection;
