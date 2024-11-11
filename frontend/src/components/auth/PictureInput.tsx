import { useRef, useState } from "react";

interface Props {
  readablePicture: string | null;
  setReadablePicture: (picture: string | null) => void;
  setPicture: (picture: File | null) => void;
}

const PictureInput = ({
  readablePicture,
  setPicture,
  setReadablePicture,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(`${file.type} is not a valid image file.`);
      return;
    }

    if (file.size > 1024 * 1024 * 4) {
      setError("Image file size exceeds 4MB.");
      return;
    }

    // No error, proceed with file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setReadablePicture(e.target.result as string);
        setPicture(e.target.result as any);
      }
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleRemovePicture = () => {
    setPicture(null);
    setReadablePicture(null);
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>

      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="uploaded preview"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer"
            onClick={handleRemovePicture}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          Upload Picture
        </div>
      )}

      <input
        type="file"
        id="picture"
        ref={inputRef}
        hidden
        accept="image/*"
        onChange={handlePictureChange}
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PictureInput;
