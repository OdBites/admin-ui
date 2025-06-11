import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { RenderIf } from "nexCartMfUI/helpers";
import { FormInput } from "nexCartMfUI/sharedComp";

import { PageHeader } from "../../../sharedComponents";
import {
  basicInfoSchema,
  pricingSchema,
  mediaSchema,
  fullProductSchema,
} from "../validation";
import { useFormWithReinitialize } from "../../../lib/hooks";

function AddProduct() {
  const [activeStep, setActiveStep] = useState(0);

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
      name: "",
      description: "",
      status: "active",
      price: "",
      stock: "",
      sku: "",
      category: "",
      subCategory: "",
      images: "",
    },
    mode: "onChange",
  });

  const onNext = async () => {
    const currentFields = stepsConfig[activeStep].fields;
    const valid = await trigger(currentFields);
    if (valid) {
      setActiveStep(activeStep + 1);
    }
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log("Product Created:", data);
    // API logic here
  };

  return (
    <>
      <PageHeader pageTitle="Add New Product" hideExportBtn showBackBtn />
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
                    { label: "Inactive", value: "inactive" },
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
            <Button disabled={activeStep === 0} onClick={onBack}>
              Back
            </Button>
            {activeStep === stepsConfig.length - 1 ? (
              <Button variant="contained" type="submit">
                Create Dish
              </Button>
            ) : (
              <Button variant="contained" onClick={onNext}>
                Next
              </Button>
            )}
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

export default AddProduct;
