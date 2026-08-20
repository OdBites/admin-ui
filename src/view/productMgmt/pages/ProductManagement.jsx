import React from "react";
import { Button, Card } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableActionHeader,
} from "../../../sharedComponents";
import FilterModal from "../components/FilterModal";
import { CustomAlertDialog } from "../../../sharedComponents/dialog";
import { dropDownOptions, tableColumns } from "../../../constant";
import { NavLink } from "react-router-dom";
import { useProductManagement } from "../hooks";

function ProductManagement() {
  const {
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
  } = useProductManagement();

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
