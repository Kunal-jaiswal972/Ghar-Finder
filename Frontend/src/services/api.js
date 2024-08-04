import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_BACKEND_URL || "http://localhost:7000") + "/api/v1";
  console.log(BASE_URL)
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getUser = async (clerkId) => {
  if (!clerkId) return { user: null, isSignedIn: false };

  const { data } = await axiosInstance.get(`/users/${clerkId}`);
  return { user: data, isSignedIn: true };
};

export const createListing = async (listing) => {
  const { data } = await axiosInstance.post("/listings", listing);
  return data;
};

export const getListings = async (query) => {
  const { data } = await axiosInstance.get("/listings?" + query);
  return data;
};

export const getListing = async (ListingId) => {
  const { data } = await axiosInstance.get(`/listings/${ListingId}`);
  return data;
};

export const getGeoSpatialListings = async (
  latitude,
  longitude,
  maxDistance
) => {
  const { data } = await axiosInstance.get(
    `/listings/geospatial?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}`
  );

  const listings = data.map((listing) => {
    const { location, ...rest } = listing;
    const { coordinates } = location;
    const [longitude, latitude] = coordinates;
    return { ...rest, latitude, longitude };
  });

  console.log(listings);
  return listings;
};

export const saveListing = async (payload) => {
  const { data } = await axiosInstance.post("/users/save", payload);
  return data;
};

export const isSaved = async (userId, listingId) => {
  const { data } = await axiosInstance.get(
    `/users/isSaved?userId=${userId}&listingId=${listingId}`
  );
  return data;
};

export const getProfile = async (userId) => {
  const { data } = await axiosInstance.get(`/users/profile/${userId}`);
  return data;
};
