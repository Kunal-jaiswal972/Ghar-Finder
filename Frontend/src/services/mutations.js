import { createListing } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateListing = () => {
  return useMutation({
    mutationFn: (data) => createListing(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      toast.error("Something went wrong! Please try again!");
    },
    onSuccess: () => {
      toast.success("Listing created successfully");
    },
  });
};
