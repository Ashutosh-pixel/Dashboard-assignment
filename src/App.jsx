import "./App.css";
import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";
import BodyGrid from "./component/BodyGrid";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="container">
      <div className="parent">
        <NavBar />
        <HeroSection />
        <BodyGrid />
      </div>
    </div>
  );
}

export default App;
