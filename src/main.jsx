import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "sweetalert2/src/sweetalert2.scss";
import { setAxiosSettings } from "./utils/helpers.js";
import { NextUIProvider } from "@nextui-org/react";

setAxiosSettings();


// axios.defaults.baseURL = "http://localhost:5000"
// version correcta 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
