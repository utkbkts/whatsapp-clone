import { useFileStore } from "@/store/file-store";
import DocumentIcon from "@/svg/Document";
import { useRef } from "react";

const DocumentAttachment = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setFile } = useFileStore();

  const documentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const MAX_SIZE = 2 * 1024 * 1024;

    files.forEach((file) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav"
      ) {
        alert(`Unsupported file type: ${file.type}`);
        return;
      }
      const reader = new FileReader();
      if (file.size > MAX_SIZE) {
        alert("Image size exceeds 2MB");
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === FileReader.DONE && reader.result) {
          setFile(file);
        }
      };
    });
  };
  return (
    <li>
      <button
        type="button"
        className="bg-[#5F66CD] rounded-full"
        onClick={() => inputRef.current?.click()}
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain,audio/*"
        onChange={documentHandler}
      />
    </li>
  );
};

export default DocumentAttachment;
