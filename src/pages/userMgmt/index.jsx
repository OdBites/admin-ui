import React, { useReducer, useState } from "react";
import { Button, Card, Chip } from "@mui/material";

// // static import
import {
  DataTable,
  PageHeader,
  TableAction,
  TableActionHeader,
} from "../../sharedComponents";
import { tableColumns, dropDownOptions } from "../../constant";
import { CustomAlertDialog } from "../../sharedComponents/dialog";
import FilterModal from "./components/FilterModal";
import { useUserMgmtConfirmationAlert } from "./hooks";
import AddEditUserModal from "./components/AddEditUserModal";
import {
  useGetUsersQuery,
  useLazyExportUsersQuery,
} from "../../store/rtkServices/userMgmt";
import { downloadBlob, toaster } from "../../utility";

function UserManagement() {
  // local hooks
  const {
    confirmAlert,
    setConfirmAlert,
    getDialogContent,
    handleAction,
    handleConfirm,
  } = useUserMgmtConfirmationAlert();

  // local State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [addEditUserModal, setAddEditUserModal] = useState({
    open: false,
    selectedUser: null,
    action: "",
  });

  const [filters, setFilters] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {
      status: "",
      orders: "",
      dateInterval: "",
      fromDate: "",
      toDate: "",
      createdBy: "",
    }
  );

  // // rtk query
  const { data, isLoading } = useGetUsersQuery({
    search,
    sort,
    page: page + 1,
    limit: rowsPerPage,
    ...filters,
  });
  const { data: usersData = [], total } = data || {};
  const [triggerExport, { isFetching: isExporting }] =
    useLazyExportUsersQuery();
  console.log("usersData", search, sort, filters);
  const statusColor = {
    Active: "success",
    Blocked: "error",
    Pending: "warning",
  };

  // insert data
  let rows = [];
  rows = usersData?.map((item, index) => {
    const actions = (
      <TableAction
        view={`/user-management/${item.id}`}
        block={
          item.status === "Active" ? () => handleAction("block", item) : null
        }
        unBlock={
          item.status === "Blocked" ? () => handleAction("unblock", item) : null
        }
        remove={() => handleAction("delete", item)}
        edit={
          item.createdBy === "admin"
            ? () =>
                setAddEditUserModal({
                  open: true,
                  selectedUser: item,
                  action: "EDIT",
                })
            : null
        }
        isBlocked={item.status === "Blocked"}
      />
    );
    const sr_no = index + 1 + page * rowsPerPage;
    const name = `${item.firstName} ${item.lastName}`;
    const status = (
      <Chip
        label={item.status}
        color={statusColor[item.status] || "default"}
        variant="contained"
        size="small"
      />
    );
    return { ...item, actions, sr_no, name, status };
  });

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const handleExport = async () => {
    try {
      const blob = await triggerExport({ search, sort, ...filters }).unwrap();
      downloadBlob(blob, "users");
      toaster.success("Data exported successfully!");
    } catch (err) {
      // Errors are handled globally
    }
  };

  const dialogContent = getDialogContent(
    confirmAlert.action,
    confirmAlert.selectedUser
  );

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
