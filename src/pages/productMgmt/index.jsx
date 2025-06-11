import React, { useReducer, useState } from "react";
import { Box, Button, Card, Chip, Typography } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../productMgmt/components/FilterModal";
import { demoProductList } from "../../data/productsMgmt";
import { useProductMgmtConfirmationAlert } from "./hooks";
import { CustomAlertDialog } from "../../sharedComponents/dialog";
import { droDownOptions, tableColumns } from "../../constant";
import { NavLink } from "react-router-dom";

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

  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  // insert data
  let rows = [];
  rows = demoProductList?.map((item, index) => {
    const actions = (
      <TableAction
        view={`/dish-management/${item.id}`}
        block={
          item.status === "Active" ? () => handleAction("block", item) : null
        }
        unBlock={
          item.status === "Blocked" ? () => handleAction("unblock", item) : null
        }
        remove={() => handleAction("delete", item)}
        // edit={
        //   item.createdBy === "admin"
        //     ? () =>
        //         setAddEditUserModal({
        //           open: true,
        //           selectedUser: item,
        //           action: "EDIT",
        //         })
        //     : null
        // }
        isBlocked={item.status === "Blocked"}
      />
    );
    const sr_no = index + 1 + page * rowsPerPage;
    const status = (
      <Chip
        label={item.status}
        color={statusColor[item.status] || "default"}
        variant="contained"
        size="small"
      />
    );
    return { ...item, actions, sr_no, status };
  });

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const dialogContent = getDialogContent(
    confirmAlert.action,
    confirmAlert.selectedProduct
  );

  return (
    <>
      <PageHeader pageTitle="Dish Management">
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
          sortList={droDownOptions.productMgmt.sort}
        >
          <FilterModal filters={filters} setFilters={setFilters} />
        </TableActionHeader>
        <DataTable
          columns={tableColumns.productMgmt}
          rows={rows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItem={rows.length}
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
