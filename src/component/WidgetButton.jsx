// src/AddWidgetButton.js
import React, { useContext, useEffect, useState } from "react";
import WidgetModal from "./WidgetModal";
import "./Style/WidgetButton.css";
import { MyContext } from "./context/CardContext";

const WidgetButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { dashboardWidgets, setDashboardWidgets } = useContext(MyContext);
  const { widgets, setWidgets } = useContext(MyContext);

  console.log(dashboardWidgets);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchInitialWidgets = async () => {
    const response = await fetch("http://localhost:3001/widgets");
    const data = await response.json();

    const groupedWidgets = data.reduce((acc, widget) => {
      if (widget.selected) {
        // Only add widgets that are selected
        const { category } = widget;
        if (!acc[category]) acc[category] = [];
        acc[category].push(widget);
      }
      return acc;
    }, {});

    setDashboardWidgets(groupedWidgets);
    setWidgets(data); // Store all widgets in state
  };

  useEffect(() => {
    fetchInitialWidgets();
  }, []);

  const handleConfirm = async (selectedWidgets) => {
    let updatedWidgets = { ...dashboardWidgets };

    for (const widget of widgets) {
      // Use the fetched widgets here
      const isSelected = selectedWidgets.some((w) => w.id === widget.id);

      await fetch(`http://localhost:3001/widgets/${widget.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected: isSelected }),
      });

      if (isSelected) {
        if (!updatedWidgets[widget.category]) {
          updatedWidgets[widget.category] = [];
        }
        if (!updatedWidgets[widget.category].some((w) => w.id === widget.id)) {
          updatedWidgets[widget.category].push(widget);
        }
      } else {
        if (updatedWidgets[widget.category]) {
          updatedWidgets[widget.category] = updatedWidgets[
            widget.category
          ].filter((w) => w.id !== widget.id);
          if (updatedWidgets[widget.category].length === 0) {
            delete updatedWidgets[widget.category];
          }
        }
      }
    }

    setDashboardWidgets(updatedWidgets);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="add-widget-button">
        Add Widget <span className="plus-icon">+</span>
      </button>

      {isModalOpen && (
        <WidgetModal
          onClose={closeModal}
          onConfirm={handleConfirm}
          initialSelectedWidgets={dashboardWidgets}
          widgets={widgets} // Pass the widgets to the modal
        />
      )}

      {/* <div className="dashboard">
        {Object.entries(dashboardWidgets).map(([category, widgets]) => (
          <div key={category} className="widget-category">
            <h2>{category} Widgets</h2>
            {widgets.length > 0 ? (
              widgets.map((widget) => (
                <div key={widget.id} className="widget-item">
                  <p>
                    {widget.name}: {widget.description}
                  </p>
                  <button
                    onClick={() => handleRemoveWidget(category, widget.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No widgets selected for this category.</p>
            )}
          </div>
        ))}
      </div> */}
    </>
  );
};

export default WidgetButton;
