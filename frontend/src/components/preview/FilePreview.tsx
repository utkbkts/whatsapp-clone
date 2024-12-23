import { useState } from "react";
import FileViewer from "./FileViewer";
import HandleAndSend from "./HandleAndSend";
import Header from "./Header";
import Input from "./Input";

const FilePreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center">
        <Header activeIndex={activeIndex} />
        {/* Viewing selected file */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          <Input message={message} setMessage={setMessage} />

          <HandleAndSend
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
