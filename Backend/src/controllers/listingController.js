import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

export const getListingByListingId = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const listing = await Listing.findOne({ _id: listingId });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.exists({ clerkId: userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listings = await Listing.find({ user: user._id });
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createListing = async (req, res) => {
  try {
    const { userId, ...listingData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const listing = new Listing({
      ...listingData,
      user: user._id,
    });

    await listing.save();

    user.listings.push(listing._id);
    await user.save();

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
