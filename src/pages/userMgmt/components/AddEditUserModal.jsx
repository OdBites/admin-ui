import React, { memo } from "react";
import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";

// // MfUI components
import { FormInput } from "SpiseBowlMfUI/sharedComp";

// // Custom components or static import
import { CustomDialog } from "../../../sharedComponents/dialog";
import { useFormWithReinitialize } from "../../../lib/hooks";
import { userSchemaValidation } from "../validation";

function AddEditUserModal({ addEditUserModal, setAddEditUserModal }) {
  const { open = false, selectedUser = {}, action } = addEditUserModal;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(userSchemaValidation),
    defaultValues: {
      firstName: selectedUser?.firstName || "",
      lastName: selectedUser?.lastName || "",
      phone: selectedUser?.phone || "",
      email: selectedUser?.email || "",
      status: selectedUser?.status || "Active",
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    setAddEditUserModal({ open: false, action: "", selectedUser: null });
    reset(); // reset form on close
  };

  const handleFormSubmit = async (data) => {
    console.log("Form submitted:", data);
    // Do API call or parent callback here

    handleClose();
  };

  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      handleConfirm={handleSubmit(handleFormSubmit)}
      confirmLabel={action === "EDIT" ? "Update" : "Create"}
      cancelLabel="Cancel"
      title={action === "EDIT" ? "Edit User" : "Add New User"}
    >
      <FormInput
        name="firstName"
        control={control}
        label="First Name"
        inputType="text"
      />
      <FormInput
        name="lastName"
        control={control}
        label="Last Name"
        inputType="text"
      />
      <FormInput
        name="phone"
        control={control}
        label="Phone Number"
        inputType="phone"
      />
      <FormInput
        name="email"
        control={control}
        label="Email"
        inputType="email"
      />
      <FormInput
        name="status"
        control={control}
        label="Status"
        inputType="select"
        options={[
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ]}
      />
    </CustomDialog>
  );
}

// props validation
AddEditUserModal.propTypes = {
  addEditUserModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    selectedUser: PropTypes.object,
  }).isRequired,
  setAddEditUserModal: PropTypes.func.isRequired,
};

export default memo(AddEditUserModal);
