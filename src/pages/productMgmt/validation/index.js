import * as z from "zod";

// 🎯 Step 1: Basic Information
export const basicInfoSchema = z.object({
  name: z
    .string()
    .nonempty("Dish name is required")
    .min(2, "Dish name must be at least 2 characters")
    .max(100, "Dish name must be at most 100 characters")
    .trim(),

  description: z
    .string()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters")
    .trim(),

  status: z.enum(["active", "inActive", "outOfStock", "blocked"], {
    required_error: "Status is required",
    invalid_type_error:
      "Status must be active, inActive, outOfStock or blocked",
  }),
});

// 🎯 Step 2: Pricing & Inventory
export const pricingObject = z.object({
  price: z
    .string()
    .nonempty("Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),

  discountPrice: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Discount price must be a non-negative number",
    }),

  stock: z
    .string()
    .nonempty("Stock is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Stock must be a number (0 or more)",
    }),

  sku: z
    .string()
    .nonempty("Dish code is required")
    .min(3, "Dish code must be at least 3 characters")
    .max(20, "Dish code must be at most 20 characters")
    .trim(),

  category: z
    .string()
    .nonempty("Category is required")
    .min(2, "Category must be at least 2 characters"),

  subCategory: z
    .string()
    .nonempty("Cuisine Type is required")
    .min(2, "Cuisine Type must be at least 2 characters"),
});

export const pricingSchema = pricingObject.refine(
  (data) => {
    if (
      data.discountPrice &&
      Number(data.discountPrice) >= Number(data.price)
    ) {
      return false;
    }
    return true;
  },
  {
    message: "Discount price must be less than the regular price",
    path: ["discountPrice"],
  }
);

// 🎯 Step 3: Media & Categorization
export const mediaSchema = z.object({
  images: z
    .array(
      z.union([
        z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
          message: "Only image files are allowed",
        }),
        z.string(),
      ])
    )
    .nonempty("At least one image is required"),
});

// 🎯 Full Form Validation Schema (merged)
export const fullProductSchema = basicInfoSchema
  .merge(pricingObject)
  .merge(mediaSchema)
  .refine(
    (data) => {
      if (
        data.discountPrice &&
        Number(data.discountPrice) >= Number(data.price)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Discount price must be less than the regular price",
      path: ["discountPrice"],
    }
  );
