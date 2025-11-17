import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // ❌ StrictMode removed (Supabase issues)
  <App />
);
