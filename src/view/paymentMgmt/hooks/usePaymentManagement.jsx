import React, { useReducer, useState } from "react";
import {
  useGetPaymentsQuery,
  useLazyExportPaymentsQuery,
} from "../../../store/rtkServices/paymentsMgmt";
import { downloadBlob, toaster } from "../../../utility";
import { TableAction } from "../../../sharedComponents";
import { StatusChip } from "OdBitesMfUI/sharedComp";

export function usePaymentManagement() {
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

  // insert data
  const rows = paymentsData?.map((item, index) => {
    const actions = <TableAction view={`/payment-management/${item._id}`} />;
    const sr_no = index + 1 + page * rowsPerPage;
    const status = <StatusChip status={item.status} />;
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

  return {
    page,
    rowsPerPage,
    setSearch,
    setSort,
    filters,
    setFilters,
    isFetching,
    total,
    rows,
    isExporting,
    handleChangePage,
    handleChangeRowsPerPage,
    handleExport,
  };
}
