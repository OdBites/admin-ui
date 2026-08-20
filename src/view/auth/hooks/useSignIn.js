import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormWithReinitialize } from "../../../hooks";
import { useAdminSignInMutation } from "../../../store/rtkServices/auth";
import { handleMutation } from "../../../utility";
import { userSignIn } from "../../../store/actions";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useSignIn() {
  const dispatch = useDispatch();

  // // RTK state
  const [adminSignIn] = useAdminSignInMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userData) => {
    await handleMutation({
      mutationFn: adminSignIn,
      payload: userData,
      onSuccess: (data) => {
        dispatch(userSignIn(data));
      },
    });
  };

  return {
    control,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
  };
}
