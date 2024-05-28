import mongoose from "mongoose";
import Listing from "../models/listingModel.js";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profile_pic: String,
  listings: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listings",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
