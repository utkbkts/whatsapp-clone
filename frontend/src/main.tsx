import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import * as process from "process";

(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>
);
