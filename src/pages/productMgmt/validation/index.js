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

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be active or inactive",
  }),
});

// 🎯 Step 2: Pricing & Inventory
export const pricingSchema = z.object({
  price: z
    .string()
    .nonempty("Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
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
});

// 🎯 Step 3: Media & Categorization
export const mediaSchema = z.object({
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Only image files are allowed",
      })
    )
    .nonempty("At least one image is required"),

  category: z
    .string()
    .nonempty("Category is required")
    .min(2, "Category must be at least 2 characters"),

  subCategory: z
    .string()
    .nonempty("Sub-category is required")
    .min(2, "Sub-category must be at least 2 characters"),
});

// 🎯 Full Form Validation Schema (merged)
export const fullProductSchema = basicInfoSchema
  .merge(pricingSchema)
  .merge(mediaSchema);
