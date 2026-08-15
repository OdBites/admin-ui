import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DriveFileRenameOutline, LocationOn } from "@mui/icons-material";
import { useParams } from "react-router-dom";

import { AvatarUpload } from "OdBitesMfUI/sharedComp";

import { PageHeader } from "../../../sharedComponents";
import {
  useGetUserByIdQuery,
  useUpdateProfilePictureMutation,
} from "../../../store/rtkServices/userMgmt";
import { handleMutation, toaster } from "../../../utility";
import { VITE_APP_ASSETS_PATH } from "../../../config/env";
import AddEditUserModal from "../components/AddEditUserModal";

function UserMgmtDetails() {
  const { id } = useParams();
  const { data: userDetails = {}, isFetching } = useGetUserByIdQuery(id);
  const [updateProfilePicture, { isLoading: isUpdatingPhoto }] =
    useUpdateProfilePictureMutation();

  const [addEditUserModal, setAddEditUserModal] = useState({
    open: false,
    selectedUser: null,
    action: "",
  });

  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  const visualizeFormatUserDetails = {
    "First Name": userDetails?.firstName,
    "Last Name": userDetails?.lastName,
    Status: (
      <Chip
        label={userDetails?.status || "N/A"}
        color={statusColor[userDetails?.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    "Created At": userDetails?.createdAt,
    "Updated At": userDetails?.updatedAt,
    "Created By": userDetails?.createdBy,
    "Email Address": userDetails?.email,
    "Phone Number": userDetails?.phone,
  };

  const avatarSrc = userDetails?.photo
    ? `${VITE_APP_ASSETS_PATH}${userDetails?.folderLocation}/${userDetails?.photo}`
    : "/static/images/avatar/1.jpg";

  const handleProfilePictureSave = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    await handleMutation({
      mutationFn: updateProfilePicture,
      payload: { id, formData },
      onSuccess: (data) => {
        toaster.success(
          data?.message || "Profile picture updated successfully"
        );
      },
    });
  };

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            User Details -
            <Typography
              variant="span"
              color="text.disabled"
              ml={2}
            >{`# ${userDetails?.id || id}`}</Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      />
      <Stack spacing={3}>
        <Card>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 4 }}>
            <AvatarUpload
              avatar={avatarSrc}
              loading={isUpdatingPhoto}
              viewOnly={
                isFetching ||
                isUpdatingPhoto ||
                userDetails?.createdBy !== "admin"
              }
              alt={`${userDetails?.firstName || ""} ${
                userDetails?.lastName || ""
              }`}
              onSave={handleProfilePictureSave}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {`${userDetails?.firstName || "N/A"} ${
                  userDetails?.lastName || ""
                }`}
                <Typography
                  component="span"
                  color="textDisabled"
                  ml={1}
                >{`#${id}`}</Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Order: {userDetails?.orders || 0}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Spent: {userDetails?.totalSpent || 0}
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              User's Information
            </Typography>
            <Button
              size="micro"
              endIcon={<DriveFileRenameOutline />}
              disabled={userDetails?.createdBy !== "admin"}
              onClick={() =>
                setAddEditUserModal({
                  open: true,
                  selectedUser: userDetails,
                  action: "EDIT",
                })
              }
            >
              Edit
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {Object.entries(visualizeFormatUserDetails).map(
              ([label, value]) => (
                <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography
                    variant="body2"
                    gutterBottom={3}
                    color="textDisabled"
                  >
                    {label}
                  </Typography>
                  <Typography variant="body1">{value || "N/A"}</Typography>
                </Grid>
              )
            )}
          </Grid>
        </Card>

        {/* ── Saved Addresses ────────────────────────────────────────── */}
        <Card>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Saved Addresses
            </Typography>
            <Chip
              label={`${(userDetails?.addresses || []).length} address${(userDetails?.addresses || []).length !== 1 ? "es" : ""}`}
              size="small"
              variant="outlined"
            />
          </Box>
          <Divider sx={{ my: 2 }} />

          {(userDetails?.addresses || []).length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, color: "text.disabled" }}>
              <LocationOn sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
              <Typography variant="body2">No saved addresses</Typography>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {(userDetails?.addresses || []).map((addr) => (
                <Grid key={addr.id || addr._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={(theme) => ({
                      border: `1px solid ${addr.isDefault ? theme.palette.primary.main : theme.palette.divider}`,
                      borderRadius: 2,
                      p: 2,
                      height: "100%",
                      position: "relative",
                      backgroundColor: addr.isDefault
                        ? `${theme.palette.primary.main}08`
                        : "transparent",
                    })}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <LocationOn
                        fontSize="small"
                        color={addr.isDefault ? "primary" : "disabled"}
                      />
                      <Typography variant="subtitle2" fontWeight="bold">
                        {addr.label || "Address"}
                      </Typography>
                      {addr.isDefault && (
                        <Chip
                          label="Default"
                          size="small"
                          color="primary"
                          sx={{ ml: "auto" }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {addr.line1}
                      {addr.line2 ? `, ${addr.line2}` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {addr.city}, {addr.state} – {addr.postalCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {addr.country}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Card>
      </Stack>

      <AddEditUserModal
        addEditUserModal={addEditUserModal}
        setAddEditUserModal={setAddEditUserModal}
      />
    </>
  );
}

export default UserMgmtDetails;
