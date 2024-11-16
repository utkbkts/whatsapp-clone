import { useFileStore } from "@/store/file-store";
import CloseIcon from "@/svg/Close";

const Header = () => {
  const { clearFile, files } = useFileStore();
  const fileName = files.map((item) => item.file.name);
  return (
    <div className="w-full pl-4">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* close icon */}
        <div className="cursor-pointer" onClick={() => clearFile()}>
          <CloseIcon className="dark:fill-dark_svg_2" />
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">{fileName}</h1>
      </div>
    </div>
  );
};

export default Header;
