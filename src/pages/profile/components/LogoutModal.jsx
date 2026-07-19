import React, { memo } from "react";
import PropTypes from "prop-types";

import { useCookies } from "OdBitesMfUI/hooks";

import CustomAlertDialog from "../../../sharedComponents/dialog/CustomAlertDialog";

function LogoutModal({ logoutModal, setLogoutModal }) {
  const { removeCookie } = useCookies();
  const { open } = logoutModal;

  const handleClose = () => {
    setLogoutModal({ open: false });
  };

  const handleConfirm = () => {
    removeCookie("auth_token");
    handleClose();
    window.location.reload();
  };

  return (
    <CustomAlertDialog
      open={open}
      onClose={handleClose}
      handleConfirm={handleConfirm}
      title="Ready to log out?"
      description="You’ll be logged out of your account. Don’t worry, we’ll keep your session safe so you can log back in anytime."
      confirmLabel="Yes, Log Me Out"
      cancelLabel="Cancel"
      size="xs"
    />
  );
}

LogoutModal.propTypes = {
  logoutModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
  }).isRequired,
  setLogoutModal: PropTypes.func.isRequired,
};

export default memo(LogoutModal);
