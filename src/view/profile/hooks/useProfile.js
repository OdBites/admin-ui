import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cookies } from "OdBitesMfUI/utility";
import { useFormWithReinitialize } from "../../../hooks";
import { profileSchema } from "../validation";
import {
  useGetProfileDetailsQuery,
  useGetProfilePhotoQuery,
  useUpdateProfileDetailsMutation,
  useUpdateProfilePhotoMutation,
} from "../../../store/rtkServices";
import { handleMutation, toaster } from "../../../utility";
import { VITE_APP_ASSETS_PATH } from "../../../config/env";

export function useProfile() {
  const { getCookie } = cookies;
  const userId = getCookie("admin_id");

  const [isEditing, setIsEditing] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState({
    open: false,
  });

  // // rtk query
  const { data: profileDetails = {}, isFetching } =
    useGetProfileDetailsQuery(userId);
  const [updateProfileDetails, { isFetching: isUpdating }] =
    useUpdateProfileDetailsMutation();

  const {
    data: { folderLocation, photo } = {},
    isFetching: isProfilePicFetching,
  } = useGetProfilePhotoQuery(userId);
  const [updateProfilePhoto, { isFetching: isProfilePicUpdating }] =
    useUpdateProfilePhotoMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormWithReinitialize({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profileDetails?.firstName || "",
      lastName: profileDetails?.lastName || "",
      email: profileDetails?.email || "",
      description: profileDetails?.description || "",
    },
    mode: "onChange",
    enableReinitialize: true,
  });

  const onSubmit = async (updatedData) => {
    await handleMutation({
      mutationFn: updateProfileDetails,
      payload: { id: userId, updatedData },
      onSuccess: (data) => {
        setIsEditing(false);
        toaster.success(data.message);
        reset();
      },
    });
  };

  const handelUpdateProfilePic = async (imgData) => {
    const formData = new FormData();
    formData.append("photo", imgData);

    await handleMutation({
      mutationFn: updateProfilePhoto,
      payload: { id: userId, imgData: formData },
      onSuccess: (data) => {
        toaster.success(data.message);
      },
    });
  };

  const avatarSrc = `${VITE_APP_ASSETS_PATH}${folderLocation}/${photo}`;

  return {
    isEditing,
    setIsEditing,
    updatePasswordModal,
    setUpdatePasswordModal,
    profileDetails,
    isFetching: isFetching || isProfilePicFetching,
    isSaving: isSubmitting || isUpdating,
    isProfilePicUpdating,
    control,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    handelUpdateProfilePic,
    avatarSrc,
  };
}
