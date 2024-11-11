import toast from "react-hot-toast";

interface Props {
  title: string;
  errorMessage?: string;
  error?: string;
  promiseFunction: () => Promise<any>;
}

const Toast = ({ promiseFunction, title, error }: Props) => {
  toast.promise(promiseFunction(), {
    loading: "Transaction in progress...",
    success: <b>{title || "Success"}</b>,
    error: <b>{error || "Failed"}</b>,
  });
  return null;
};

export default Toast;
