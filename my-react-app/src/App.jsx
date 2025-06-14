import "./App.css";

import NavBar from "./components/navbar";
import Hero from "./components/Hero";

import Filter from "./components/filter";
import About from "./components/about";
import Insights from "./components/insights";
import Commission from "./components/comission";
function App() {

  return (
    <div className=" w-[100%] bg-gradient-to-b from-lime-100 to-white font-sans overflow-x-hidden">
      <NavBar/>
      <Hero/>
      <Filter/>
      <About/>
      <Insights/>
      <Commission/>
    </div>
  );
}

export default App;
