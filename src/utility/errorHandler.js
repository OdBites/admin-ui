import { handleApiError } from "OdBitesMfUI/utility/http";
import { cookies } from "OdBitesMfUI/utility";
import { toaster } from "./";

export default function errorHandler(error = {}) {
  const apiError = handleApiError(error, {
    notify: (message) => toaster.error(message),
    onUnauthorized: () => {
      cookies.removeCookie("auth_token");
      window.location.reload();
    },
  });

  return apiError.message;
}
