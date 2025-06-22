import React from "react";
import { Box, Button, Container, Typography, Stack, Link } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";

import { FormInput } from "SpiseBowlMfUI/sharedComp";
import { useCookies } from "SpiseBowlMfUI/hooks";

import { useFormWithReinitialize } from "../../lib/hooks";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignIn() {
  const { setCookie } = useCookies();

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

  const onSubmit = async (data) => {
    console.log("Signing in with:", data);
    // TODO: Handle API call
    setCookie("auth_token", Math.random(), {
      maxAgeHours: 1,
      path: "/",
      sameSite: "Lax",
    });
    setCookie("user_theme", "light", { maxAgeDays: 1, path: "/" });
    window.location.reload();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 6,
            borderRadius: 3,
            p: { xs: 3, sm: 5 },
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            mb={3}
            color="text.secondary"
          >
            Sign in to continue to your dashboard
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <FormInput
                name="email"
                control={control}
                label="Email"
                inputType="text"
              />
              <FormInput
                name="password"
                control={control}
                label="Password"
                inputType="password"
              />

              <Box display="flex" justifyContent="flex-end">
                <Link component={NavLink} to="/forgot-password" variant="body2">
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default SignIn;
