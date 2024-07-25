import { Router } from "express";
import {
  checkSave,
  getUser,
  getUsers,
  saveListing,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/isSaved", checkSave);
router.post("/save", saveListing);
router.get("/:clerkId", getUser);

export default router;
