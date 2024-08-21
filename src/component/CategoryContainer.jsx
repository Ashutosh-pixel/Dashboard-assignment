import React from "react";
import CardsContainer from "./CardsContainer";

export default function CategoryContainer({ categoryheading }) {
  return (
    <div className="categorycontainer">
      <h2 className="category">{categoryheading}</h2>
      <CardsContainer categoryheading={categoryheading} />
    </div>
  );
}
