import { Webhook } from "svix";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

dotenv.config();

export const webhookController = async (req, res) => {
  try {
    const payloadString = req.rawBody.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);

    const {
      id,
      first_name,
      last_name,
      profile_image_url,
      email_addresses,
      username,
    } = evt.data;

    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
          $set: {
            firstName: first_name,
            lastName: last_name,
            userName: username,
            profile_pic: profile_image_url,
            email: email_addresses[0].email_address,
          },
        },
        { upsert: true, new: true } // if user doesn't exist, create a new one
      );

      await user.save();
      res.status(200).json(user);
    }

    if (eventType === "user.deleted") {
      const user = await User.findOneAndDelete({ clerkId: id });
      await Listing.deleteMany({ user: user._id });
      res
        .status(200)
        .json({ message: `user and their listings with ${id} deleted` });
    }

    console.log(`${id} -> ${eventType}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
