"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Mock data for demo purposes
const mockData = {
  adminName: "Admin",
  dashboardCards: {
    totalProjects: 100,
    totalDepartments: 20,
    totalClients: 1000,
    totalEmployees: 100
  },
  employeeGenderSplit: {
    totalEmployees: 100,
    genderDistribution: {
      women: 70,
      men: 30
    }
  },
  scheduledTasks: [
    {
      date: "25 Sept, 2024",
      time: "10:00 AM",
      team: "Research Team",
      description: "Requirement Analysis"
    }
  ],
  events: [
    {
      date: "15 Sep",
      title: "Happy Raksha Bandan",
      description: "Bro Sis"
    }
  ],
  meetings: [
    {
      date: "15 Sep",
      title: "Strategy Meeting",
      description: "Discussing the strategy for Q4"
    }
  ],
  celebrations: [
    { imageURL: "/admin/user.jpeg", personName: "John Doe" },
    { imageURL: "/admin/user.jpeg", personName: "Jane Smith" }
  ],
  topPerformer: {
    imageURL: "/admin/user.jpeg",
    name: "Admin ABC",
    position: "Sr. Software Developer",
    points: 100
  }
};

export default function HRMSDashboard() {
  const [adminName, setAdminName] = useState(mockData.adminName);
  const [dashboardCards, setDashboardCards] = useState(mockData.dashboardCards);
  const [employeeGenderSplit, setEmployeeGenderSplit] = useState(mockData.employeeGenderSplit);
  const [scheduledTasks, setScheduledTasks] = useState(mockData.scheduledTasks);
  const [events, setEvents] = useState(mockData.events);
  const [meetings, setMeetings] = useState(mockData.meetings);
  const [celebrations, setCelebrations] = useState(mockData.celebrations);
  const [topPerformer, setTopPerformer] = useState(mockData.topPerformer);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminName(localStorage.getItem("adminName") || mockData.adminName);
    }
  }, []);

  return (
    <div className="p-6">
      {/* Welcome and Overview Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700">
          Welcome back, {adminName}!
        </h1>
        <p className="text-sm text-gray-500">
          Good morning! You have 45 new applications. Its a lot of work today. So lets get started.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <div className="p-4 bg-[#FDECEC] rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Projects</p>
            <p className="text-3xl text-gray-700">{dashboardCards.totalProjects}</p>
          </div>
          <div className="p-4 bg-[#E7F3FE] rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Departments</p>
            <p className="text-3xl text-gray-700">{dashboardCards.totalDepartments}</p>
          </div>
          <div className="p-4 bg-[#FFF0F9] rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-3xl text-gray-700">{dashboardCards.totalClients}</p>
          </div>
          <div className="p-4 bg-[#F5F9FF] rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Employees</p>
            <p className="text-3xl text-gray-700">{dashboardCards.totalEmployees}</p>
          </div>
        </div>
      </div>

      {/* Employee Gender Split */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-3xl text-gray-700">{employeeGenderSplit.totalEmployees}</p>
          <p className="text-sm text-gray-500">{employeeGenderSplit.genderDistribution.women} Women, {employeeGenderSplit.genderDistribution.men} Men</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-3xl text-gray-700">{employeeGenderSplit.totalEmployees}</p>
          <p className="text-sm text-gray-500">{employeeGenderSplit.genderDistribution.women} Women, {employeeGenderSplit.genderDistribution.men} Men</p>
        </div>
      </div>

      {/* Scheduled Tasks */}
      <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700">Scheduled Tasks</h3>
        <div className="flex justify-between mt-4">
          {scheduledTasks.map((task, index) => (
            <div key={index}>
              <p className="text-gray-500">{task.date}</p>
              <p className="text-gray-700">{task.time} - {task.team}</p>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Events and Meetings */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Events</h3>
          <div className="mt-4">
            {events.map((event, index) => (
              <div key={index} className="bg-[#E7F3FE] p-4 rounded-lg mb-2">
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-700">{event.title}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Meetings</h3>
          <div className="mt-4">
            {meetings.map((meeting, index) => (
              <div key={index} className="bg-[#FDECEC] p-4 rounded-lg mb-2">
                <p className="text-gray-600">{meeting.date}</p>
                <p className="text-gray-700">{meeting.title}</p>
                <p className="text-sm text-gray-500">{meeting.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Celebrations */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Celebrations</h3>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {celebrations.map((celebration, index) => (
              <Image
                key={index}
                src={celebration.imageURL}
                alt="User"
                className="rounded-full"
                width={60}
                height={60}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top Performer */}
      <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700">Top Performer</h3>
        <div className="flex items-center mt-4">
          <Image
            src={topPerformer.imageURL}
            alt="Top Performer"
            className="rounded-full"
            width={80}
            height={80}
          />
          <div className="ml-4">
            <p className="text-xl font-semibold text-gray-700">{topPerformer.name}</p>
            <p className="text-gray-600">{topPerformer.position}</p>
            <p className="text-sm text-gray-500">Points: {topPerformer.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
