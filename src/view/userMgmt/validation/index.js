import * as z from "zod";

// 🎯 Base fields shared by both create and edit
const baseUserFields = {
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
  status: z.enum(["active", "blocked", "pending"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
};

// Create user: password is required
export const createUserSchema = z.object({
  ...baseUserFields,
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// Edit user: password is optional (empty = don't change)
export const editUserSchema = z.object({
  ...baseUserFields,
  password: z
    .union([
      z.literal(""),
      z.string().min(8, "Password must be at least 8 characters"),
    ])
    .optional(),
});

// Keep backward-compatible export (defaults to edit behavior)
export const userSchemaValidation = editUserSchema;
