import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import ToastContainer from "./Shared/Components/UiElements/Toast/ToastContainer";

//Index
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
    <ToastContainer />
  </React.StrictMode>
);
