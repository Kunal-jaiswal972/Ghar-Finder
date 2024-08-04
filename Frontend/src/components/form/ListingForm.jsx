import { useState } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/form/CustomInput";
import CustomTextarea from "@/components/form/CustomTextArea";
import CustomSelect from "@/components/form/CustomSelect";
import UploadWidget from "@/components/uploadWidget/UploadWidget";

import { cityOptions, propertyOptions, typeOptions } from "@/config/config";
import { useFormCreateListing } from "@/validations/FormValidation";

import { useCreateListing } from "@/services/mutations";
import { useGetUserQuery } from "@/services/queries";

const ListingForm = () => {
  const [images, setImages] = useState([]);

  const form = useFormCreateListing();
  const { auth } = useGetUserQuery();
  const { createNewListing, isLoading } = useCreateListing();

  const onSubmit = async (data) => {
    const { listingData, listingDetail } = data;
    listingData.images = images;

    await createNewListing({
      userId: auth.user.id,
      listingData,
      listingDetail,
    });

    setImages(["/noimage.png"]);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-8 mx-auto">
          <div className="space-y-6">
            <CustomInput
              control={form.control}
              name="listingData.placeName"
              label="Name of the property"
              placeholder="Enter the name of the property"
            />
            <CustomInput
              control={form.control}
              name="listingData.address"
              label="Address"
              placeholder="Enter the address"
            />
            <CustomSelect
              control={form.control}
              name="listingData.city"
              label="City"
              options={cityOptions}
            />
            <CustomTextarea
              control={form.control}
              name="listingData.description"
              label="Description"
              placeholder="Describe the property"
            />
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={form.control}
                name="listingData.latitude"
                label="Latitude"
                placeholder="Enter the latitude"
                type="number"
              />
              <CustomInput
                control={form.control}
                name="listingData.longitude"
                label="Longitude"
                placeholder="Enter the longitude"
                type="number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={form.control}
                name="listingData.bedroom"
                label="Bedroom"
                placeholder="No. of bedrooms"
                type="number"
              />
              <CustomInput
                control={form.control}
                name="listingData.bathroom"
                label="Bathroom"
                placeholder="No. of bathrooms"
                type="number"
              />
            </div>

            <CustomInput
              control={form.control}
              name="listingData.price"
              label="Price"
              placeholder="Enter the price"
              type="number"
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomSelect
                control={form.control}
                name="listingData.type"
                label="Type"
                options={typeOptions}
              />
              <CustomSelect
                control={form.control}
                name="listingData.property"
                label="Property"
                options={propertyOptions}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* TODO: add cloudinary api and remove images feature */}
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "kunalcloudinary",
                uploadPreset: "gharFinder",
                folder: "listings",
              }}
              setState={setImages}
            />
            <div className="grid grid-cols-2 gap-1">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="rounded-sm object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white mt-4"
          size="lg"
          type="submit"
          loading={isLoading}
        >
          {isLoading ? "Submiting..." : "Create New Listing"}
        </Button>
      </form>
    </Form>
  );
};

export default ListingForm;
