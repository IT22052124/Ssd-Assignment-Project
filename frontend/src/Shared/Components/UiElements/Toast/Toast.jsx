import { toast } from "react-toastify";

const Toast = (message, Type) => {
  const value = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const kind = (Type || "info").toString().toLowerCase();
  switch (kind) {
    case "info":
      return toast.info(message, value);
    case "success":
      return toast.success(message, value);
    case "warn":
    case "warning":
      return toast.warn(message, value);
    case "error":
      return toast.error(message, value);
    default:
      return toast(message || "Notification", value);
  }
};

export default Toast;
