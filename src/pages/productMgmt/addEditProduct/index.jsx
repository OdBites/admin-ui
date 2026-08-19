import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Step,
  StepLabel,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { RenderIf } from "OdBitesMfUI/helpers";
import { FormInput } from "OdBitesMfUI/sharedComp";

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
  useGetProductByIdQuery,
} from "../../../store/rtkServices/productsMgmt";
import { handleMutation, toaster } from "../../../utility";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { dropDownOptions } from "../../../constant";

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
  const { data: fetchedData, isLoading: isFetchingProduct } =
    useGetProductByIdQuery(id, {
      skip: !isEditMode,
    });
  const productDetails = editableProductData?.name
    ? editableProductData
    : fetchedData?.product;

  const [createProduct, { isFetching }] = useCreateProductMutation();
  const [updateProduct, { isFetching: isUpdating }] =
    useUpdateProductMutation();

  const stepsConfig = [
    {
      label: "Basic Info",
      schema: basicInfoSchema,
      fields: ["name", "description", "status"],
    },
    {
      label: "Pricing, Inventory & Categorization",
      schema: pricingSchema,
      fields: [
        "price",
        "discountPrice",
        "stock",
        "sku",
        "category",
        "subCategory",
      ],
    },
    {
      label: "Media",
      schema: mediaSchema,
      fields: ["images"],
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    getValues,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(fullProductSchema),
    defaultValues: {
      name: productDetails?.name || "",
      description: productDetails?.description || "",
      status: productDetails?.status || "active",
      price: productDetails?.price?.toString() || "",
      discountPrice: productDetails?.discountPrice?.toString() || "",
      stock: productDetails?.stock?.toString() || "",
      sku: productDetails?.sku || "",
      category: productDetails?.category || "",
      subCategory: productDetails?.subCategory || "",
      images: productDetails?.images || [],
    },
    mode: "onTouched",
    enableReinitialize: true,
  });

  const selectedCategory = watch("category");
  const subCategoryOptions = selectedCategory
    ? dropDownOptions.productMgmt.subCategory[selectedCategory] || []
    : [];

  useEffect(() => {
    const currentSubCategory = getValues("subCategory");
    const validOptions = selectedCategory
      ? dropDownOptions.productMgmt.subCategory[selectedCategory] || []
      : [];
    const isValid = validOptions.some(
      (opt) => opt.value === currentSubCategory
    );
    if (!isValid && currentSubCategory !== "") {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue, getValues]);

  const onNext = async () => {
    const currentStep = stepsConfig[activeStep];
    const formValues = getValues();
    const result = currentStep.schema.safeParse(formValues);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setError(issue.path[0], {
          type: "manual",
          message: issue.message,
        });
      });
    } else {
      currentStep.fields.forEach((field) => clearErrors(field));
      setActiveStep(activeStep + 1);
    }
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const handleStepClick = async (targetStep) => {
    if (targetStep === activeStep) return;

    if (targetStep < activeStep) {
      setActiveStep(targetStep);
      return;
    }

    let stepToValidate = activeStep;
    const formValues = getValues();

    while (stepToValidate < targetStep) {
      const currentStep = stepsConfig[stepToValidate];
      const result = currentStep.schema.safeParse(formValues);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          setError(issue.path[0], {
            type: "manual",
            message: issue.message,
          });
        });
        setActiveStep(stepToValidate);
        return;
      } else {
        currentStep.fields.forEach((field) => clearErrors(field));
      }
      stepToValidate++;
    }

    setActiveStep(targetStep);
  };

  const onSubmit = async (productData) => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("status", productData.status);
    formData.append("price", productData.price);
    if (
      productData.discountPrice !== undefined &&
      productData.discountPrice !== null &&
      productData.discountPrice !== ""
    ) {
      formData.append("discountPrice", productData.discountPrice);
    } else {
      formData.append("discountPrice", "0");
    }
    formData.append("stock", productData.stock);
    formData.append("sku", productData.sku);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    productData.images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      } else if (typeof file === "string") {
        formData.append("existingImages", file);
      }
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
          navigate(`/dish-management/${id}`);
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
          const newProductId =
            data?.data?.product?.id || data?.data?.product?._id;
          if (newProductId) {
            navigate(`/dish-management/${newProductId}`);
          } else {
            navigate("/dish-management");
          }
        },
      });
    }
  };
  if (isEditMode && isFetchingProduct) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography>Loading dish details...</Typography>
      </Box>
    );
  }

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
            {stepsConfig.map(({ label }, index) => (
              <Step key={label}>
                <StepButton onClick={() => handleStepClick(index)}>
                  {label}
                </StepButton>
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
                  options={dropDownOptions.productMgmt.status.filter(
                    (opt) => opt.value !== ""
                  )}
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
                <FormInput
                  name="discountPrice"
                  label="Discount Price (₹)"
                  control={control}
                />
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="category"
                  label="Category"
                  control={control}
                  inputType="select"
                  options={dropDownOptions.productMgmt.category.filter(
                    (opt) => opt.value !== ""
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInput
                  name="subCategory"
                  label="Cuisine Type"
                  control={control}
                  inputType="select"
                  options={subCategoryOptions}
                  disabled={!selectedCategory}
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
              <Button key="submit-btn" variant="contained" type="submit">
                {isEditMode
                  ? isSubmitting || isUpdating
                    ? "Updating..."
                    : "Update Dish"
                  : isSubmitting || isFetching
                    ? "Creating..."
                    : "Create Dish"}
              </Button>
            ) : (
              <Button
                key="next-btn"
                variant="contained"
                type="button"
                onClick={onNext}
              >
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
