import { Router } from "express";
import {
  getAutocomplete,
  getIp,
  getNearby,
  getRoute,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/autocomplete", getAutocomplete);
router.post("/nearby", getNearby);
router.post("/directions", getRoute);
router.get("/ip", getIp);

export default router;
