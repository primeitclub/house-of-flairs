import aboutImg from "../assets/about-Img.png";

function About() {
  return (
    <div id = "about" className=" bg-[#EDFFD3] flex items-center justify-center py-20">
      <div className="bg-white  shadow-xl pt-30  pr-35  pl-15 mr-30 pb-20  w-full flex  rounded-tr-7xl rounded-br-2xl items-center justify-center gap-8 lg:gap-30">
        
        <div className="w-1.2 flex justify-center items-center">
        
          <img
            src={aboutImg}
            alt="Vetayo Illustration: Person searching with a magnifying glass on a phone with location pins"
            className="w-full h-auto rounded-xl object-cover max-w-lg"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x350/EBFBEA/000000?text=Image+Not+Found"; }}
          />
        </div>

      
        <div className="lg:w-[45%] ">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-inter">About <span className="text-[#86B049]">Vetayo</span></h2>
          <p className="text-gray-700 leading-relaxed mb-6 font-inter">
            Vetayo is a digital lost & found service designed for real life. Whether you lost something in a mall, park, office, gym, or anywhere else, Vetayo helps connect you to the person who found it or vice versa.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8 font-inter">
            We combine smart search tools, secure claiming systems, and simple tracking to make sure your items get back to you, not into a pile of forgotten things. And we do it with honesty and low cost in mind—no expensive service fees or unnecessary red tape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-inter">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Smart Lost & Found Platform
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              For Everyone. Everywhere
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Secure Claim System
            </div>
            <div className="flex items-center text-gray-700">
               
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>

               
              Fast, Simple, and Effective
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
