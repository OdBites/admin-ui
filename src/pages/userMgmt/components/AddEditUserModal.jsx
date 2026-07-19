import React, { memo } from "react";
import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";

// // MfUI components
import { FormInput } from "OdBitesMfUI/sharedComp";

// // Custom components or static import
import { CustomDialog } from "../../../sharedComponents/dialog";
import { useFormWithReinitialize } from "../../../lib/hooks";
import { userSchemaValidation } from "../validation";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../store/rtkServices/userMgmt";
import { handleMutation, toaster } from "../../../utility";

function AddEditUserModal({ addEditUserModal, setAddEditUserModal }) {
  const { open = false, selectedUser = {}, action } = addEditUserModal;
  const isEditMode = action === "EDIT";
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

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
      password: "",
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    setAddEditUserModal({ open: false, action: "", selectedUser: null });
    reset(); // reset form on close
  };

  const handleFormSubmit = async (data) => {
    const payload = { ...data };
    if (!payload.password) {
      delete payload.password;
    }

    await handleMutation({
      mutationFn: isEditMode ? updateUser : createUser,
      payload: isEditMode ? { id: selectedUser?.id, payload } : payload,
      onSuccess: (response) => {
        toaster.success(
          response?.message ||
            `User ${isEditMode ? "updated" : "created"} successfully`
        );
        handleClose();
      },
    });
  };

  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      handleConfirm={handleSubmit(handleFormSubmit)}
      confirmLabel={isEditMode ? "Update" : "Create"}
      cancelLabel="Cancel"
      title={isEditMode ? "Edit User" : "Add New User"}
      isLoading={isSubmitting || isCreating || isUpdating}
      loadingLabel={isEditMode ? "Updating..." : "Creating..."}
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
          { label: "Blocked", value: "Blocked" },
          { label: "Pending", value: "Pending" },
        ]}
      />
      {!isEditMode && (
        <FormInput
          name="password"
          control={control}
          label="Password"
          inputType="password"
        />
      )}
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
