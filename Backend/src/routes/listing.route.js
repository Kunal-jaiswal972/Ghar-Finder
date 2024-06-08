import { Router } from "express";
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getGeoSpatialQuery,
} from "../controllers/listing.controller.js";

const router = Router();

router.get("/", getListings);
router.get("/geospatial", getGeoSpatialQuery);
router.get("/:ListingId", getListing);
router.post("/", createListing);
router.put("/:ListingId", updateListing);
router.delete("/:ListingId", deleteListing);

export default router;
