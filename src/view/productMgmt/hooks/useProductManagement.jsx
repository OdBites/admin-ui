import React, { useReducer, useState } from "react";
import { useProductMgmtConfirmationAlert } from "./useProductMgmtConfirmationAlert";
import {
  useGetProductsQuery,
  useLazyExportProductsQuery,
} from "../../../store/rtkServices/productsMgmt";
import { downloadBlob, toaster } from "../../../utility";
import { TableAction } from "../../../sharedComponents";
import { StatusChip } from "OdBitesMfUI/sharedComp";
import { dropDownOptions } from "../../../constant";

export function useProductManagement() {
  // local hooks
  const {
    confirmAlert,
    setConfirmAlert,
    getDialogContent,
    handleAction,
    handleConfirm,
  } = useProductMgmtConfirmationAlert();

  // local State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [filters, setFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      status: "",
      category: "",
      subCategory: "",
      dateInterval: "",
      fromDate: "",
      toDate: "",
    }
  );

  // // rtk query
  const { data, isLoading } = useGetProductsQuery({
    search,
    sort,
    page: page + 1,
    limit: rowsPerPage,
    ...filters,
  });
  const { data: productsData = [], total } = data || {};
  const [triggerExport, { isFetching: isExporting }] =
    useLazyExportProductsQuery();

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

  // insert data
  const rows = productsData?.products?.map((item, index) => {
    const actions = (
      <TableAction
        view={`/dish-management/${item._id}`}
        block={
          item.status === "active" ? () => handleAction("inActive", item) : null
        }
        unBlock={
          item.status === "inActive" ? () => handleAction("active", item) : null
        }
        remove={() => handleAction("delete", item)}
        isBlocked={item.status === "inActive"}
      />
    );
    const sr_no = index + 1 + page * rowsPerPage;
    const status = <StatusChip status={item.status} />;
    const category = getCategoryLabel(item.category);
    const subCategory = getSubCategoryLabel(item.category, item.subCategory);
    return { ...item, actions, sr_no, status, category, subCategory };
  });

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const handleExport = async () => {
    try {
      const blob = await triggerExport({ search, sort, ...filters }).unwrap();
      downloadBlob(blob, "dishes");
      toaster.success("Data exported successfully!");
    } catch (err) {
      // Errors are handled globally
    }
  };

  const dialogContent = getDialogContent(
    confirmAlert.action,
    confirmAlert.selectedProduct
  );

  return {
    page,
    rowsPerPage,
    setSearch,
    setSort,
    filters,
    setFilters,
    isLoading,
    total,
    rows,
    isExporting,
    confirmAlert,
    setConfirmAlert,
    handleConfirm,
    dialogContent,
    handleChangePage,
    handleChangeRowsPerPage,
    handleExport,
  };
}
