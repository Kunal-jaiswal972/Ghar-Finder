import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import {
  getGeoSpatialListings,
  getListing,
  getListings,
  getUser,
  isSaved,
} from "@/services/api";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

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
  const { search } = useLocation();
  const queryParams = search.split("?")[1];

  return useQuery({
    queryKey: ["listings", { queryParams }],
    queryFn: () => getListings(queryParams),
  });
};

export const useGetListingQuery = (ListingId) => {
  return useQuery({
    queryKey: ["listings", { ListingId }],
    queryFn: () => getListing(ListingId),
  });
};

export const useIsListingSaved = ({ userId, listingId }) => {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["isListingSaved", { userId, listingId }],
    queryFn: () => isSaved(userId, listingId),
    enabled: isSignedIn,
  });
};
