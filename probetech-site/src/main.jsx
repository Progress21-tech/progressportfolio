import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CaseStudyEventFlow from "./pages/CaseStudyEventFlow.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/eventflow" element={<CaseStudyEventFlow />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
