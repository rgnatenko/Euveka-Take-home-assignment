import { useState } from "react";
import { toast } from "react-toastify";
import { sendParametersToDevice } from "../utils/sendParametersToDevice";

const useDeviceControl = () => {
  const [loading, setLoading] = useState(false);

  const sendToDevice = () => {
    setLoading(true);
    sendParametersToDevice()
      .then((successMessage) => {
        toast.success(successMessage);
      })
      .catch((errorMessage) => {
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {}, 2000);
      });
  };

  return {
    loading,
    sendToDevice,
  };
};

export default useDeviceControl;
