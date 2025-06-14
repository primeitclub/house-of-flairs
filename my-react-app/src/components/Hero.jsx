import GirlImage from "./assets/girl.png";
function Hero(){
return(
<section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-12 flex-grow h-[calc(100vh-96px)]">
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug">
            Vetayo! <span className="text-lime-700">“Smart Lost & Found</span>{" "}
            That Brings Your Belongings Home.”
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 ">
            Vetayo is a smart and student-friendly lost & found platform built
            for your campus. Easily report lost or found items, get instant
            matches, and reconnect with your belongings—all in one place.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#86B049] hover:bg-[#476930] text-white px-5 py-2 rounded-lg font-semibold">
              Found Report
            </button>
            <button className="border  text-gray-900 border-gray-800 px-5 py-2 rounded-lg font-semibold  hover:bg-gray-100">
              About us
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