import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./index.css";
import { PokeApp } from "./PokeApp.tsx";

import "primereact/resources/themes/arya-orange/theme.css"; //dark theme
// import "primereact/resources/themes/viva-light/theme.css"; //light theme

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <PokeApp />
    </PrimeReactProvider>
  </StrictMode>,
);
