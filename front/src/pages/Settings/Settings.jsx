/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DefaultQuestions from "./DefaultQuestions";
import SkillsAndExperience from "./SkillsAndExperience";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("default");

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>

        {/* Updated flex container with borders and hover effects */}
        <div className="flex justify-center mt-6">
          {/* Left spacer */}
          <div className="flex-1"></div>

          {/* Centered buttons with border container */}
          <div className="flex border-b">
            <button
              className={`pb-2 px-6 text-lg font-medium border-b-2 transition-all duration-200 ${
                activeTab === "default"
                  ? "text-blue-600 border-blue-600 border-b-[3px]"
                  : "text-gray-500 border-transparent hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("default")}
            >
              Default Questions
            </button>
            
            {/* Vertical divider */}
            <div className="w-px bg-gray-300 mx-6"></div>
            
            <button
              className={`pb-2 px-6 text-lg font-medium border-b-2 transition-all duration-200 ${
                activeTab === "skills"
                  ? "text-blue-600 border-blue-600 border-b-[3px]"
                  : "text-gray-500 border-transparent hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              Skills & Experience
            </button>
          </div>

          {/* Right spacer */}
          <div className="flex-1"></div>
        </div>

        <div className="mt-6">
          {activeTab === "default" && <DefaultQuestions />}
          {activeTab === "skills" && <SkillsAndExperience />}
        </div>
      </div>
    </div>
  );
};

export default Settings;