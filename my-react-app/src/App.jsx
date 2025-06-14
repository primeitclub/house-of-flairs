import "./App.css";

import NavBar from "./components/navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className=" w-[100%] bg-gradient-to-b from-lime-100 to-white font-sans overflow-x-hidden">
      <NavBar/>
      <Hero/>
    </div>
  );
}

export default App;
