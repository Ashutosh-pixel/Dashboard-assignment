import React, { useState, useEffect } from "react";
import "./Style/WidgetModal.css";

function WidgetModal({ onClose, onConfirm, initialSelectedWidgets }) {
  const [activeTab, setActiveTab] = useState("CSPM");
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      const response = await fetch("http://localhost:3001/widgets");
      const data = await response.json();
      setWidgets(data);

      // Initialize selectedWidgets based on the selected state from the server
      const initialSelected = data.filter((widget) => widget.selected);
      setSelectedWidgets(initialSelected);
    };

    fetchWidgets();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (widget) => {
    const isSelected = selectedWidgets.some((w) => w.id === widget.id);

    if (isSelected) {
      setSelectedWidgets(selectedWidgets.filter((w) => w.id !== widget.id));
    } else {
      setSelectedWidgets([...selectedWidgets, widget]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedWidgets);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="tabs">
            {["CSPM", "CWPP", "Registry Scan", "Ticket"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="widgets-list">
            {widgets
              .filter((widget) => widget.category === activeTab)
              .map((widget) => (
                <div key={widget.id} className="widget-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedWidgets.some((w) => w.id === widget.id)}
                      onChange={() => handleCheckboxChange(widget)}
                    />
                    {widget.name}
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetModal;
