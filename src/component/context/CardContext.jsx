import React, { createContext, useState } from "react";

export const MyContext = createContext(null);

export default function CardContext({ children }) {
  const [dashboardWidgets, setDashboardWidgets] = useState({});
  const [searchdashboardWidgets, setSearchDashboardWidgets] = useState({});
  const [widgets, setWidgets] = useState([]);

  return (
    <MyContext.Provider
      value={{
        dashboardWidgets,
        setDashboardWidgets,
        widgets,
        setWidgets,
        searchdashboardWidgets,
        setSearchDashboardWidgets,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
