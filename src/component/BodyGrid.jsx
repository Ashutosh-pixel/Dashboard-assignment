import React from "react";
import CategoryContainer from "./CategoryContainer";

export default function BodyGrid() {
  return (
    <div className="maincontainer">
      <CategoryContainer categoryheading={"CSPM"} />
      <CategoryContainer categoryheading={"CWPP"} />
      <CategoryContainer categoryheading={"Registry Scan"} />
      <CategoryContainer categoryheading={"Ticket"} />
    </div>
  );
}
