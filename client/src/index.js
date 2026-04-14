import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ Global styles
import "./index.css";

// ✅ Cart Context
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);