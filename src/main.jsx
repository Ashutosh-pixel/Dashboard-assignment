import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CardContext from "./component/context/CardContext.jsx";

createRoot(document.getElementById("root")).render(
  <CardContext>
    <App />
  </CardContext>
);
