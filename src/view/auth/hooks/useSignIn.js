import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAdminSignInMutation } from "../../../store/rtkServices/auth";
import { userSignIn } from "../../../store/actions";
import { handleMutation } from "../../../utility";
import { useFormWithReinitialize } from "../../../hooks";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useSignIn() {
  /*
    Hooks & Theme Configuration
   */
  const dispatch = useDispatch();

  /*
    Redux API Queries & Mutations (RTK Query)
   */
  const [adminSignIn] = useAdminSignInMutation();

  /*
    Computed Values & Memos (State Aggregates)
   */
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

  /*
    Handlers & Callback Actions
   */
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
