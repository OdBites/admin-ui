import React from "react";
import { Button, Card } from "@mui/material";

// // static import
import {
  DataTable,
  PageHeader,
  TableActionHeader,
} from "../../../sharedComponents";
import { tableColumns, dropDownOptions } from "../../../constant";
import { CustomAlertDialog } from "../../../sharedComponents/dialog";
import FilterModal from "../components/FilterModal";
import AddEditUserModal from "../components/AddEditUserModal";
import { useUserManagement } from "../hooks";

function UserManagement() {
  const {
    page,
    rowsPerPage,
    setSearch,
    setSort,
    filters,
    setFilters,
    addEditUserModal,
    setAddEditUserModal,
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
  } = useUserManagement();

  return (
    <>
      <PageHeader
        pageTitle="User Management"
        onExportClick={handleExport}
        isExporting={isExporting}
      >
        <Button
          variant="contained"
          onClick={() =>
            setAddEditUserModal({
              open: true,
              selectedUser: null,
              action: "ADD",
            })
          }
        >
          Add User
        </Button>
      </PageHeader>
      <Card>
        <TableActionHeader
          searchPlaceholder="Search users..."
          setSearch={setSearch}
          sortLabel="Sort By"
          setSort={setSort}
          sortList={dropDownOptions.userMgmt.sort}
        >
          <FilterModal filters={filters} setFilters={setFilters} />
        </TableActionHeader>
        <DataTable
          isLoading={isLoading}
          columns={tableColumns.userMgmt}
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

      <AddEditUserModal
        addEditUserModal={addEditUserModal}
        setAddEditUserModal={setAddEditUserModal}
      />
    </>
  );
}

export default UserManagement;
