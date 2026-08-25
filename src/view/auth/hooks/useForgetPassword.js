import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormWithReinitialize } from "../../../hooks";
import { useForgotPasswordMutation } from "../../../store/rtkServices/auth";
import { handleMutation, toaster } from "../../../utility";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export function useForgetPassword() {
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
        toaster.success(data?.message || "Reset link request submitted");
      },
    });
  };

  return {
    control,
    isLoading: isSubmitting || isLoading,
    handleSubmit: handleSubmit(onSubmit),
  };
}
