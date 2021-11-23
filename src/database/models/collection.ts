import { Schema, model,  Model } from "mongoose";

interface ICollection{
  name: string;
  username: string;
  password: string;
}

const collectionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  

});

const User: Model<ICollection> = model("Collection", collectionSchema, "collections");

export default User;
