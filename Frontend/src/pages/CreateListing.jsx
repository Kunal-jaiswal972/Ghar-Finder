import { useState } from "react";
import ListingForm from "@/components/form/Form";

const CreateListing = () => {
  return (
    <div className="w-full h-full overflow-y-scroll no-scrollbar p-2">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Create New Listings
      </h1>
      <ListingForm />
    </div>
  );
};

export default CreateListing;
