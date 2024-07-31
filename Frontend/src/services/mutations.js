import { createListing, isSaved, saveListing } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: createNewListing, isLoading } = useMutation({
    mutationFn: (data) => createListing(data),
    onMutate: () => {
      toast.loading("Submitting...", { id: "createListingToast" });
    },
    onError: (err) => {
      console.error("useCreateListing", err);
      toast.error("Something went wrong! Please try again!", {
        id: "createListingToast",
      });
    },
    onSuccess: async () => {
      toast.success("Listing created successfully", {
        id: "createListingToast",
      });
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
      navigate("/listings");
    },
  });

  return { createNewListing, isLoading };
};

export const useSaveListing = () => {
  const queryClient = useQueryClient();

  const { mutate: save, isLoading: saving } = useMutation({
    mutationFn: (data) => saveListing(data),
    onMutate: () => {
      toast.loading("Saving...", { id: "saveListingToast" });
    },
    onError: (err) => {
      console.error("useSaveListing", err);
      toast.error("Something went wrong!", { id: "saveListingToast" });
    },
    onSuccess: async (data, args) => {
      toast.success(
        data.isSaved
          ? "Listing saved in saved list"
          : "Listing removed from saved list",
        { id: "saveListingToast" }
      );

      await queryClient.invalidateQueries({
        queryKey: [
          "isListingSaved",
          { userId: args.userId, listingId: args.listingId },
        ],
      });
    },
  });

  return { save, saving };
};
