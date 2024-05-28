import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, formSchema } from "@/lib/validations/FormValidation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useCreateListing } from "@/services/mutations";
import { useUser } from "@clerk/clerk-react";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const CreateListingMutation = useCreateListing();
  const { user } = useUser();

  const handleImage = (e, fieldChange) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formattedData = {
      userId: user.id,
      ...data,
      location: {
        type: "Point",
        coordinates: [data.longitude, data.latitude],
      },
      images: ["images.jpg"],
    };
    delete formattedData.latitude;
    delete formattedData.longitude;

    console.log(formattedData);
    CreateListingMutation.mutate(formattedData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-semibold mb-2 text-center">
          Create Listings
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4 md:p-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="placeName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Name of the property</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the name of the property"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe the property"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the latitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the longitude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sell"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 !mb-0">Sell</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 !mb-0">Rent</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="flex bg-dark-4">
                    Click to Upload (max. 6)
                  </FormLabel>
                  <FormControl className="text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      placeholder="Click to Upload"
                      className="cursor-pointer bg-transparent file:text-blue"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="py-6 px-4 md:px-8">
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
            type="submit"
          >
            Create Listing
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateListing;
