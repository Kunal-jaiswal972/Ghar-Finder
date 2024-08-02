import { Router } from "express";
import {
  checkSave,
  getUser,
  getUsers,
  saveListing,
  getProfileListings,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/isSaved", checkSave);
router.get("/profile/:userId", getProfileListings);
router.get("/:clerkId", getUser);
router.post("/save", saveListing);

export default router;
