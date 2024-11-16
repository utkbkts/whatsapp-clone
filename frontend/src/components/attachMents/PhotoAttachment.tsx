import { useFileStore } from "@/store/file-store";
import PhotoIcon from "@/svg/Photo";
import { useRef } from "react";

const PhotoAttachment: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_SIZE = 5 * 1024 * 1024;
  const { setFile } = useFileStore();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (
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
    <li>
      <button
        type="button"
        className="bg-[#BF59CF] rounded-full"
        onClick={() => inputRef.current?.click()}
      >
        <PhotoIcon />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/*,video/*"
          onChange={imageHandler}
          multiple
        />
      </button>
    </li>
  );
};

export default PhotoAttachment;
