import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForgotPasswordMutation } from "../../../store/rtkServices/auth";
import { handleMutation, toaster } from "../../../utility";
import { useFormWithReinitialize } from "../../../hooks";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export function useForgetPassword() {
  /*
    Local State Declarations
   */
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  /*
    Redux API Queries & Mutations (RTK Query)
   */
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  /*
    Computed Values & Memos (State Aggregates)
   */
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  /*
    Handlers & Callback Actions
   */
  const onSubmit = async (payload) => {
    await handleMutation({
      mutationFn: forgotPassword,
      payload,
      onSuccess: (data) => {
        setSubmittedEmail(payload.email);
        setIsSubmitted(true);
        toaster.success(
          data?.message || "Password reset instructions have been sent."
        );
        reset();
      },
    });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedEmail("");
  };

  return {
    control,
    isSubmitted,
    submittedEmail,
    isLoading: isSubmitting || isLoading,
    handleSubmit: handleSubmit(onSubmit),
    handleResetForm,
  };
}
