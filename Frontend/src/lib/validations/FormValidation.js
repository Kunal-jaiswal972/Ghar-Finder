import { z } from "zod";

export const formSchema = z
  .object({
    placeName: z
      .string()
      .min(3, "Placename must be at least 3 characters long"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters long"),
    address: z.string().min(3, "Address must be at least 3 characters long"),
    latitude: z.preprocess(
      (lat) => parseInt(lat),
      z
        .number({ invalid_type_error: "Latitude is required" })
        .min(-90, "Latitude must be greater than or equal to -90")
        .max(90, "Latitude must be less than or equal to 90")
    ),
    longitude: z.preprocess(
      (lng) => parseInt(lng),
      z
        .number({ invalid_type_error: "Longitutde is required" })
        .min(-180, "Longitude must be greater than or equal to -180")
        .max(180, "Longitude must be less than or equal to 180")
    ),
    price: z.preprocess(
      (value) => parseInt(value),
      z
        .number({ invalid_type_error: "Price is required" })
        .min(0, "Price must be greater than 0")
    ),
    sell: z.boolean(),
    rent: z.boolean(),
  })
  .refine((data) => data.sell || data.rent, {
    message: 'Either "sell" or "rent" must be true',
    path: ["sell", "rent"],
  });

export const defaultValues = {
  placeName: "",
  description: "",
  address: "",
  latitude: 0,
  longitude: 0,
  price: 0,
  sell: false,
  rent: false,
};
