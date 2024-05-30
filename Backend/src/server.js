import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma.js";

import userRoutes from "./routes/user.route.js";
import webhookRoutes from "./routes/webhook.route.js";
import listingRoutes from "./routes/listing.route.js";

config();
const app = express();
const PORT = process.env.PORT || 7000;

/* Webhook require raw request body for this solution - 
https://stackoverflow.com/questions/18710225/node-js-get-raw-request-body-using-express */

// app.use(express.raw({ type: "application/json" }));

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/webhook", webhookRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/listings", listingRoutes);

app.get("/", (req, res) => {
  res.status(201).json("hi from server");
});

app.listen(PORT, () => console.log(`Server Open On http://localhost:${PORT}`));

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
