/* eslint-disable no-unused-vars */
import React from "react";

const InternshipForm = () => {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar Placeholder */}
      <div className="w-64 bg-gray-100">
        {/* Sidebar Component Goes Here */}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        {/* Navbar Placeholder */}
        <div className="mb-6">
          {/* Navbar Component Goes Here */}
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6">Apply for an Internship</h1>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="whyApply"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Why Do You Want To Apply For This Internship? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="whyApply"
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="I want to gain practical experience in my field, develop my skills, and learn from professionals in a real work environment."
                rows="3"
              />
            </div>

            <div>
              <label
                htmlFor="interests"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                What Interests You Most About This Company? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="interests"
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="I admire your company's work in the tech field, and this role aligns perfectly with my skills and career goals. I'm excited about the opportunity to contribute and learn."
                rows="3"
              />
            </div>

            <div>
              <label
                htmlFor="gain"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                What Do You Hope To Gain From This Internship Experience? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="gain"
                className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="I hope to gain hands-on experience, improve my technical and soft skills, and learn from industry professionals to prepare for my future career."
                rows="3"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                Generate a CV
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternshipForm;
