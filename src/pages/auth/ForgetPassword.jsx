import React from "react";
import { Box, Button, Container, Typography, Stack, Link } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";

import { FormInput } from "nexCartMfUI/sharedComp";
import { useFormWithReinitialize } from "../../lib/hooks";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Reset link sent to:", data.email);
    // TODO: Call your forgot password API here
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
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            mb={3}
            color="text.secondary"
          >
            Enter your email address and we’ll send you a link to reset your
            password.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <FormInput
                name="email"
                control={control}
                label="Email Address"
                inputType="email"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>

              <Box textAlign="center">
                <Link
                  component={NavLink}
                  to="/signin"
                  variant="body2"
                  underline="hover"
                >
                  Back to Login
                </Link>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
