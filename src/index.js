import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    {" "}
    {/* ✅ RecoilRoot는 반드시 제일 바깥 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);

reportWebVitals();
