"use client";
import React from "react";

export default function Page() {
  const filteredHolidays = [
    {
      holidayId: "H001",
      name: "New Year's Day",
      date: "2024-01-01",
      region: "National",
      description:
        "Celebration of the first day of the Gregorian calendar year.",
    },
    {
      holidayId: "H002",
      name: "Independence Day",
      date: "2024-07-04",
      region: "National",
      description:
        "Commemorates the Declaration of Independence of the United States.",
    },
    {
      holidayId: "H003",
      name: "Christmas Day",
      date: "2024-12-25",
      region: "National",
      description: "Celebration of the birth of Jesus Christ.",
    },
    {
      holidayId: "H004",
      name: "Diwali",
      date: "2024-11-01",
      region: "Regional",
      description: "Festival of Lights, celebrated in many parts of India.",
    },
    {
      holidayId: "H005",
      name: "Chinese New Year",
      date: "2024-02-10",
      region: "Regional",
      description:
        "Celebration of the first day of the Chinese lunar calendar.",
    },
  ];

  return (
    <div className='min-h-screen bg-white text-blue-900 p-6'>
      <table
        className="w-full mt-4 border-collapse"
        style={{ borderColor: "#d3d3d3" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1E3A8A" }}>
            {" "}
            {/* Darkest Blue */}
            <th
              className="border-b px-4 py-2"
              style={{ color: "#f5f5f5", borderColor: "#a9a9a9" }}
            >
              {" "}
              {/* Light Gray for borders */}#
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
          {filteredHolidays.map((holiday, index) => (
            <tr
              key={holiday.holidayId}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0", // Light gray alternation for row background
                color: "#3b3b3b", // Text in gray
              }}
            >
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {index + 1}
              </td>
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {holiday.holidayId}
              </td>
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {holiday.name}
              </td>
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {holiday.date}
              </td>
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {holiday.region}
              </td>
              <td
                className="border-b px-4 py-2"
                style={{ borderColor: "#d3d3d3" }}
              >
                {holiday.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
