import "./App.css";

import NavBar from "./components/navbar";
import Hero from "./components/Hero";

import Filter from "./components/filter";
import About from "./components/About";
function App() {

  return (
    <div className=" w-[100%] bg-gradient-to-b from-lime-100 to-white font-sans overflow-x-hidden">
      <NavBar/>
      <Hero/>
      <Filter/>
      <About/>
    </div>
  );
}

export default App;
