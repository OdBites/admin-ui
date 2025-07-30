import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toaster = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  warn: (message) => toast.warn(message),
  info: (message) => toast.info(message),
};
export default toaster;
