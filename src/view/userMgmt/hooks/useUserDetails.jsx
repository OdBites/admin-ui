import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StatusChip } from "OdBitesMfUI/sharedComp";
import {
  useGetUserByIdQuery,
  useUpdateProfilePictureMutation,
} from "../../../store/rtkServices/userMgmt";
import { handleMutation, toaster } from "../../../utility";
import { VITE_APP_ASSETS_PATH } from "../../../config/env";

export function useUserDetails() {
  const { id } = useParams();
  const { data: userDetails = {}, isFetching } = useGetUserByIdQuery(id);
  const [updateProfilePicture, { isLoading: isUpdatingPhoto }] =
    useUpdateProfilePictureMutation();

  const [addEditUserModal, setAddEditUserModal] = useState({
    open: false,
    selectedUser: null,
    action: "",
  });

  const visualizeFormatUserDetails = {
    "First Name": userDetails?.firstName,
    "Last Name": userDetails?.lastName,
    Status: <StatusChip status={userDetails?.status} variant="outlined" />,
    "Created At": userDetails?.createdAt,
    "Updated At": userDetails?.updatedAt,
    "Created By": userDetails?.createdBy
      ? userDetails.createdBy.charAt(0).toUpperCase() +
        userDetails.createdBy.slice(1)
      : userDetails?.createdBy,
    "Email Address": userDetails?.email,
    "Phone Number": userDetails?.phone,
  };

  const avatarSrc = userDetails?.photo
    ? `${VITE_APP_ASSETS_PATH}${userDetails?.folderLocation}/${userDetails?.photo}`
    : "/static/images/avatar/1.jpg";

  const handleProfilePictureSave = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    await handleMutation({
      mutationFn: updateProfilePicture,
      payload: { id, formData },
      onSuccess: (data) => {
        toaster.success(
          data?.message || "Profile picture updated successfully"
        );
      },
    });
  };

  return {
    id,
    userDetails,
    isFetching,
    isUpdatingPhoto,
    addEditUserModal,
    setAddEditUserModal,
    visualizeFormatUserDetails,
    avatarSrc,
    handleProfilePictureSave,
  };
}
