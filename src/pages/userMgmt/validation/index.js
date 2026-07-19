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
  phone: z.string().trim().optional(),
  password: z
    .union([z.literal(""), z.string().min(8, "Password must be at least 8 characters")])
    .optional(),
  status: z.enum(["Active", "Inactive", "Blocked", "Pending"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
});
