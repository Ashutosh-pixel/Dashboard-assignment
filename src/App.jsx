import "./App.css";
import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";

function App() {
  return (
    <div className="container">
      <div className="parent">
        <NavBar />
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
