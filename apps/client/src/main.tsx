import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/css/styles.css";
import App from "./App.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
