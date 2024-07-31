import ListingForm from "@/components/form/ListingForm";

const CreateListing = () => {
  return (
    <div className="w-full p-2 overflow-y-scroll no-scrollbar">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Create New Listings
      </h1>
      <ListingForm />
    </div>
  );
};

export default CreateListing;
