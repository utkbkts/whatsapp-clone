import { useFileStore } from "@/store/file-store";

const FileViewer = () => {
  const { files } = useFileStore();
  console.log("🚀 ~ FileViewer ~ files:", files);
  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {files[0].imgData ? (
          <img
            src={files[0].imgData as string}
            alt="file"
            className="hview  rounded-md max-w-[80%] object-contain"
          />
        ) : (
          <div className="min-h-full hview flex flex-col items-center justify-center">
            <img src={"/PDF.png"} alt="image" />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_2">
              {Math.ceil(files[0]?.file.size) / 100} kB - {files[0].file.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
