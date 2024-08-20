import React from "react";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="navbarback">
      <div className="navbar">
        <h3 id="dashboardhead">Dashboard</h3>
        <SearchBar />
      </div>
    </div>
  );
}
