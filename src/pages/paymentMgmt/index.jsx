import React, { useReducer, useState } from "react";
import { Card, Chip } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../paymentMgmt/components/FilterModal";
import { demoPaymentsList } from "../../data/paymentMgmt";
import { tableColumns, droDownOptions } from "../../constant";

function PaymentManagement() {
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
    Success: "success",
    Failed: "error",
    Pending: "warning",
  };

  // insert data
  let rows = [];
  rows = demoPaymentsList?.map((item, index) => {
    const actions = <TableAction view={`/payment-management/${item.id}`} />;
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
      <PageHeader pageTitle="Payment Management" />
      <Card>
        <TableActionHeader
          searchPlaceholder="Search payment..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={droDownOptions.paymentMgmt.sort}
        >
          <FilterModal filters={filters} setFilters={setFilters} />
        </TableActionHeader>
        <DataTable
          columns={tableColumns.paymentMgmt}
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

export default PaymentManagement;
