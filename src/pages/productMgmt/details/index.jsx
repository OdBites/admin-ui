import React from "react";
import { NavLink, useParams } from "react-router-dom";
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

import { PageHeader } from "../../../sharedComponents";
import ProductImageGallery from "../components/ProductImageGallery";
import { useGetProductByIdQuery } from "../../../store/rtkServices/productsMgmt";
import { VITE_APP_ASSETS_PATH } from "../../../config/env";

function DishDetails() {
  const { id } = useParams();

  // // rtk query
  const { data, isLoading } = useGetProductByIdQuery(id);
  const { product: productDetailsData = {}, folderLocation = "" } = data || {};

  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  const visualizeFormatDishDetails = {
    "Dish Code": productDetailsData?.sku,
    Category: productDetailsData?.category,
    Subcategory: productDetailsData?.subCategory,
    Price: `₹${productDetailsData?.price}`,
    Discount: `₹${productDetailsData?.discountPrice}`,
    Stock: productDetailsData?.stock,
    Status: (
      <Chip
        label={productDetailsData?.status}
        color={statusColor[productDetailsData?.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    Rating: productDetailsData?.rating,
    Created: productDetailsData?.createdAt,
    Updated: productDetailsData?.updatedAt,
  };

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Dish Details -
            <Typography
              variant="span"
              color="text.disabled"
              ml={2}
            >{`#${productDetailsData?._id}`}</Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      >
        <Button
          variant="contained"
          component={NavLink}
          to={`/dish-management/edit-dish/${id}`}
          state={{ editableProductData: productDetailsData }}
          endIcon={<DriveFileRenameOutline />}
        >
          Edit Dish
        </Button>
      </PageHeader>
      <Stack spacing={3}>
        {/* Dish Image & Basic Info */}
        <Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 4,
            }}
          >
            <Box
              sx={{ width: { xs: "100%", lg: 400 }, order: { xs: 2, lg: 1 } }}
            >
              <ProductImageGallery
                images={productDetailsData?.images}
                dirPath={`${VITE_APP_ASSETS_PATH}${folderLocation}/`}
              />
            </Box>

            <Box sx={{ flex: 1, order: { xs: 1, lg: 2 } }}>
              <Typography variant="h5" fontWeight="bold">
                {productDetailsData?.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {productDetailsData?.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                Variants:{" "}
                {productDetailsData?.variants
                  ?.map((v) => `${v.size} (Stock: ${v.stock})`)
                  .join(", ")}
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Dish Metadata */}
        <Card>
          <Typography variant="h6" gutterBottom>
            Dish Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {Object.entries(visualizeFormatDishDetails).map(
              ([label, value]) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                  <Typography
                    variant="body2"
                    gutterBottom={3}
                    color="text.secondary"
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

export default DishDetails;
