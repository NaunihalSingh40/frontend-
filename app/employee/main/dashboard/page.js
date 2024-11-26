/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { format, addDays } from 'date-fns';

// Sample data
const employeeData = {
  name: "John Doe",
  pic: "/admin/user.jpeg",
  tasksToday: [
    { task: "Complete project report", status: "Pending" },
    { task: "Team meeting", status: "Completed" }
  ],
  absentFellows: [
    { name: "Jane Smith", reason: "Sick Leave" },
    { name: "Mark Johnson", reason: "Vacation" }
  ],
  tasksTomorrow: [
    { task: "Client follow-up", status: "Pending" }
  ],
  projects: {
    totalTasks: 20,
    pendingTasks: 5,
    totalProjects: 4
  },
  leave: {
    taken: 5,
    remaining: 10
  },
  timeOff: {
    approvedHours: 15,
    remainingHours: 25
  },
  holidays: [
    { date: format(new Date(), 'yyyy-MM-dd'), event: "Company Holiday" }
  ]
};

export default function EmployeeDashboard() {
  const [todayDate] = useState(new Date());
  const tomorrowDate = addDays(todayDate, 1);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-[#F9FAFB]">
      {/* Header Section */}
      <header className="flex items-center space-x-4 bg-[#142A6E] p-4 rounded">
        <Image
          src={employeeData.pic}
          alt="Employee Pic"
          width={64}
          height={64}
          className="rounded-full border border-[#CCCCCC]"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">Hello, {employeeData.name}!</h1>
          <p className="text-[#F5F6F7]">Today is {format(todayDate, 'MMMM dd, yyyy')}</p>
        </div>
      </header>

      {/* Tasks and Absent Fellows */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-900">
        {/* Today's Tasks */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#333333]">Today's Tasks</h2>
          <ul className="mt-4">
            {employeeData.tasksToday.map((task, index) => (
              <li key={index} className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
                <span>{task.task}</span>
                <span className={`font-semibold ${task.status === 'Pending' ? 'text-[#FF6B6B]' : 'text-[#4CAF50]'}`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Fellow Employees' Absentees */}
        <section className="bg-white p-4 rounded-lg shadow ">
          <h2 className="text-xl font-semibold text-[#333333]">Fellow Employees' Absentees</h2>
          <ul className="mt-4">
            {employeeData.absentFellows.map((absentee, index) => (
              <li key={index} className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
                <span>{absentee.name}</span>
                <span className="text-[#888888]">{absentee.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Tomorrow's Tasks */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow text-blue-900">
        <h2 className="text-xl font-semibold text-[#333333]">Tomorrow's Tasks</h2>
        <ul className="mt-4">
          {employeeData.tasksTomorrow.map((task, index) => (
            <li key={index} className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
              <span>{task.task}</span>
              <span className={`font-semibold ${task.status === 'Pending' ? 'text-[#FF6B6B]' : 'text-[#4CAF50]'}`}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects Section */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow text-blue-900">
        <h2 className="text-xl font-semibold text-[#333333]">Projects</h2>
        <ul className="mt-4">
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Total Tasks</span>
            <span>{employeeData.projects.totalTasks}</span>
          </li>
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Pending Tasks</span>
            <span>{employeeData.projects.pendingTasks}</span>
          </li>
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Total Projects</span>
            <span>{employeeData.projects.totalProjects}</span>
          </li>
        </ul>
      </section>

      {/* Leave Section */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow text-blue-900">
        <h2 className="text-xl font-semibold text-[#333333]">Leave</h2>
        <ul className="mt-4">
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Leave Taken</span>
            <span>{employeeData.leave.taken}</span>
          </li>
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Leave Remaining</span>
            <span>{employeeData.leave.remaining}</span>
          </li>
        </ul>
        <button className="mt-4 bg-[#FF6B6B] text-white px-4 py-2 rounded">Apply Leave</button>
      </section>

      {/* Time Off Allowance Section */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow text-blue-900">
        <h2 className="text-xl font-semibold text-[#333333]">Time Off Allowance</h2>
        <ul className="mt-4">
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Approved Hours</span>
            <span>{employeeData.timeOff.approvedHours}</span>
          </li>
          <li className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
            <span>Remaining Hours</span>
            <span>{employeeData.timeOff.remainingHours}</span>
          </li>
        </ul>
        <button className="mt-4 bg-[#4CAF50] text-white px-4 py-2 rounded">Apply Time Off</button>
      </section>

      {/* Upcoming Holidays Section */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow text-blue-900">
        <h2 className="text-xl font-semibold text-[#333333]">Upcoming Holidays</h2>
        <ul className="mt-4">
          {employeeData.holidays.map((holiday, index) => (
            <li key={index} className="flex justify-between py-2 border-b border-[#DDDDDD] last:border-b-0">
              <span>{format(new Date(holiday.date), 'MMMM dd, yyyy')}</span>
              <span>{holiday.event}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
