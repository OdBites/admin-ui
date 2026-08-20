import { handleApiError } from "OdBitesMfUI/utility/http";
import { cookies } from "OdBitesMfUI/utility";
import { toaster } from "./";

export default function errorHandler(error = {}) {
  const apiError = handleApiError(error, {
    notify: (message) => toaster.error(message),
    onUnauthorized: () => {
      cookies.removeCookie("admin_auth_token");
      cookies.removeCookie("admin_id");
      cookies.removeCookie("admin_theme");
      window.location.reload();
    },
  });

  return apiError.message;
}
