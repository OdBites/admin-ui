import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "SpiseBowlMfUI/helpers";
import { ThemeProviderWrapper } from "SpiseBowlMfUI/theme";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProviderWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderWrapper>
    </ErrorBoundary>
  </StrictMode>
);
