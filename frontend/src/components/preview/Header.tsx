import { useFileStore } from "@/store/file-store";
import CloseIcon from "@/svg/Close";

interface Props {
  activeIndex: number;
}

const Header = ({ activeIndex }: Props) => {
  const { clearFile, files } = useFileStore();

  return (
    <div className="w-full pl-4">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* close icon */}
        <div className="cursor-pointer" onClick={() => clearFile()}>
          <CloseIcon className="dark:fill-dark_svg_2" />
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">
          {files[activeIndex].file.name}
        </h1>
      </div>
    </div>
  );
};

export default Header;
