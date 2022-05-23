import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Layout from "./pages/Layout";
import Reference from "./components/Reference";
import AddIPFS from "./components/AddIPFS";
import NotFound from "./components/NotFound";
import Validate from "./components/Validate";
import BlogReference from "./components/BlogReference";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="validate/:hash" element={<Validate />} />
          <Route path="browse/:cid" element={<Reference />} />
          <Route path="example" element={<BlogReference />} />
          <Route path="contribute" element={<AddIPFS />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
