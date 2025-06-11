import React, { useReducer, useState } from "react";
import { Card, Chip } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../orderMgmt/components/FilterModal";
import { demoOrdersList } from "../../data/ordersMgmt";
import { tableColumns, droDownOptions } from "../../constant";

function OrderManagement() {
  // local State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [filters, setFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      status: "",
      paymentMethod: "",
      dateInterval: "",
      fromDate: "",
      toDate: "",
    }
  );

  const statusColor = {
    Ordered: "info",
    Accepted: "primary",
    Preparing: "warning",
    Shipped: "warning",
    OutForDelivery: "secondary",
    Delivered: "success",
    Returned: "error",
    Cancelled: "error",
    Pending: "warning",
  };

  // insert data
  let rows = [];
  rows = demoOrdersList?.map((item, index) => {
    const actions = <TableAction view={`/order-management/${item.orderId}`} />;
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

  return (
    <>
      <PageHeader pageTitle="Order Management" />
      <Card>
        <TableActionHeader
          searchPlaceholder="Search orders..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={droDownOptions.orderMgmt.sort}
        >
          <FilterModal filters={filters} setFilters={setFilters} />
        </TableActionHeader>
        <DataTable
          columns={tableColumns.orderMgmt}
          rows={rows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItem={rows.length}
        />
      </Card>
    </>
  );
}

export default OrderManagement;
