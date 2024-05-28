import { Router } from "express";
import { webhookController } from "../controllers/clerkWebhookController.js";

const ClerkWebhookRoutes = Router();

ClerkWebhookRoutes.post("", webhookController);

export default ClerkWebhookRoutes;
