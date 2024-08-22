import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./context/CardContext";

const SearchBar = () => {
  const [searchwidget, setSearchwidget] = useState("");
  const { dashboardWidgets, setDashboardWidgets } = useContext(MyContext);
  const { searchdashboardWidgets, setSearchDashboardWidgets } =
    useContext(MyContext);

  useEffect(() => {
    if (searchwidget.trim() === "") {
      // If search term is empty, reset searchdashboardWidgets to an empty object
      setSearchDashboardWidgets({});
      return;
    }

    let newObject = {};

    Object.entries(dashboardWidgets).forEach(([category, widgets]) => {
      let newArray = []; // Reset the array for each category

      widgets.forEach((widget) => {
        if (widget.name.toLowerCase().includes(searchwidget.toLowerCase())) {
          newArray.push(widget);
        }
      });

      if (newArray.length > 0) {
        newObject[category] = newArray;
      }
    });

    // If no matches found, newObject will be empty
    if (Object.keys(newObject).length === 0) {
      setSearchDashboardWidgets({});
    } else {
      setSearchDashboardWidgets(newObject);
    }
  }, [searchwidget, dashboardWidgets]);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search Widget Name"
        value={searchwidget}
        className="pl-10 pr-4 py-1 w-full rounded-md bg-[#e0e0e0] text-black focus:outline-none"
        onChange={(e) => setSearchwidget(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
