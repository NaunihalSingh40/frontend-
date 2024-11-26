"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/holiday/addHoliday";

export default function Page() {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    holidayId: "",
    name: "",
    date: "",
    region: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newHoliday = await response.json();
        console.log("Holiday added:", newHoliday);
        setIsFormVisible(false);
      } else {
        console.error("Error adding holiday");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/holiday/getAllHolidays");
        setHolidays(response.data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);


  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Holidays</h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-blue-900 text-white p-2 rounded-lg"
        >
          Add Holiday
        </button>
      </div>


      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 ml-64 mt-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">Add Holiday</h2>
            <div className="overflow-y-auto flex-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Holiday ID:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="holidayId"
                    value={formData.holidayId}
                    onChange={handleInputChange}
                    placeholder="Holiday ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Holiday Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Holiday Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Date:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Holiday Date"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Region:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    placeholder="Region"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Description:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Holiday Description"
                  />
                </div>
              </form>
            </div>
            <div className="bg-white p-4 flex justify-end gap-4 border-t border-gray-300 mt-4">
              <button
                type="submit"
                className="bg-blue-900 text-white p-2 rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-red-600 text-white p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="w-full mt-4 border-collapse" style={{ borderColor: "#d3d3d3" }}>
        <thead>
          <tr style={{ backgroundColor: "#1E3A8A" }}>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              #
            </th>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              Holiday Id
            </th>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              Holiday Name
            </th>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              Date
            </th>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              Region
            </th>
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr
              key={holiday.holidayId}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0", 
                color: "#3b3b3b",
              }}
            >
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {index + 1}
              </td>
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {holiday.holidayId}
              </td>
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {holiday.name}
              </td>
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {new Date(holiday.date).toLocaleDateString()} {/* Formatting date */}
              </td>
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {holiday.region}
              </td>
              <td className="border-b px-4 py-2" style={{ borderColor: "#d3d3d3" }}>
                {holiday.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
