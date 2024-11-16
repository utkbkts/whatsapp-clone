import { useFileStore } from "@/store/file-store";
import CloseIcon from "@/svg/Close";
import React, { useRef } from "react";

const Add = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setFile } = useFileStore();
  const MAX_SIZE = 2 * 1024 * 1024;

  const filestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

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
        file.type !== "audio/wav" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "image/webm" &&
        file.type !== "image/webp"
      ) {
        alert("Invalid file type");
        return;
      }
      const reader = new FileReader();
      if (file.size > MAX_SIZE) {
        alert("Image size exceeds 2MB");
        return;
      }

      reader.onload = () => {
        if (reader.readyState === FileReader.DONE && reader.result) {
          setFile(file, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-14 h-14 mt-4 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
        onChange={filestHandler}
      />
    </>
  );
};

export default Add;
