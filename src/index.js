import React from "react";
import { createRoot } from "react-dom/client";
import AccordionEditor from "./components/AccordionEditor";
import "./index.css";

const root = createRoot(document.getElementById("aspect-accordions-app"));
root.render(<AccordionEditor />);
