import { Schema, model, Types } from "mongoose";

interface IUser {
  name: string,
  username: string,
  password: string,
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
    minlength: 1,
    maxlength: 20,
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
    required: false
  },
});

const User: model<IUser> = model("User", userSchema, "users");

export default User;
