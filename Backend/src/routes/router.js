import { Router } from "express";
import UserRoutes from "./userRoute.js";
import ClerkWebhookRoutes from "./clerkWebhookRoute.js";
import ListingRoutes from "./listingRoute.js";

const router = Router();

router.use("/user", UserRoutes);
router.use("/webhook", ClerkWebhookRoutes);
router.use("/listings", ListingRoutes);



export default router;
