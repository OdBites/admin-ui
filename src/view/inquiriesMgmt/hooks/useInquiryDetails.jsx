import { useState, useEffect } from "react";
import {
  useUpdateInquiryStatusMutation,
  useAddAdminNoteMutation,
} from "../../../store/rtkServices/inquiries";
import { handleMutation, toaster } from "../../../utility";

export function useInquiryDetails(inquiriesList = []) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const [updateInquiryStatusMutation, { isLoading: isUpdatingStatus }] =
    useUpdateInquiryStatusMutation();

  const [addAdminNoteMutation, { isLoading: isAddingNote }] =
    useAddAdminNoteMutation();

  // Sync selectedInquiry with fresh RTK query cache
  useEffect(() => {
    if (selectedInquiry && inquiriesList?.length) {
      const updated = inquiriesList.find(
        (item) =>
          (item._id || item.id) === (selectedInquiry._id || selectedInquiry.id)
      );
      if (updated) {
        setSelectedInquiry(updated);
      }
    }
  }, [inquiriesList, selectedInquiry]);

  const handleOpenDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNewNoteText("");
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedInquiry(null);
    setNewNoteText("");
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedInquiry) return;
    const inquiryId = selectedInquiry._id || selectedInquiry.id;
    await handleMutation({
      mutationFn: updateInquiryStatusMutation,
      payload: { id: inquiryId, status: newStatus },
      onSuccess: (response) => {
        toaster.success(`Inquiry marked as ${newStatus}`);
        if (response?.data) setSelectedInquiry(response.data);
      },
      onError: (err) => {
        toaster.error(
          err?.data?.message ||
            err?.message ||
            "Failed to update inquiry status"
        );
      },
    });
  };

  const handleAddNote = async () => {
    if (!selectedInquiry || !newNoteText.trim()) return;
    const inquiryId = selectedInquiry._id || selectedInquiry.id;
    await handleMutation({
      mutationFn: addAdminNoteMutation,
      payload: { id: inquiryId, note: newNoteText.trim() },
      onSuccess: (response) => {
        toaster.success("Internal note added successfully");
        setNewNoteText("");
        if (response?.data) setSelectedInquiry(response.data);
      },
      onError: (err) => {
        toaster.error(
          err?.data?.message || err?.message || "Failed to add internal note"
        );
      },
    });
  };

  return {
    selectedInquiry,
    setSelectedInquiry,
    detailsOpen,
    newNoteText,
    setNewNoteText,
    isUpdatingStatus,
    isAddingNote,
    handleOpenDetails,
    handleCloseDetails,
    handleStatusChange,
    handleAddNote,
  };
}

export default useInquiryDetails;
