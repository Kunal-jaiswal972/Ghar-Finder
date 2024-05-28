import { Router } from "express";
import {
  getListingByListingId,
  getListingsByUserId,
  createListing,
} from "../controllers/listingController.js";

const ListingRoutes = Router();

ListingRoutes.get("/user/:userId", getListingsByUserId);
ListingRoutes.get("/:listingId", getListingByListingId);
ListingRoutes.post("/create", createListing);

export default ListingRoutes;
