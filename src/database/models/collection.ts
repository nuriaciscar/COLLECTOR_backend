import { Schema, model, Types, Model} from "mongoose";

interface ICollection{
  name: string;
  date: Date;
  
}

const collectionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  images: {
    type: [Types.ObjectId],
    ref: "Image",
    required: true,
  }
});

const Collection: Model<ICollection> = model("Collection", collectionSchema, "collections");

export default Collection;
