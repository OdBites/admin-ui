import React from "react";
import { Card } from "@mui/material";

import {
  DataTable,
  PageHeader,
  TableActionHeader,
} from "../../../sharedComponents";
import FilterModal from "../components/FilterModal";
import { tableColumns, dropDownOptions } from "../../../constant";
import { useOrderManagement } from "../hooks";

function OrderManagement() {
  /*
    Hook Configuration & Destructuring
   */
  const {
    /*
      Local State Accessors & Mutators
     */
    page,
    rowsPerPage,
    setSearch,
    setSort,
    filters,
    setFilters,

    /*
      RTK Query API State Indicators
     */
    isFetching,
    isExporting,

    /*
      Computed API Data & Memos
     */
    total,
    rows,

    /*
      Event Handler Callbacks
     */
    handleChangePage,
    handleChangeRowsPerPage,
    handleExport,
  } = useOrderManagement();

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
