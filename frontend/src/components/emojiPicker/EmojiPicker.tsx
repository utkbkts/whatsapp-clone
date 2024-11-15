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
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  useEffect(() => {
    if (textRef.current && cursorPosition !== null) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, textRef]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmoji = (emojiData: any, e: MouseEvent) => {
    const emoji = emojiData?.emoji;
    if (!emoji || !textRef.current) return;

    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart || 0);
    const end = message.substring(ref.selectionStart || 0);
    const newText = start + emoji + end;
    console.log("🚀 ~ handleEmoji ~ newText:", newText);

    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
  };
  console.log(message);
  return (
    <li>
      <button
        onClick={() => setShowPicker((prev) => !prev)}
        className="btn"
        type="button"
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPickerReact theme={"dark" as any} onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPicker;
