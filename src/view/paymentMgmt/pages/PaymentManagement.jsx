import React from "react";
import { Card } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableActionHeader,
} from "../../../sharedComponents";
import FilterModal from "../components/FilterModal";
import { tableColumns, dropDownOptions } from "../../../constant";
import { usePaymentManagement } from "../hooks";

function PaymentManagement() {
  const {
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
  } = usePaymentManagement();

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
