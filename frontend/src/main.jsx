import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);