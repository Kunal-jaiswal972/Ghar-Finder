import { createListing } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateListing = () => {
  return useMutation({
    mutationFn: (data) => createListing(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};
