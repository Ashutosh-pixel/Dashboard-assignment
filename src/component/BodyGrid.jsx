import React, { useContext } from "react";
import CategoryContainer from "./CategoryContainer";
import { MyContext } from "./context/CardContext";

export default function BodyGrid() {
  const { searchdashboardWidgets } = useContext(MyContext);

  const defaultCategories = ["CSPM", "CWPP", "Registry Scan", "Ticket"];

  const hasSearchResults = Object.entries(searchdashboardWidgets).some(
    ([, widgets]) => widgets.length > 0
  );

  return (
    <div className="maincontainer">
      {Object.entries(searchdashboardWidgets).length > 0 ? (
        hasSearchResults ? (
          Object.entries(searchdashboardWidgets).map(([category, widgets]) => (
            <CategoryContainer
              key={category}
              categoryheading={category}
              widgets={widgets}
            />
          ))
        ) : (
          <p>No widgets found matching your search.</p>
        )
      ) : (
        defaultCategories.map((category) => (
          <CategoryContainer key={category} categoryheading={category} />
        ))
      )}
    </div>
  );
}
