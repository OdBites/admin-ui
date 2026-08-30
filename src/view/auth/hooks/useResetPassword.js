import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useResetPasswordMutation } from "../../../store/rtkServices/auth";
import { handleMutation, toaster } from "../../../utility";
import { useFormWithReinitialize } from "../../../hooks";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
      .regex(/\d/, "Must contain at least 1 number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least 1 special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function useResetPassword() {
  /*
    Hooks & Theme Configuration
   */
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  /*
    Local State Declarations
   */
  const [isSuccess, setIsSuccess] = useState(false);

  /*
    Redux API Queries & Mutations (RTK Query)
   */
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  /*
    Computed Values & Memos (State Aggregates)
   */
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword") || "";

  /*
    Handlers & Callback Actions
   */
  const onSubmit = async (data) => {
    if (!token) {
      toaster.error("Invalid or missing reset token.");
      return;
    }

    await handleMutation({
      mutationFn: resetPassword,
      payload: {
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      onSuccess: (res) => {
        setIsSuccess(true);
        toaster.success(
          res?.message || "Password has been successfully reset!"
        );
      },
    });
  };

  return {
    token,
    control,
    newPassword,
    isSuccess,
    isLoading: isSubmitting || isLoading,
    handleSubmit: handleSubmit(onSubmit),
    navigate,
  };
}
