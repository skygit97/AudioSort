import App from "./components/app";
import React from "react";
import ReactDOM from "react-dom";

window.addEventListener("load", () => {
  const root = document.getElementById("root")
	ReactDOM.render(<App />, root);
});
