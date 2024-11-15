import AttachmentIcon from "@/svg/Attachment";
import Menu from "./Menu";
import { useMenuStore } from "@/store/menu-store";

const AttachMents = () => {
  const { setEmoji, showEmoji, setAttachment, showAttachment } = useMenuStore();
  const handleClick = () => {
    if (showEmoji) {
      setEmoji(false);
    }

    // Attachment menüsünü toggle et
    setAttachment(!showAttachment);
  };
  return (
    <li className="relative">
      <button onClick={handleClick} className="btn" type="button">
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Menu */}
      {showAttachment && <Menu />}
    </li>
  );
};

export default AttachMents;
