import React, { useContext } from "react";
import WidgetButton from "./WidgetButton";
import { MyContext } from "./context/CardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function CardsContainer({ categoryheading }) {
  const { dashboardWidgets, setDashboardWidgets } = useContext(MyContext);
  const { searchdashboardWidgets } = useContext(MyContext);

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
    console.log("updatedWidgets", updatedWidgets);
  };

  const widgetsToDisplay =
    Object.entries(searchdashboardWidgets).length > 0
      ? searchdashboardWidgets[categoryheading]
      : dashboardWidgets[categoryheading];

  return (
    <div className="cardscontainer">
      {widgetsToDisplay && widgetsToDisplay.length > 0 ? (
        widgetsToDisplay.map((widget) => (
          <div key={widget.id} className="widget">
            <div className="details">
              <p>{widget.name}</p>
            </div>
            <p id="widgetdescription">{widget.description}</p>
            <button
              className="icon"
              onClick={() => handleRemoveWidget(categoryheading, widget.id)}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#000000" }}
                size="xl"
              />
            </button>
          </div>
        ))
      ) : (
        <></>
      )}

      <div className="widget">
        <WidgetButton />
      </div>
    </div>
  );
}
