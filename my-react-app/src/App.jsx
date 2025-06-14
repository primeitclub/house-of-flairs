import "./App.css";

import NavBar from "./components/navbar";
import Hero from "./components/Hero";

import Filter from "./components/filter";
import About from "./components/about";
import Insights from "./components/insights";
import Commission from "./components/comission";
import ReportLost from "./pages/ReportLost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReportFound from "./pages/ReportFound";

function App() {

  return (
    <div className=" w-[100%] bg-gradient-to-b from-lime-100 to-white font-sans overflow-x-hidden">

<BrowserRouter>
  <Routes>
    <Route path="/" element={
      <>
        <NavBar />
        <Hero />
        <Filter />
       
        <Insights />
        <Commission />
      </>
    } />
    <Route path="/report-lost" element={<ReportLost />} />
    <Route path="/about" element={<About/>}/>
    {/* <Route path="/report-found" element ={<ReportFound/>}/> */}
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
