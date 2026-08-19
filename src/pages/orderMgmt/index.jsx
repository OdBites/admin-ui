import React, { useReducer, useState } from "react";
import { Card } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import FilterModal from "../orderMgmt/components/FilterModal";
import { tableColumns, dropDownOptions } from "../../constant";
import {
  useGetOrdersQuery,
  useLazyExportOrdersQuery,
} from "../../store/rtkServices/ordersMgmt";
import { downloadBlob, toaster } from "../../utility";
import { StatusChip } from "OdBitesMfUI/sharedComp";

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

  let rows = [];
  rows = ordersData?.map((item, index) => {
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

  return (
    <>
      <PageHeader
        pageTitle="Order Management"
        onExportClick={handleExport}
        isExporting={isExporting}
      />
      <Card>
        <TableActionHeader
          searchPlaceholder="Search orders..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={dropDownOptions.orderMgmt.sort}
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
          totalItem={total}
          isLoading={isFetching}
        />
      </Card>
    </>
  );
}

export default OrderManagement;
