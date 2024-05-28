import mongoose from "mongoose";
import Listing from "./models/listings.models.js";
import User from "./models/user.models.js";
import { connectToDB } from "./db/conn.js";

connectToDB();

async function insertDummyData() {
  try {
    const dummyUser = await User.findOne({ id: "123" });

    if (!dummyUser) {
      console.error("Dummy user not found.");
      return;
    }

    const listings = [
      {
        name: "Luxury Apartment",
        description: "Spacious luxury apartment with great amenities",
        address: "123 Main St, City",
        location: {
          type: "Point",
          coordinates: [-73.97, 40.77],
        },
        price: 2000,
        images: ["image1.jpg", "image2.jpg"],
        sell: true,
        rent: false,
        user: dummyUser._id,
      },
      {
        name: "Cozy Cottage",
        description: "Charming cottage in the countryside",
        address: "456 Elm St, Village",
        location: {
          type: "Point",
          coordinates: [-73.9928, 40.7193],
        },
        price: 1500,
        images: ["image3.jpg", "image4.jpg"],
        sell: false,
        rent: true,
        user: dummyUser._id,
      },
      {
        name: "Cozy Cottage",
        description: "Charming cottage in the countryside",
        address: "456 Elm St, Village",
        location: {
          type: "Point",
          coordinates: [-73.9375, 40.8303],
        },
        price: 1500,
        images: ["image3.jpg", "image4.jpg"],
        sell: false,
        rent: true,
        user: dummyUser._id,
      },
    ];

    await Listing.insertMany(listings);

    console.log("Dummy data inserted successfully!");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    mongoose.disconnect();
  }
}

insertDummyData();
