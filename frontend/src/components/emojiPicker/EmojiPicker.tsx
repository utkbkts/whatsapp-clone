import { useMenuStore } from "@/store/menu-store";
import CloseIcon from "@/svg/Close";
import EmojiIcon from "@/svg/Emoji";
import EmojiPickerReact from "emoji-picker-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  textRef: RefObject<HTMLInputElement | HTMLTextAreaElement>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const EmojiPicker = ({ textRef, message, setMessage }: Props) => {
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const { showEmoji, setEmoji, setAttachment, showAttachment } = useMenuStore();
  useEffect(() => {
    if (textRef.current && cursorPosition !== null) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, textRef]);

  const handleClick = () => {
    if (showAttachment) {
      setAttachment(false);
    }
    setEmoji(!showEmoji);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmoji = (emojiData: any, e: MouseEvent) => {
    const emoji = emojiData?.emoji;
    if (!emoji || !textRef.current) return;

    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart || 0);
    const end = message.substring(ref.selectionStart || 0);
    const newText = start + emoji + end;

    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <li>
      <button onClick={handleClick} className="btn" type="button">
        {showEmoji ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showEmoji && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPickerReact theme={"dark" as any} onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPicker;
