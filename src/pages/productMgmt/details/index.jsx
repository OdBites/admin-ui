import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
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
import { StatusChip } from "OdBitesMfUI/sharedComp";
import { dropDownOptions } from "../../../constant";

function DishDetails() {
  const { id } = useParams();

  // // rtk query
  const { data, isLoading } = useGetProductByIdQuery(id);
  const { product: productDetailsData = {}, folderLocation = "" } = data || {};

  const getCategoryLabel = (catValue) => {
    const found = dropDownOptions.productMgmt.category.find(
      (opt) => opt.value === catValue
    );
    return found ? found.label : catValue;
  };

  const getSubCategoryLabel = (catValue, subCatValue) => {
    if (catValue && dropDownOptions.productMgmt.subCategory[catValue]) {
      const found = dropDownOptions.productMgmt.subCategory[catValue].find(
        (opt) => opt.value === subCatValue
      );
      if (found) return found.label;
    }
    for (const cat of Object.keys(dropDownOptions.productMgmt.subCategory)) {
      const found = dropDownOptions.productMgmt.subCategory[cat].find(
        (opt) => opt.value === subCatValue
      );
      if (found) return found.label;
    }
    return subCatValue;
  };

  const visualizeFormatDishDetails = {
    "Dish Code": productDetailsData?.sku,
    Category: getCategoryLabel(productDetailsData?.category),
    "Cuisine Type": getSubCategoryLabel(
      productDetailsData?.category,
      productDetailsData?.subCategory
    ),
    Price: `₹${productDetailsData?.price}`,
    Discount: `₹${productDetailsData?.discountPrice}`,
    Stock: productDetailsData?.stock,
    Status: (
      <StatusChip status={productDetailsData?.status} variant="outlined" />
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
