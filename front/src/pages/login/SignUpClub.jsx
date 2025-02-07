/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LogoWhite from "/Assets/loginAssets/LogoWhite.svg"; // Import the logo
import Logo from "/Assets/Logo.svg"; // Import the logo
import EyeCloseIcon from "/Assets/loginAssets/eye-closed.svg"; // Import the eye close icon
import { fetchData } from "../../utils/utils";

function SignUpClub() {
  const [formData, setFormData] = useState({
    clubName: "",
    description: "",
    instagramUsername: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Form Data:", formData);
        const requestBody = {
          nom: formData.clubName,
          description: formData.description,
          instagramusername: formData.instagramUsername,
          email: formData.email,
          password: formData.password,
          role: "company",
        };
  
        const res = await fetchData(
          "http://localhost:8000/authentication/signup/",
          "POST",
          requestBody
        );
  
        if (res.error) {
          console.error("SignUp failed:", res.error);
          setErr("SignUp Failed");
        } else {
          console.log("SignUp successful:", res);
          const accessToken = res.access_token;
          const roles = res.role;
          const id_user = res.id_user;
          setAuth({ id_user, roles, accessToken });
          localStorage.setItem("token", res.token);
          navigate("/*");
        }
      }
    };

    const validateForm = () => {
      let newErrors = {};

      if (!formData.clubName.trim())
        newErrors.clubName = "Club Name is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";
     if (!formData.instagramUsername.trim())
       newErrors.instagramUsername = "Dinstagram User name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      if (!formData.confirmPassword.trim())
        newErrors.confirmPassword = "Confirm Password is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
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

      {/* Right Side */}
      <div className="w-2/3 mt-5 bg-white flex items-start justify-center px-10 pt-8">
        <div className="w-full max-w-2xl bg-white rounded-lg ">
          <img src={Logo} alt="Logo" style={{ marginLeft: 0 }} />
          <h2 className="text-2xl font-base text-indigo-900 mb-12">
            Find talented students & offer scholarships
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Club Name */}
            <div>
              <label
                htmlFor="clubName"
                className="block text-sm font-base text-gray-700"
              >
                Club Name
              </label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                placeholder="GDG Algiers"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.clubName && (
                <p className="text-red-500 text-xs mt-1">{errors.clubName}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-base text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Instagram Username */}
            <div>
              <label
                htmlFor="instagramUsername"
                className="block text-sm font-base text-gray-700"
              >
                Instagram Username
              </label>
              <input
                type="text"
                id="instagramUsername"
                name="instagramUsername"
                value={formData.instagramUsername}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.instagramUsername && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.instagramUsername}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-base text-gray-700"
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
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-base text-gray-700"
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
                  <img
                    src={EyeCloseIcon}
                    alt="Eye Close Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-base text-gray-700"
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
                  aria-label="Toggle Confirm Password Visibility"
                >
                  <img
                    src={EyeCloseIcon}
                    alt="Eye Close Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col">
              <button
                type="submit"
                className="w-full bg-[#13043F] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              {err && (
                <p className="text-sm text-red-600 font-light my-2">{err}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpClub;
