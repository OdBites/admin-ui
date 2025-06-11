import * as z from "zod";

// 🎯 Zod validation schema
export const userSchemaValidation = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .trim(),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .trim(),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be Active or Inactive",
  }),
});
