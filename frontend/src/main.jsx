import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/appContext.jsx"; // import context provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>  {/* Wrap your app here */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
