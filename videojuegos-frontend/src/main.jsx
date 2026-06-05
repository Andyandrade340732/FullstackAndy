import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Rutas from "./components/Rutas.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Rutas />
    </Provider>
  </StrictMode>
);