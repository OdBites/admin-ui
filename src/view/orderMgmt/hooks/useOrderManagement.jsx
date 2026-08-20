import React, { useReducer, useState } from "react";
import {
  useGetOrdersQuery,
  useLazyExportOrdersQuery,
} from "../../../store/rtkServices/ordersMgmt";
import { downloadBlob, toaster } from "../../../utility";
import { TableAction } from "../../../sharedComponents";
import { StatusChip } from "OdBitesMfUI/sharedComp";

export function useOrderManagement() {
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

  const { data, isFetching } = useGetOrdersQuery({
    search,
    sort,
    page: page + 1,
    limit: rowsPerPage,
    ...filters,
  });

  const { data: ordersData = [], total = 0 } = data || {};
  const [triggerExport, { isFetching: isExporting }] =
    useLazyExportOrdersQuery();

  const rows = ordersData?.map((item, index) => {
    const actions = <TableAction view={`/order-management/${item.orderId}`} />;
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
      downloadBlob(blob, "orders");
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
