import { useFileStore } from "@/store/file-store";
import { SetStateAction } from "react";
interface Props {
  activeIndex: number;
  setActiveIndex: React.Dispatch<SetStateAction<number>>;
}

const HandleAndSend = ({ activeIndex, setActiveIndex }: Props) => {
  const { files } = useFileStore();
  return (
    <div className="w-[97%] items-center justify-between mt-2 border-t dark:border-dark_border_2 ">
      {/* Empty */}
      <span></span>

      <div className="flex gap-x-2 pb-12">
        {files.map((file, i) => (
          <div
            key={i}
            className={`w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer mt-4`}
            onClick={() => setActiveIndex(i)}
          >
            {file.imgData ? (
              <img
                src={file.imgData as string}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={`/PDF.png`}
                alt="image"
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleAndSend;
