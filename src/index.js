import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
