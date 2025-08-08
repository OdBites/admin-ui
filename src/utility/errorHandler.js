import { toaster } from "./";
import { cookies } from "SpiseBowlMfUI/utility";

function getErrorMessage(status, errorData) {
  const errorMessage =
    typeof errorData?.error === "string" && errorData.error.trim() !== ""
      ? errorData.error
      : null;

  if (!status && !errorMessage) {
    return "Network error or no response received. Please try again.";
  }

  switch (status) {
    case 400:
      return errorMessage || "Bad Request. Please check your input.";
    case 401: {
      cookies.removeCookie("auth_token");
      window.location.reload();
      return errorMessage || "Unauthorized. Please login again.";
    }
    case 403:
      return errorMessage || "Forbidden. You don’t have permission.";
    case 404:
      return errorMessage || "Requested resource not found.";
    case 408:
      return "Request timed out. Please try again.";
    case 422:
      return errorMessage || "Unprocessable Entity. Check your data.";
    case 429:
      return "Too many requests. Please wait and try again.";
    case 500:
      return errorMessage || "Internal server error.";
    case 502:
      return "Bad Gateway. Server received invalid response.";
    case 503:
      return "Service unavailable. Try again later.";
    case 504:
      return "Gateway timeout. Try again in a few moments.";
    default:
      if (errorMessage) {
        return errorMessage;
      } else if (typeof errorData?.error === "object") {
        const firstError = Object.values(errorData.error)?.[0];
        if (typeof firstError === "string") {
          return firstError;
        } else {
          return "Unexpected error occurred. Please try again.";
        }
      } else {
        return "Unexpected error occurred. Please try again.";
      }
  }
}

export default function errorHandler(response = {}) {
  const status = response?.status;
  const errorData = response?.data;
  const message = getErrorMessage(status, errorData);

  toaster.error(message);
  return message;
}
