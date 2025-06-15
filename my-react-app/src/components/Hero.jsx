import GirlImage from "../assets/girl.png";
import { Link } from "react-router-dom";
function Hero(){
return(
<section className="flex flex-col md:flex-row items-center bg-gradient-to-b from-[#EEFFD6] to-[#FFFFFE] justify-between px-10 md:px-20 py-12 mt-20 flex-grow h-[calc(100vh-96px)]">
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xlfont md:text-5xl font-bold text-gray-900 mb-6 leading-snug">
            Vetayo! <span className="text-lime-700">“Smart Lost & Found</span>{" "}
            That Brings Your Belongings Home.”
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 ">
            Vetayo is a smart and student-friendly lost & found platform built
            for your campus. Easily report lost or found items, get instant
            matches, and reconnect with your belongings—all in one place.
          </p>
         <div className="flex space-x-4">
  <button className="w-1/3 bg-[#86B049] hover:bg-[#476930] text-white rounded-lg font-semibold py-3">
    <Link to="/report-found" className="block text-center">
      I Found Something
    </Link>
  </button>
  <button className="w-1/3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out py-3">
    <Link to="/report-lost" className="block text-center">
      I Lost Something
    </Link>
  </button>
</div>

        </div>

        {/* Image */}
        <div className="mt-10 md:mt-0 md:w-[40%] flex justify-center mr-20">
          <img
            src={GirlImage} // Ensure this path is correct
            alt="Illustration"
            className=""
          />
        </div>
      </section>
);
}
export default Hero;