import React, { useReducer, useState } from "react";
import { Box, Button, Card, Typography } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../productMgmt/components/FilterModal";
import { useProductMgmtConfirmationAlert } from "./hooks";
import { CustomAlertDialog } from "../../sharedComponents/dialog";
import { dropDownOptions, tableColumns } from "../../constant";
import { NavLink } from "react-router-dom";
import {
  useGetProductsQuery,
  useLazyExportProductsQuery,
} from "../../store/rtkServices/productsMgmt";
import { downloadBlob, toaster } from "../../utility";
import { StatusChip } from "OdBitesMfUI/sharedComp";

function ProductManagement() {
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
  let rows = [];
  rows = productsData?.products?.map((item, index) => {
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

  return (
    <>
      <PageHeader
        pageTitle="Dish Management"
        onExportClick={handleExport}
        isExporting={isExporting}
      >
        <Button variant="contained" component={NavLink} to="add-dish">
          List New Dish
        </Button>
      </PageHeader>

      <Card>
        <TableActionHeader
          searchPlaceholder="Search dish..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={dropDownOptions.productMgmt.sort}
        >
          <FilterModal filters={filters} setFilters={setFilters} />
        </TableActionHeader>
        <DataTable
          isLoading={isLoading}
          columns={tableColumns.productMgmt}
          rows={rows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItem={total}
        />
      </Card>

      <CustomAlertDialog
        open={confirmAlert.open}
        onClose={() =>
          setConfirmAlert({ open: false, action: null, selectedUser: null })
        }
        handleConfirm={handleConfirm}
        title={dialogContent.title}
        description={dialogContent.description}
        confirmLabel={dialogContent.confirmLabel}
      />
    </>
  );
}

export default ProductManagement;
