import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { RenderIf } from "SpiseBowlMfUI/helpers";
import { FormInput } from "SpiseBowlMfUI/sharedComp";

import { PageHeader } from "../../../sharedComponents";
import {
  basicInfoSchema,
  pricingSchema,
  mediaSchema,
  fullProductSchema,
} from "../validation";
import { useFormWithReinitialize } from "../../../lib/hooks";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../store/rtkServices/productsMgmt";
import { handleMutation, toaster } from "../../../utility";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddEditProduct() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { pathname = "", state = {} } = location || {};
  const { editableProductData = {} } = state || {};
  const isEditMode = pathname.includes("edit");

  // // local state
  const [activeStep, setActiveStep] = useState(0);

  // // RTK Query
  const [createProduct, { isFetching }] = useCreateProductMutation();
  const [updateProduct, { isFetching: isUpdating }] =
    useUpdateProductMutation();

  const stepsConfig = [
    {
      label: "Basic Info",
      schema: basicInfoSchema,
      fields: Object.keys(basicInfoSchema.shape),
    },
    {
      label: "Pricing & Inventory",
      schema: pricingSchema,
      fields: Object.keys(pricingSchema.shape),
    },
    {
      label: "Media & Categorization",
      schema: mediaSchema,
      fields: Object.keys(mediaSchema.shape),
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(fullProductSchema),
    defaultValues: {
      name: editableProductData?.name || "",
      description: editableProductData?.description || "",
      status: editableProductData?.status || "active",
      price: editableProductData?.price?.toString() || "",
      stock: editableProductData?.stock?.toString() || "",
      sku: editableProductData?.sku || "",
      category: editableProductData?.category || "",
      subCategory: editableProductData?.subCategory || "",
      images: editableProductData?.images || "",
    },
    mode: "onChange",
    enableReinitialize: true,
  });

  const onNext = async () => {
    const currentFields = stepsConfig[activeStep].fields;
    const valid = await trigger(currentFields);
    if (valid) {
      setActiveStep(activeStep + 1);
    }
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (productData) => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("status", productData.status);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("sku", productData.sku);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    productData.images.forEach((file) => {
      formData.append("images", file);
    });

    // API logic here
    if (isEditMode) {
      await handleMutation({
        mutationFn: updateProduct,
        payload: { id, formData },
        onSuccess: (data) => {
          toaster.success(data.message);
          reset();
          setActiveStep(0);
          navigate(-1);
        },
      });
    } else {
      await handleMutation({
        mutationFn: createProduct,
        payload: formData,
        onSuccess: (data) => {
          toaster.success(data.message);
          reset();
          setActiveStep(0);
        },
      });
    }
  };
  return (
    <>
      <PageHeader
        pageTitle={
          isEditMode ? (
            <>
              Edit Dish -
              <Typography variant="span" color="text.disabled" ml={2}>
                {`#${id}`}
              </Typography>
            </>
          ) : (
            "Add New Dish"
          )
        }
        hideExportBtn
        showBackBtn
      />
      <Stack spacing={3}>
        <Card>
          <Stepper activeStep={activeStep}>
            {stepsConfig.map(({ label }) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>

        <Card component="form" onSubmit={handleSubmit(onSubmit)}>
          <RenderIf render={activeStep === 0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput name="name" label="Dish Name" control={control} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="status"
                  label="Status"
                  inputType="select"
                  control={control}
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inActive" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormInput
                  name="description"
                  label="Dish Description"
                  inputType="textarea"
                  control={control}
                />
              </Grid>
            </Grid>
          </RenderIf>

          <RenderIf render={activeStep === 1}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput name="price" label="Price (₹)" control={control} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput name="stock" label="Stock" control={control} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="sku"
                  label="SKU / Dish Code"
                  control={control}
                />
              </Grid>
            </Grid>
          </RenderIf>

          <RenderIf render={activeStep === 2}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <FormInput
                  name="images"
                  control={control}
                  label="Upload Dish Images"
                  inputType="file"
                  multiple={true}
                  accept="image/*"
                  rowHeight={4}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="category"
                  label="Category"
                  control={control}
                  inputType="select"
                  options={[
                    { label: "Biryani", value: "biryani" },
                    { label: "Starters", value: "starters" },
                    { label: "Desserts", value: "desserts" },
                    { label: "Beverages", value: "beverages" },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="subCategory"
                  label="Sub Category"
                  control={control}
                  inputType="select"
                  options={[
                    { label: "Chicken", value: "chicken" },
                    { label: "Paneer", value: "paneer" },
                    { label: "Mutton", value: "mutton" },
                    { label: "Soft Drinks", value: "soft-drinks" },
                    { label: "Sweets", value: "sweets" },
                  ]}
                />
              </Grid>
            </Grid>
          </RenderIf>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            mt={4}
          >
            <Button disabled={activeStep === 0} type="button" onClick={onBack}>
              Back
            </Button>
            {activeStep === stepsConfig.length - 1 ? (
              <Button variant="contained" type="submit">
                {isEditMode
                  ? isSubmitting || isUpdating
                    ? "Updating..."
                    : "Update Dish"
                  : isSubmitting || isFetching
                  ? "Creating..."
                  : "Create Dish"}
              </Button>
            ) : (
              <Button variant="contained" type="button" onClick={onNext}>
                Next
              </Button>
            )}
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

export default AddEditProduct;
