import React from "react";

import "./Container.css";
import Main from "../components/Main/Main";

function Container() {
  return (
    <div className="container">
      <div className="left-panel" />
      <div className="right-panel">
        <Main />
      </div>
    </div>
  );
}

export default Container;
