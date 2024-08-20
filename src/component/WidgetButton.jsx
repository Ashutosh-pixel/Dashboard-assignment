// src/AddWidgetButton.js
import React from "react";
import "./Style/WidgetButton.css";

const WidgetButton = () => {
  return (
    <button className="add-widget-button">
      Add Widget <span className="plus-icon">+</span>
    </button>
  );
};

export default WidgetButton;
