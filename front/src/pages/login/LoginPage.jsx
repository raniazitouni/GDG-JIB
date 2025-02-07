/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LogoWhite from "/Assets/loginAssets/LogoWhite.svg"; // Import the logo
import Logo from "/Assets/Logo.svg"; // Import the logo
import EmailIcon from "/Assets/loginAssets/email.svg"; // Import the email icon
import PasswordIcon from "/Assets/loginAssets/password.svg"; // Import the password icon
import EyeCloseIcon from "/Assets/loginAssets/eye-closed.svg"; // Import the eye-close icon

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full h-screen cursor-default">
      {/* Left Side */}
      <div
        className="w-1/2 text-white flex flex-col justify-center items-center px-12 py-20"
        style={{ backgroundColor: "#130440" }}
      >
        <img src={LogoWhite} alt="Logo" className="mb-4" />{" "}
        {/* Replace text with logo */}
        <p className="text-3xl font-base">Your Gateway to Opportunities!</p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg p-12">
          <img src={Logo} alt="Logo" style={{ marginLeft: 0 }} />{" "}
          {/* Add logo */}
          <h2
            className="text-3xl font-base text-indigo-900 mb-6"
            style={{ textAlign: "left" }}
          >
            Log in to Your Account
          </h2>
          <form className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative mt-1">
                <img
                  src={EmailIcon}
                  alt="Email Icon"
                  className="absolute inset-y-0 left-3 w-5 h-5 my-auto"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="w-full pl-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <img
                  src={PasswordIcon}
                  alt="Password Icon"
                  className="absolute inset-y-0 left-3 w-5 h-5 my-auto"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="*********************"
                  className="w-full pl-12 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-black cursor-pointer"
                  aria-label="Toggle Password Visibility"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={EyeCloseIcon}
                    alt="Eye Close Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <a
                href="#"
                className="text-l text-indigo-600 hover:underline cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#13043F] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
