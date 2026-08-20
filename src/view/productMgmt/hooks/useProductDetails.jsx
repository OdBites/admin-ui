import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../store/rtkServices/productsMgmt";
import { dropDownOptions } from "../../../constant";
import { StatusChip } from "OdBitesMfUI/sharedComp";

export function useProductDetails() {
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

  return {
    id,
    isLoading,
    productDetailsData,
    folderLocation,
    visualizeFormatDishDetails,
  };
}
