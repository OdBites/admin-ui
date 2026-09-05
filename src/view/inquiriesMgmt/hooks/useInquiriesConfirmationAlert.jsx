import { useState } from "react";
import { useDeleteInquiryMutation } from "../../../store/rtkServices/inquiries";
import { handleMutation, toaster } from "../../../utility";

export function useInquiriesConfirmationAlert(onDeleteSuccess) {
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    inquiryId: null,
  });

  const [deleteInquiryMutation, { isLoading: isDeleting }] =
    useDeleteInquiryMutation();

  const handleOpenDeleteConfirm = (inquiryId) => {
    setDeleteConfirm({
      open: true,
      inquiryId,
    });
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirm({
      open: false,
      inquiryId: null,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.inquiryId) return;
    await handleMutation({
      mutationFn: deleteInquiryMutation,
      payload: deleteConfirm.inquiryId,
      onSuccess: () => {
        toaster.success("Inquiry deleted successfully");
        const deletedId = deleteConfirm.inquiryId;
        handleCloseDeleteConfirm();
        if (onDeleteSuccess) {
          onDeleteSuccess(deletedId);
        }
      },
      onError: (err) => {
        toaster.error(
          err?.data?.message || err?.message || "Failed to delete inquiry"
        );
      },
    });
  };

  return {
    deleteConfirm,
    isDeleting,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
    handleConfirmDelete,
  };
}

export default useInquiriesConfirmationAlert;
