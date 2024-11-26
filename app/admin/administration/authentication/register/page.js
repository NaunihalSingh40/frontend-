"use client";
import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    userType: "Employee", // Default to "employee"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || "Registration failed.");
        return;
      }

      const result = await response.json();
      console.log(result);
      const { success, message } = result;
      setError(message);

      if (success) {
        setFormData({
          name: "",
          email: "",
          password: "",
          repeatPassword: "",
          userType: "Employee",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl text-blue-900 font-bold mb-6 text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="block text-blue-900 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-900 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-blue-900 font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-900 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* User Type Dropdown */}
          <div>
            <label
              className="block text-blue-900 font-semibold mb-2"
              htmlFor="userType"
            >
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-900 focus:border-blue-500"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Sub Admin">Sub Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-blue-900 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-900 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          {/* Repeat Password */}
          <div>
            <label
              className="block text-blue-900 font-semibold mb-2"
              htmlFor="repeatPassword"
            >
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-blue-900 focus:border-blue-500"
                placeholder="Repeat your password"
                required
              />
              <span
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showRepeatPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-center text-blue-900 mt-4">
          Already have an account?{" "}
          <a
            href="/admin/administration/authentication/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
