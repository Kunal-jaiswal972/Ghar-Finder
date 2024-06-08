import axios from "axios";

const BASE_URL = "http://localhost:7000/api/v1";
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getUser = async (clerkId) => {
  const { data: user } = await axiosInstance.get(`/users/${clerkId}`);
  return user;
};

export const createListing = async (listing) => {
  const { data } = await axiosInstance.post("/listings", listing);
  return data;
};

export const getListings = async () => {
  const { data } = await axiosInstance.get("/listings");
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

export const isSaved = async (payload) => {
  const { data } = await axiosInstance.post("/users/isSaved", payload);
  console.log('data is saved', data);
  return data;
};
