import { useFileStore } from "@/store/file-store";
interface Props {
  activeIndex: number;
}

const FileViewer = ({ activeIndex }: Props) => {
  const { files } = useFileStore();
  return (
    <div className="w-full max-w-[60%]">
      <div className="flex justify-center items-center">
        {files[activeIndex].imgData ? (
          <img
            src={files[activeIndex].imgData as string}
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
              {Math.ceil(files[activeIndex]?.file.size) / 100} kB -{" "}
              {files[activeIndex].file.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
