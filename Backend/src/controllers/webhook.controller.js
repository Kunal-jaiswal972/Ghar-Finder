import { Webhook } from "svix";
import { config } from "dotenv";
import prisma from "../lib/prisma.js";

config();

const handleUserCreated = async (evt) => {
  const {
    id,
    first_name,
    last_name,
    profile_image_url,
    email_addresses,
    username,
  } = evt.data;
  const email = email_addresses[0].email_address;

  const user = await prisma.user.create({
    data: {
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      userName: username,
      profile_pic: profile_image_url,
      email: email,
    },
  });
  console.log("user created", user);

  return user;
};

const handleUserUpdated = async (evt) => {
  const {
    id,
    first_name,
    last_name,
    profile_image_url,
    email_addresses,
    username,
  } = evt.data;
  const email = email_addresses[0].email_address;

  const user = await prisma.user.update({
    where: { clerkId: id },
    data: {
      firstName: first_name,
      lastName: last_name,
      userName: username,
      profile_pic: profile_image_url,
      email: email,
    },
  });

  console.log("user updated", user);

  return user;
};

const handleUserDeleted = async (evt) => {
  const { id } = evt.data;

  const user = await prisma.user.delete({
    where: { clerkId: id },
  });

  console.log("user deleted", user);

  return { message: `User and their listings with ${id} deleted` };
};

export const webhookController = async (req, res) => {
  try {
    const payloadString = req.rawBody.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const user = await handleUserCreated(evt);
      res.status(200).json(user);
    } else if (eventType === "user.updated") {
      const user = await handleUserUpdated(evt);
      res.status(200).json(user);
    } else if (eventType === "user.deleted") {
      const result = await handleUserDeleted(evt);
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Unhandled event type" });
    }

    console.log(`${evt.data.id} -> ${eventType}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
