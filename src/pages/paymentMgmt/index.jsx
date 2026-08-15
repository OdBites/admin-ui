import React, { useReducer, useState } from "react";
import { Card, Chip } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../paymentMgmt/components/FilterModal";
import { tableColumns, dropDownOptions } from "../../constant";
import {
  useGetPaymentsQuery,
  useLazyExportPaymentsQuery,
} from "../../store/rtkServices/paymentsMgmt";
import { downloadBlob, toaster } from "../../utility";

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

  // // rtk query
  const { data, isFetching } = useGetPaymentsQuery({
    search,
    sort,
    page: page + 1,
    limit: rowsPerPage,
    ...filters,
  });
  const { data: paymentsData = [], total } = data || {};
  const [triggerExport, { isFetching: isExporting }] =
    useLazyExportPaymentsQuery();

  const statusColor = {
    success: "success",
    failed: "error",
    pending: "warning",
  };

  // insert data
  let rows = [];
  rows = paymentsData?.map((item, index) => {
    const actions = <TableAction view={`/payment-management/${item._id}`} />;
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

  const handleExport = async () => {
    try {
      const blob = await triggerExport({ search, sort, ...filters }).unwrap();
      downloadBlob(blob, "payments");
      toaster.success("Data exported successfully!");
    } catch (err) {
      // Errors are handled globally
    }
  };

  return (
    <>
      <PageHeader
        pageTitle="Payment Management"
        onExportClick={handleExport}
        isExporting={isExporting}
      />
      <Card>
        <TableActionHeader
          searchPlaceholder="Search payment..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={dropDownOptions.paymentMgmt.sort}
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
          totalItem={total}
          isLoading={isFetching}
        />
      </Card>
    </>
  );
}

export default PaymentManagement;
