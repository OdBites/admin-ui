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

import { FormInput, AvatarUpload } from "OdBitesMfUI/sharedComp";
import { cookies } from "OdBitesMfUI/utility";

import { PageHeader } from "../../sharedComponents";
import { useFormWithReinitialize } from "../../lib/hooks";
import { profileSchema } from "./validation";
import { UpdatePasswordModal } from "./components";
import {
  useGetProfileDetailsQuery,
  useGetProfilePhotoQuery,
  useUpdateProfileDetailsMutation,
  useUpdateProfilePhotoMutation,
} from "../../store/rtkServices";
import { handleMutation, toaster } from "../../utility";
import { VITE_APP_ASSETS_PATH } from "../../config/env";
import { Loader } from "../../assets";

function Profile() {
  const { getCookie } = cookies;

  const userId = getCookie("admin_id");

  const [isEditing, setIsEditing] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState({
    open: false,
  });

  // // rtk query
  const { data: profileDetails = {}, isFetching } =
    useGetProfileDetailsQuery(userId);
  const [updateProfileDetails, { isFetching: isUpdating }] =
    useUpdateProfileDetailsMutation();

  const {
    data: { folderLocation, photo } = {},
    isFetching: isProfilePicFetching,
  } = useGetProfilePhotoQuery(userId);
  const [updateProfilePhoto, { isFetching: isProfilePicUpdating }] =
    useUpdateProfilePhotoMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profileDetails?.firstName || "",
      lastName: profileDetails?.lastName || "",
      email: profileDetails?.email || "",
      description: profileDetails?.description || "",
    },
    mode: "onChange",
    enableReinitialize: true,
  });

  const onSubmit = async (updatedData) => {
    await handleMutation({
      mutationFn: updateProfileDetails,
      payload: { id: userId, updatedData },
      onSuccess: (data) => {
        setIsEditing(false);
        toaster.success(data.message);
        reset();
      },
    });
  };
  const handelUpdateProfilePic = async (imgData) => {
    const formData = new FormData();
    formData.append("photo", imgData);

    await handleMutation({
      mutationFn: updateProfilePhoto,
      payload: { id: userId, imgData: formData },
      onSuccess: (data) => {
        toaster.success(data.message);
      },
    });
  };

  return (
    <>
      <PageHeader pageTitle="Profile" hideExportBtn showBackBtn />
      {isFetching || isProfilePicFetching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <Box component="img" src={Loader} sx={{ width: 150 }} />
        </Box>
      ) : (
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
                avatar={`${VITE_APP_ASSETS_PATH}${folderLocation}/${photo}`}
                alt={`${profileDetails.firstName} ${profileDetails.lastName}`}
                loading={isProfilePicUpdating}
                onSave={(imgData) => {
                  handelUpdateProfilePic(imgData);
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {`${profileDetails.firstName || "N/A"} ${
                  profileDetails.lastName || "N/A"
                }`}
              </Typography>
              <Button
                size="micro"
                type="button"
                onClick={() => setUpdatePasswordModal({ open: true })}
              >
                Update Password
              </Button>
              <Box>
                <Typography
                  variant="body2"
                  gutterBottom={3}
                  color="textDisabled"
                >
                  Description
                </Typography>
                <Typography variant="body1">
                  {profileDetails?.description || "N/A"}
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
                    <Button type="submit" disabled={isSubmitting || isUpdating}>
                      {isSubmitting || isUpdating
                        ? "Saving..."
                        : "Save Profile"}
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
      )}
      <UpdatePasswordModal
        updatePasswordModal={updatePasswordModal}
        setUpdatePasswordModal={setUpdatePasswordModal}
      />
    </>
  );
}

export default Profile;
