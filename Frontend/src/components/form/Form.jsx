import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, formSchema } from "@/lib/validations/FormValidation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/form/CustomInput";
import CustomTextarea from "@/components/form/CustomTextArea";
import CustomSelect from "@/components/form/CustomSelect";
import UploadWidget from "@/components/uploadWidget/UploadWidget";

import { useCreateListing } from "@/services/mutations";
import { useGetUserQuery } from "@/services/queries";

const ListingForm = () => {
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { data: user } = useGetUserQuery();

  const CreateListingMutation = useCreateListing();

  const onSubmit = (data) => {
    const newData = { ...data, userId: user.id, images };
    console.log(newData);
    CreateListingMutation.mutate(newData);
    setImages([]);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-8 mx-auto">
          <div className="space-y-6">
            <CustomInput
              control={form.control}
              name="placeName"
              label="Name of the property"
              placeholder="Enter the name of the property"
            />
            <CustomInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Enter the address"
            />
            <CustomTextarea
              control={form.control}
              name="description"
              label="Description"
              placeholder="Describe the property"
            />
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={form.control}
                name="latitude"
                label="Latitude"
                placeholder="Enter the latitude"
                type="number"
              />
              <CustomInput
                control={form.control}
                name="longitude"
                label="Longitude"
                placeholder="Enter the longitude"
                type="number"
              />
            </div>
            <CustomInput
              control={form.control}
              name="price"
              label="Price"
              placeholder="Enter the price"
              type="number"
            />
            <CustomSelect
              control={form.control}
              name="type"
              label="Type"
              options={[
                { value: "buy", label: "Buy" },
                { value: "rent", label: "Rent" },
              ]}
            />
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
        >
          Create New Listing
        </Button>
      </form>
    </Form>
  );
};

export default ListingForm;
