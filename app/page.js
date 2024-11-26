"use client";
// cspell:disable

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { name: "", email: "", subject: "", message: "" };

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (formData.mail.trim() === "") {
      newErrors.mail = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
      newErrors.email = "Email is not valid";
      valid = false;
    }

    if (formData.subject.trim() === "") {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (formData.message.trim() === "") {
      newErrors.message = "Message is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Handle consultation submission logic here
    console.log("Consultation form submitted", formData);
  };

  const handleLoginInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData({
      ...loginData,
      [id]: value,
    });
    setLoginErrors({
      ...loginErrors,
      [id]: "", // Clear the error when the user starts typing
    });
  };

  const handleLoginSubmit = async  (e) => {
    e.preventDefault();
    let valid = true;
    let newLoginErrors = { email: "", password: "" };

    if (loginData.email.trim() === "") {
      newLoginErrors.email = "Email is required"; // Updated to 'email'
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newLoginErrors.email = "Email is not valid"; // Validate email
      valid = false;
    }

    if (loginData.password.trim() === "") {
      newLoginErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setLoginErrors(newLoginErrors);
      return;
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setLoginErrors({ password:errorResult.message || "Login failed."});
        return;
      }

      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken } = result;
      setLoginErrors({password:message});

      document.cookie = ` authToken=${jwtToken}; path=/;`

      const user = JSON.parse(atob(jwtToken.split('.')[1]));

      console.log(user.userType);
      

      if(user.userType === 'Admin'){
        router.push('/admin/main/dashboard');
      }else if(user.userType === 'Sub Admin'){
        router.push('/subAdmin/main/dashboard');
      }else if(user.userType === 'Employee'){
        router.push('/employee/main/dashboard');
      }

      if (success) {
        setLoginData({
          email: "",
          password: "",
        });
      }
    } 
    
    catch (error) {
      console.error(error);
      setErrors("Something went wrong. Please try again later.");
    }
    // Handle login submission logic here
    console.log("Login form submitted", loginData);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-950 h-16 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Image src="/appPage/ll1-.png" alt="Logo" width={40} height={40} />
          <div className="flex flex-col leading-none text-white">
            <h3 className="text-lg font-bold">COGENT</h3>
            <h3 className="text-lg font-bold">CREATORS</h3>
          </div>
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-white font-semibold px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-80 flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/appPage/bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Cogent Creators
          </h2>
          <p className="text-lg">
            Discover insights, manage projects, and much more.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-end p-8 gap-8">
        {/* Showcases Section */}
        <section className="lg:w-2/3 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Our Showcases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Showcase 1 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/analytics.jpg"
                alt="Analytics"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Analytics
              </h3>
              <p className="text-gray-700">
                Explore detailed analytics and insights to drive your business
                forward.
              </p>
            </div>
            {/* Showcase 2 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/pmng.jpg"
                alt="Project Management"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Project Management
              </h3>
              <p className="text-gray-700">
                Efficiently manage projects and collaborate with your team.
              </p>
            </div>
            {/* Showcase 3 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/csupport.jpeg"
                alt="Customer Support"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Customer Support
              </h3>
              <p className="text-gray-700">
                Manage customer inquiries and improve support response times.
              </p>
            </div>
            {/* Showcase 4 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/spfmnc.jpeg"
                alt="Sales Performance"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Sales Performance
              </h3>
              <p className="text-gray-700">
                Track sales metrics and improve your sales strategies.
              </p>
            </div>
            {/* Showcase 5 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/fmng.jpeg"
                alt="Finance Management"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Finance Management
              </h3>
              <p className="text-gray-700">
                Monitor and optimize your financial health.
              </p>
            </div>
            {/* Showcase 6 */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/appPage/hres.jpeg"
                alt="Human Resources"
                width={500}
                height={200}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-bold mb-4 text-blue-950">
                Human Resources
              </h3>
              <p className="text-gray-700">
                Streamline HR processes and manage employee data effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Consult Us Form */}
        <section className="lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mx-48">
              <Image
                src="/appPage/ll1_dark1.png"
                alt="logo"
                height={100}
                width={100}
                className="transform scale-150 py-4"
              />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-950">
              Consult Us
            </h2>
            <form onSubmit={handleConsultSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-blue-950"
                >
                  Name:
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-blue-950"
                >
                  Email:
                </label>
                <input
                  id="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block font-semibold text-blue-950"
                >
                  Subject:
                </label>
                <input
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter the subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-semibold text-blue-950"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-950 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
              {/* Social Media Handles */}
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-blue-950 mb-4">
                  Follow Us
                </h3>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://www.instagram.com/your-instagram-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-600"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/your-linkedin-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <i className="fab fa-linkedin text-2xl"></i>
                  </a>
                  <a
                    href="https://github.com/your-github-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                  <a
                    href="https://discord.com/invite/your-discord-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <i className="fab fa-discord text-2xl"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/your-facebook-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-700"
                  >
                    <i className="fab fa-facebook text-2xl"></i>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">
          &copy; 2023 Cogent Creators. All rights reserved. | Privacy Policy |
          Terms of Service
        </p>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-blue-900"
                >
                  Email:
                </label>
                <input
                  id="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  type="email" // Updated input type
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block font-semibold text-blue-900"
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    id="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-950 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
