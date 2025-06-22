import React from "react";
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
import { DriveFileRenameOutline } from "@mui/icons-material";
import { useParams } from "react-router-dom";

import { AvatarUpload } from "SpiseBowlMfUI/sharedComp";

import { PageHeader } from "../../../sharedComponents";
import { useGetDataById } from "../../../lib/hooks";
import { demoUserList } from "../../../data/userMgmt";

function UserMgmtDetails() {
  const { id } = useParams();
  const userDetails = useGetDataById({
    data: demoUserList,
    targetField: "id",
    id: id,
  });

  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  const visualizeFormatUserDetails = {
    "First Name": userDetails.firstName,
    "Last Name": userDetails.lastName,
    Status: (
      <Chip
        label={userDetails.status}
        color={statusColor[userDetails.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    "Created At": userDetails.createdAt,
    "Updated At": userDetails.updatedAt,
    "Created By": userDetails.createdBy,
    "Email Address": userDetails.email,
    "Phone Number": userDetails.phone,
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
            >{`# ${userDetails.id}`}</Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      />
      <Stack spacing={3}>
        <Card>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 4 }}>
            <AvatarUpload
              avatar="/static/images/avatar/1.jpg"
              viewOnly={userDetails?.createdBy !== "admin"}
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
              onSave={(imgUrl) => {
                console.log("Saved avatar:", imgUrl);
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {`${userDetails.firstName} ${userDetails.lastName}`}
                <Typography
                  component="span"
                  color="textDisabled"
                  ml={1}
                >{`#${id}`}</Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Order: {userDetails.orders || 0}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Spent: {userDetails.totalSpent || 0}
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
      </Stack>
    </>
  );
}

export default UserMgmtDetails;
