import React, { useContext } from "react";
import WidgetButton from "./WidgetButton";
import { MyContext } from "./context/CardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function CardsContainer({ categoryheading }) {
  const { dashboardWidgets, setDashboardWidgets } = useContext(MyContext);
  const { widgets, setWidgets } = useContext(MyContext);

  const handleRemoveWidget = async (category, widgetId) => {
    const updatedWidgets = { ...dashboardWidgets };
    updatedWidgets[category] = updatedWidgets[category].filter(
      (widget) => widget.id !== widgetId
    );

    if (updatedWidgets[category].length === 0) {
      delete updatedWidgets[category];
    }

    await fetch(`http://localhost:3001/widgets/${widgetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected: false }),
    });

    setDashboardWidgets(updatedWidgets);
  };

  const Test = () => {
    Object.entries(dashboardWidgets).map(([category, widgets]) => {
      console.log(category, widgets);
    });
  };

  Test();

  return (
    <div className="cardscontainer">
      {Object.entries(dashboardWidgets).map(([category, widgets]) =>
        category === categoryheading
          ? widgets.map((widget) => (
              <div key={widget.id} className="widget">
                <p>{widget.description}</p>
                {/* <button onClick={() => handleRemoveWidget(category, widget.id)}>
                  Remove
                </button> */}
                <button
                  className="icon"
                  onClick={() => handleRemoveWidget(category, widget.id)}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#000000" }}
                    size="xl"
                  />
                </button>
              </div>
            ))
          : null
      )}
      <div className="widget">
        <WidgetButton />
      </div>
    </div>
  );
}
