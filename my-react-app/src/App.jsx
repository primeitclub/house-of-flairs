import "./App.css";

import NavBar from "./components/navbar";
import Hero from "./components/Hero";

import Filter from "./components/filter";
import About from "./components/about";
import Insights from "./components/insights";
import Commission from "./components/comission";
import ReportLost from "./pages/ReportLost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LowerHalf from "./components/LowerHalf";
import ReportFound from "./pages/ReportFound";
import SearchItem from "./pages/SearchItem";
import ItemDetails from "./pages/ItemDetails";
function App() {

  return (
    <div className=" w-[100%] bg-gradient-to-b from-lime-100 to-white font-sans overflow-x-hidden">

<BrowserRouter>
  <Routes>
    <Route path="/" element={
      <>
        <NavBar />
        <Hero />
        <LowerHalf/>
        <Filter />
       <About/>
        <Insights />
       
        <Commission />
     <Footer/>
      
      </>
    } />
    <Route path="/report-lost" element={<ReportLost />} />
    <Route path="/report-found" element ={<ReportFound/>}/>
    <Route path="/search-item" element = {<SearchItem/>}/>
    <Route path="/items/:id" element={<ItemDetails />} />
  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
