import { Router } from "express";
import { getUserById } from "../controllers/UserController.js";

const UserRoutes = Router();

UserRoutes.get("/:userId", getUserById);

export default UserRoutes;