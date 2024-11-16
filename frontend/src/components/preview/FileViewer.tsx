import { useFileStore } from "@/store/file-store";
interface Props {
  activeIndex: number;
}

const FileViewer = ({ activeIndex }: Props) => {
  const { files } = useFileStore();

  const file = files[activeIndex];
  if (!file) return null; // Eğer dosya mevcut değilse, hiçbir şey render etme

  const isImage = file.file.type.startsWith("image/");
  const isVideo = file.file.type === "video/mp4";

  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {file.imgData ? (
          isImage ? (
            <img
              src={file.imgData as string}
              alt="file"
              className="hview rounded-md max-w-[80%] object-contain"
            />
          ) : isVideo ? (
            <video
              src={file.imgData as string}
              controls
              className="hview max-w-[80%]"
            />
          ) : (
            <div className="min-h-full hview flex flex-col items-center justify-center">
              <img src={"/PDF.png"} alt="image" />
              <h1 className="dark:text-dark_text_2 text-2xl">
                No preview available
              </h1>
              <span className="dark:text-dark_text_2">
                {Math.ceil(file.file.size) / 100} kB - {file.file.type}
              </span>
            </div>
          )
        ) : (
          <div className="min-h-full hview flex flex-col items-center justify-center">
            <img src={"/PDF.png"} alt="image" />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_2">
              {Math.ceil(file.file.size) / 100} kB - {file.file.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default FileViewer;
