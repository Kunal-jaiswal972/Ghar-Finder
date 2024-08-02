import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cityOptions, propertyOptions, typeOptions } from "@/config/config";

const ListingDataSchema = z.object({
  placeName: z.string().min(3, "Placename must be at least 3 characters long"),
  description: z.string().optional(),
  address: z.string().min(3, "Address must be at least 3 characters long"),
  city: z.enum(cityOptions, { message: "City is required" }),
  latitude: z.preprocess(
    (lat) => parseFloat(lat),
    z
      .number({ invalid_type_error: "Latitude is required" })
      .min(-90, "Latitude must be greater than or equal to -90")
      .max(90, "Latitude must be less than or equal to 90")
  ),
  longitude: z.preprocess(
    (lng) => parseFloat(lng),
    z
      .number({ invalid_type_error: "Longitude is required" })
      .min(-180, "Longitude must be greater than or equal to -180")
      .max(180, "Longitude must be less than or equal to 180")
  ),
  price: z.preprocess(
    (value) => parseFloat(value),
    z
      .number({ invalid_type_error: "Price is required" })
      .min(0, "Price must be greater than 0")
  ),
  bedroom: z.preprocess(
    (value) => parseFloat(value),
    z
      .number({ invalid_type_error: "Bedroom number is required" })
      .min(1, "Bedroom must be greater than 0")
  ),
  bathroom: z.preprocess(
    (value) => parseFloat(value),
    z
      .number({ invalid_type_error: "Bathroom number is required" })
      .min(1, "Bathroom must be greater than 0")
  ),
  type: z.enum(typeOptions).default("buy"),
  property: z.enum(propertyOptions).default("house"),
});

const ListingDetailSchema = z.object({
  utilities: z
    .enum(["Owner is responsible", "Tenant is responsible", "Shared"])
    .default("Owner is responsible")
    .optional(),
  pet: z.enum(["allowed", "not allowed"]).default("not allowed").optional(),
  income: z.string().nullable().optional(),
  size: z.number().nullable().optional(),
  school: z.number().nullable().optional(),
  bus: z.number().nullable().optional(),
  railway: z.number().nullable().optional(),
});

export const ListingFormSchema = z.object({
  listingData: ListingDataSchema,
  listingDetail: ListingDetailSchema,
});

const defaultValues = {
  listingData: {
    placeName: "",
    description: "",
    address: "",
    city: "delhi",
    latitude: 0,
    longitude: 0,
    price: 0,
    bedroom: 1,
    bathroom: 1,
    type: "buy",
    property: "house",
  },
  listingDetail: {
    utilities: "Tenant is responsible",
    pet: "not allowed",
    income: null,
    size: null,
    school: null,
    bus: null,
    railway: null,
  },
};

export const useFormCreateListing = () =>
  useForm({
    resolver: zodResolver(ListingFormSchema),
    defaultValues,
  });
