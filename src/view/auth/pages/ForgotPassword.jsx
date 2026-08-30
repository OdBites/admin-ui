import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography, Stack, Link } from "@mui/material";

import { Button, FormInput } from "OdBitesMfUI/sharedComp";

import { useForgetPassword } from "../hooks";

function ForgotPassword() {
  /*
    Hook Configuration & Destructuring
   */
  const {
    /*
      Computed API Data & Memos
     */
    control,

    /*
      RTK Query API State Indicators
     */
    isLoading,

    /*
      Event Handler Callbacks
     */
    handleSubmit,
  } = useForgetPassword();

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

          <form onSubmit={handleSubmit} noValidate>
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
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
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
