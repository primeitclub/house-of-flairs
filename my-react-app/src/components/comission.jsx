import React from 'react';
import girlImg from '../assets/about-img.png'; 
import { Link } from "react-router-dom";

function Commission() {
  return (
    <div className="min-h-screen bg-[#EDFFD3] font-inter py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left pl-4 sm:pl-6 lg:pl-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-inter">
            Commission & Pricing
          </h2>
          <p className="text-gray-600 mb-8">
            <strong>Commission & Revenue Model</strong><br />
            At Vetayo, we charge only when a lost item is successfully returned and verified.
          </p>

          <ul className="space-y-6 text-gray-700">
            <li className="flex items-start">
              <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <div>
                <p className="text-base">
                  A small success fee of Rs. 50–100 is applied after the finder confirms the item matches the claimant’s details.
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <div>
                <p className="text-base font-semibold">Commission Breakdown:</p>
                <ul className="pl-5 mt-1 text-base list-disc">
                  <li>Finder: 60%</li>
                  <li>Platform (Vetayo): 40%</li>
                </ul>
              </div>
            </li>

            <li className="flex items-start">
              <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <div>
                <p className="text-base">
                  This ensures a fair reward for the finder and supports platform costs like verification, hosting, and moderation.
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <span className="w-3 h-3 bg-[#476930] rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <div>
                <p className="text-base">
                  Want to return an item for free?<br />
                  No worries—if the finder chooses not to take a reward, no charge is applied.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          <img
            src={girlImg}
            alt="Vetayo Illustration"
            className="w-full h-auto rounded-xl object-cover max-w-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/500x350/EBFBEA/000000?text=Image+Not+Found";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Commission;
