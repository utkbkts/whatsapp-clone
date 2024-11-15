import React, { forwardRef } from "react";
import { cn } from "./tailwindMerge";

interface Props {
  text: "text" | "password";
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ text, placeholder, value, handleChange }, ref) => {
    return (
      <input
        type={text}
        className={cn(
          "dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg px-4"
        )}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
