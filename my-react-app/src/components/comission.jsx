import React from 'react';
import girlImg from '../assets/about-img.png'; 
import { Link } from "react-router-dom";

function Commission() {
  return (
 
    <React.Fragment>
      <div className="min-h-screen bg-[#EDFFD3] font-inter py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
       
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

       
          <div className="lg:w-1/2 text-center lg:text-left pl-4 sm:pl-6 lg:pl-0">
          
            <h2 className="text-4xl font-bold text-gray-800 mb-8 font-inter">Commission & Pricing</h2>

            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                <div>
                  <p className="font-semibold text-lg">Reporting an Item (Lost or Found):</p>
                  <p className="text-base">100% Free — always.</p>
                </div>
              </li>

              <li className="flex items-start">
                <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                <div>
                  <p className="font-semibold text-lg">Claiming a Found Item:</p>
                  <p className="text-base">A small service fee is applied only after a successful match and verification.</p>
                </div>
              </li>

              <li className="flex items-start">
                <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                <div>
                  <p className="font-semibold text-lg">Claiming a Found Item:</p>
                  <p className="text-base">A standard Commission: Rs. 50 – Rs. 100 (based on item type and value)</p>
                  <p className="text-base mt-2">
                    If the person who found the item chooses to waive the fee, then you don't pay anything. Small service fee is applied only after a successful match and verification.
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
                <div>
                  <p className="font-semibold text-lg">Finder Control:</p>
                  <p className="text-base">We give full flexibility to the finder to either accept the commission or return the item for free, making the platform community-driven and honest.</p>
                </div>
              </li>
            </ul>
          </div>

      
          <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          
            <img
              src={girlImg}
              alt="Vetayo Illustration: Person searching with a magnifying glass on a phone with location pins"
              className="w-full h-auto rounded-xl object-cover max-w-lg" 
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x350/EBFBEA/000000?text=Image+Not+Found"; }}
            />
          </div>
        </div>
      </div>
   
    
    </React.Fragment>
  );
}

export default Commission;
