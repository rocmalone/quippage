import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
