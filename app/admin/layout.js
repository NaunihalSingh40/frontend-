'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/adminNavbar';
import Sidebar from '../../components/adminSidebar';
import { ActiveItemProvider } from '../../components/context/adminContext';
import axios from "axios";
import { useRouter } from "next/navigation";

import '../../app/globals.css';

export default function RootLayout({ children }) {

  function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  }

  const router = useRouter();
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const token = getCookieValue("authToken");

  //   if (!token) {
  //     router.push("/"); // Redirect to home if no token is found
  //   } else {
  //     axios
  //       .get("http://localhost:8080/api/admin", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("REsponse = > ", response)
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 403) {
  //           alert("Access Denied. You do not have permission.");
  //           router.push("/"); // Redirect if unauthorized
  //         } else {
  //           console.error("Error fetching data:", error);
  //         }
  //       });
  //   }
  // }, [router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className="bg-[#edeff3] dark:text-white font-montserrat">
        <ActiveItemProvider>
          <div className="flex flex-col h-screen relative">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1">
              <Sidebar isOpen={sidebarOpen} />
              <main className="xl:ml-[300px]  lg:ml-80 md:ml-80 xl:p-10 lg:p-10 md:p-10 sm:p-5 p-5 mt-20 flex-1">{children}</main>
            </div>
          </div>
        </ActiveItemProvider>
      </body>
    </html>
  );
}