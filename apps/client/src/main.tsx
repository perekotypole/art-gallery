import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import { store } from "~/libs/modules/store/store.js";

import "./assets/css/styles.css";
import App from "./App.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <App />
    </StoreProvider>
  </StrictMode>,
);
