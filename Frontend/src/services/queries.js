import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { getGeoSpatialListings, getListing, getListings, getUser } from "@/services/api";

export const useGetUserQuery = () => {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ["user", { userId }],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

export const useGetGeoSpatialListingsQuery = (
  latitude,
  longitude,
  maxDistance
) => {
  return useQuery({
    queryKey: ["listing", { latitude, longitude, maxDistance }],
    queryFn: () => getGeoSpatialListings(latitude, longitude, maxDistance),
  });
};

export const useGetListingsQuery = () => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });
};

export const useGetListingQuery = (ListingId) => {
  return useQuery({
    queryKey: ["listings", { ListingId }],
    queryFn: () => getListing(ListingId),
  });
};
