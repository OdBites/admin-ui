import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  basicInfoSchema,
  pricingSchema,
  mediaSchema,
  fullProductSchema,
} from "../validation";
import { useFormWithReinitialize } from "../../../hooks";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../../../store/rtkServices/productsMgmt";
import { handleMutation, toaster } from "../../../utility";
import { dropDownOptions } from "../../../constant";

export function useAddEditProduct() {
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

  return {
    id,
    isEditMode,
    activeStep,
    setActiveStep,
    isFetchingProduct,
    stepsConfig,
    control,
    handleSubmit: handleSubmit(onSubmit),
    selectedCategory,
    subCategoryOptions,
    onNext,
    onBack,
    handleStepClick,
    isSaving: isSubmitting || isFetching || isUpdating,
  };
}
