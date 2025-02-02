import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import {
  getGeoSpatialListings,
  getListing,
  getListings,
  getProfile,
  getUser,
  isSaved,
} from "@/services/api";
import { useLocation } from "react-router-dom";

export const useGetUserQuery = () => {
  const { userId, isLoaded } = useAuth();

  const {
    data: auth,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getUser(userId),
    enabled: isLoaded,
  });

  // console.log({ auth, isLoading, isError, error });

  return { auth, isLoading, isError, error };
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
  const queryParams = search ? search.substring(1) : "";

  const {
    data: listings,
    isLoading: isListingsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["listings", { queryParams }],
    queryFn: () => getListings(queryParams),
  });

  return { listings, isListingsLoading, isError, error };
};

export const useGetListingQuery = (ListingId) => {
  const {
    data: listing,
    isLoading: isListingLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["listing", { ListingId }],
    queryFn: () => getListing(ListingId),
  });

  return { listing, isListingLoading, isError, error };
};

export const useIsListingSaved = ({ userId, listingId }) => {
  const { isSignedIn } = useAuth();

  const { data: saveInfo, isLoading } = useQuery({
    queryKey: ["isListingSaved", { userId, listingId }],
    queryFn: () => isSaved(userId, listingId),
    enabled: isSignedIn,
  });

  if (!isSignedIn) return { saveInfo: null, isLoading: false };

  return {
    saveInfo,
    isLoading,
  };
};

export const useProfileLisitngs = (userId, isSignedIn) => {
  const { data: profileListings, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", { userId }],
    queryFn: () => getProfile(userId),
    enabled: isSignedIn,
  });

  return { profileListings, isProfileLoading };
};
