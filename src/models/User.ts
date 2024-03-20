import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },

    profile_image: {
      type: String,
    },

    full_name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserModel);

export default User;
