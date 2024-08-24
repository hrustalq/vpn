import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { RouterProvider, AuthProvider } from "./shared/providers";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </StrictMode>,
);
