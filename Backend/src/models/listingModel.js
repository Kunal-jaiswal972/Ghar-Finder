import mongoose from "mongoose";

const listingschema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  sell: {
    type: Boolean,
  },
  rent: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

listingschema.index({ location: "2dsphere" });

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingschema);

export default Listing;
