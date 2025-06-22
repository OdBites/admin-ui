import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput, AvatarUpload } from "SpiseBowlMfUI/sharedComp";

import { PageHeader } from "../../sharedComponents";
import { useFormWithReinitialize } from "../../lib/hooks";
import { profileSchema } from "./validation";
import UpdatePasswordModal from "./components/UpdatePasswordModal";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState({
    open: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@nexcart.in",
      description: "Administrator of the NexCart e-commerce platform.",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setIsEditing(false);
    // Submit form data
    console.log("Saving profile...", data);
  };

  return (
    <>
      <PageHeader pageTitle="Profile" hideExportBtn showBackBtn />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Card sx={{ width: { xs: "100%", lg: 350 } }}>
          <Stack spacing={2} alignItems="center">
            <AvatarUpload
              avatar="/static/images/avatar/1.jpg"
              alt={`${"userDetails.firstName"} ${"userDetails.lastName"}`}
              onSave={(imgUrl) => {
                console.log("Saved avatar:", imgUrl);
              }}
            />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Somyaranjan Sethy
            </Typography>
            <Button
              size="micro"
              type="button"
              onClick={() => setUpdatePasswordModal({ open: true })}
            >
              Update Password
            </Button>
            <Box>
              <Typography variant="body2" gutterBottom={3} color="textDisabled">
                Description
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                autem velit suscipit. Iusto exercitationem suscipit illum
                necessitatibus quod deserunt, blanditiis iure molestiae ad non,
                ipsam accusamus nemo sint consequatur ducimus.
              </Typography>
            </Box>
          </Stack>
        </Card>
        <Card sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Account Information
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Grid
            component="form"
            container
            spacing={1.5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormInput
                name="firstName"
                label="First Name"
                control={control}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormInput
                name="lastName"
                label="Last Name"
                control={control}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormInput
                name="email"
                label="Email"
                control={control}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item size={12}>
              <FormInput
                name="description"
                label="Description"
                inputType="textarea"
                control={control}
                disabled={!isEditing}
              />
            </Grid>
            <Grid size={12} mt={1}>
              {!isEditing ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                >
                  Update Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Save Profile
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    disabled={isSubmitting}
                    sx={{ px: 4 }}
                  >
                    Cancel
                  </Button>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>

      <UpdatePasswordModal
        updatePasswordModal={updatePasswordModal}
        setUpdatePasswordModal={setUpdatePasswordModal}
      />
    </>
  );
}

export default Profile;
