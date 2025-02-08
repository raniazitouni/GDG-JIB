/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LogoWhite from "/Assets/loginAssets/LogoWhite.svg"; // Import the logo
import Logo from "/Assets/Logo.svg"; // Import the logo
import EyeCloseIcon from "/Assets/loginAssets/eye-closed.svg"; // Import the eye close icon
import { fetchData } from "../../utils/utils";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpCompany() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
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
        nom: formData.companyName,
        description: formData.description,
        email: formData.email,
        password: formData.password,
        role: "entreprise",
      };
      console.log(requestBody);

      const res = await fetchData(
        "http://localhost:8000/authentication/signup/",
        "POST",
        requestBody
      );
      console.log("res",res);
      

      if (res.error) {
        console.error("SignUp failed:", res.error);
        setErr("SignUp Failed");
      } else {
        console.log("SignUp successful:", res);
        const accessToken = res.access_token;
        const roles = res.role;
        const id_user = res.id_user;
      const name = res.name;

        setAuth({ id_user, roles, accessToken , name });
        localStorage.setItem("token", res.access_token);
        navigate("/*");
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
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
      <div className="w-2/3 bg-white flex items-center justify-center px-10">
        <div className="w-full max-w-2xl bg-white rounded-lg ">
          <img src={Logo} alt="Logo" style={{ marginLeft: 0 }} />
          <h2 className="text-3xl font-base text-indigo-900 mb-12">
            Register Your Company
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-base text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company XYZ"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.companyName}
                </p>
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
                placeholder="Brief description of your company"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
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
                placeholder="company@example.com"
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
                  aria-label="Toggle Password Visibility"
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
                Sign Up
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

export default SignUpCompany;
