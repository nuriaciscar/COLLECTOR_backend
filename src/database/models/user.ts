import { Schema, model, Types, Model } from "mongoose";

interface IUser {
  name: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  collections: {
    type: [Types.ObjectId],
    ref: "Collection",
    default: [],
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = model("User", userSchema, "users");

export default User;
