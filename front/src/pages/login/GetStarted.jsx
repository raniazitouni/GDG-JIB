/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import LogoWhite from "/Assets/loginAssets/LogoWhite.svg"; // Import the logo
import Logo from "/Assets/Logo.svg"; // Import the logo
import { useNavigate } from "react-router-dom";
import SignUpStudent from "./SignUpStudent";
import SignUpCompany from "./SignUpCompany";
import SignUpClub from "./SignUpClub";


function GetStartedPage() {
    const navigate = useNavigate();
    
    const [selectedOption, setSelectedOption] = useState("");
    const [err , setErr] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

   
    const handleNextClick = () => {
        if (selectedOption) {
            switch(selectedOption){
                case "etudiant"  : navigate("/SignUpStudent");
                break; 
                case "entreprise" : navigate("/SignUpCompany");
                break;
                case "club" : navigate("/SignUpClub");
                break;
            }
        } else {
            setErr("Please select an option to continue.");
        }
    };

    return (
      <div className="flex w-full h-screen cursor-default">
        {/* Left Side */}
        <div
          className="w-1/3 text-white flex flex-col justify-center items-center px-12 py-20"
          style={{ backgroundColor: "#130440" }}
        >
          <img src={LogoWhite} alt="Logo" className="mb-4" />
          <p className="text-2xl font-base">Your Gateway to Opportunities!</p>
        </div>

        {/* Right Side - Updated padding and max-width */}
        <div className="w-2/3 bg-white flex items-center justify-center px-10">
          <div className="w-full max-w-2xl bg-white rounded-lg px-10 py-12">
            <img src={Logo} alt="Logo" style={{ marginLeft: 0 }} />
            <h2 className="text-3xl font-base text-indigo-900 mb-6">
              Let s Get Started
            </h2>
            <p className=" text-gray-700 mb-6 font-semibold text-lg ">
              Who are you?
            </p>
            <form className="space-y-4">
              <div className="space-y-2">
                {/* Option 1 */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="etudiant"
                    checked={selectedOption === "etudiant"}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-800 text-lg">
                    Student - Discover opportunities & events
                  </span>
                </label>

                {/* Option 2 */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="entreprise"
                    checked={selectedOption === "entreprise"}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-800 text-lg">
                    Company - Find talented students & offer scholarships
                  </span>
                </label>

                {/* Option 3 */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="club"
                    checked={selectedOption === "club"}
                    onChange={handleOptionChange}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-3 text-gray-800 text-lg">
                    Club - Organize events & connect with students
                  </span>
                </label>
              </div>

              {/* Next Button */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={handleNextClick}
                  className="w-full bg-[#13043F] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  Next
                </button>
                {err && (
                  <p className="text-sm text-red-600 font-light my-2">
                    {err}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default GetStartedPage;
