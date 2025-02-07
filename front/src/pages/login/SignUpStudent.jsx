/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LogoWhite from "/Assets/loginAssets/LogoWhite.svg"; // Import the logo
import Logo from "/Assets/Logo.svg"; // Import the logo
import EyeCloseIcon from "/Assets/loginAssets/eye-closed.svg"; // Import the eye close icon

function SignUpStudent() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Handle form submission logic
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

            {/* Right Side */}
            <div className="w-2/3 bg-white flex items-center justify-center px-10">
                <div className="w-full max-w-2xl bg-white rounded-lg ">
                    <img src={Logo} alt="Logo" style={{ marginLeft: 0 }} />
                    <h2 className="text-3xl font-base text-indigo-900 mb-12"> {/* Increased bottom margin */}
                        Discover opportunities & events
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-xl font-base text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-xl font-base text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xl font-base text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                        <label
                            htmlFor="password"
                            className="block text-xl font-base text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="*********************"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-black cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                <img src={EyeCloseIcon} alt="Eye Close Icon" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-xl font-base text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="*********************"
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-black cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                <img src={EyeCloseIcon} alt="Eye Close Icon" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-[#13043F] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

export default SignUpStudent;
