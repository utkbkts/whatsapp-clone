import { useEffect } from "react";
import { CallAreaProps } from "./CallArea";

export default function CallTimes({
  totalSecInCall,
  setTotalSecInCall,
  callAccepted,
}: CallAreaProps) {
  useEffect(() => {
    const setSecInCall = () => {
      setTotalSecInCall((prev) => prev + 1);
      setTimeout(setSecInCall, 1000);
    };
    if (callAccepted) {
      setSecInCall();
    }
    return () => setTotalSecInCall(0);
  }, [callAccepted]);

  return (
    <div
      className={`text-dark_text_2 ${
        totalSecInCall !== 0 ? "block" : "hidden"
      }`}
    >
      {Math.floor(totalSecInCall / 3600) >= 0 ? (
        <>
          <span>
            {Math.floor(totalSecInCall / 3600)
              .toString()
              .padStart(2, "0")}
          </span>
          <span>:</span>
        </>
      ) : null}
      <span>
        {Math.floor((totalSecInCall % 3600) / 60)
          .toString()
          .padStart(2, "0")}
      </span>
      <span>:</span>
      <span>{(totalSecInCall % 60).toString().padStart(2, "0")}</span>
    </div>
  );
}
