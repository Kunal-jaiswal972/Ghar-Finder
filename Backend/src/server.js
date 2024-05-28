import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDB } from "./db/conn.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();

// app.use(express.raw({ type: "application/json" }));

/* Webhook require raw request body for this solution - 
https://stackoverflow.com/questions/18710225/node-js-get-raw-request-body-using-express */

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", router);

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.status(201).json("hi from server");
});

connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server Open On http://localhost:${PORT} & Connected To Database 🤟`
      )
    );
  })
  .catch((err) => {
    console.log("Server Error", err);
  });
