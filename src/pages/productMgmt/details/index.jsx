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

import { PageHeader } from "../../../sharedComponents";
import { useGetDataById } from "../../../lib/hooks";
import { demoProductList } from "../../../data/productsMgmt";
import ProductImageGallery from "../components/ProductImageGallery";
import { DriveFileRenameOutline } from "@mui/icons-material";

function DishDetails() {
  const { id } = useParams();
  const dish = useGetDataById({
    data: demoProductList,
    targetField: "id",
    id: id,
  });

  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  const visualizeFormatDishDetails = {
    "Dish Code": dish.sku,
    Category: dish.mainCategory,
    Subcategory: dish.subCategory,
    Price: `₹${dish.price}`,
    Discount: `₹${dish.discountPrice}`,
    Stock: dish.stock,
    Status: (
      <Chip
        label={dish.status}
        color={statusColor[dish.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    Rating: dish.rating,
    Created: dish.createdAt,
    Updated: dish.updatedAt,
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
            >{`#${dish.id}`}</Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      >
        <Button
          variant="contained"
          component={NavLink}
          to="/dish-management/add-dish"
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
              <ProductImageGallery images={dish.images} />
            </Box>

            <Box sx={{ flex: 1, order: { xs: 1, lg: 2 } }}>
              <Typography variant="h5" fontWeight="bold">
                {dish.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {dish.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                Variants:{" "}
                {dish.variants
                  .map((v) => `${v.size} (Stock: ${v.stock})`)
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
