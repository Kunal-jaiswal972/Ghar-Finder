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
