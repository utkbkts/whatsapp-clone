import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
      <Loader className="animate-spin duration-400" />
      <h1 className="text-2xl flex ">
        Loading
        <span className="dot-1 loading-text">.</span>
        <span className="dot-2 loading-text">.</span>
        <span className="dot-3 loading-text">.</span>
      </h1>
    </div>
  );
};

export default Loading;
