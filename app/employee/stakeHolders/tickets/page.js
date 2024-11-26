"use client";
import React, { useState } from "react";
import { Progress } from "@material-tailwind/react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editTicket, setEditTicket] = useState(null);

  const [ticketData, setTicketData] = useState([
    { ticketStatus: "new", ticketCount: 12, name: "New Ticket" },
    { ticketStatus: "solved", ticketCount: 84, name: "Solved Ticket" },
    { ticketStatus: "open", ticketCount: 24, name: "Open Ticket" },
    { ticketStatus: "pending", ticketCount: 13, name: "Pending Ticket" },
  ]);

  const [tickets, setTickets] = useState([
    {
      ticketId: 101,
      subject: "Laptop issue",
      assigned: { empId: 11, name: "John", profile: "/public/admin/user.jpeg" },
      createdDate: "5 Jan 2019 07:21 AM",
      lastReply: "5 Jan 2019 10:21 PM",
      priority: "high",
      status: "new",
    },
    {
      ticketId: 102,
      subject: "Mouse issue",
      assigned: { empId: 12, name: "Selivia", profile: "/public/admin/user.jpeg" },
      createdDate: "5 Mar 2019 07:21 AM",
      lastReply: "5 Mar 2019 11:21 PM",
      priority: "low",
      status: "open",
    },
    {
      ticketId: 103,
      subject: "Network issue",
      assigned: { empId: 13, name: "Jesie", profile: "/public/admin/user.jpeg" },
      createdDate: "12 Jan 2019 07:21 AM",
      lastReply: "16 Jan 2019 07:21 PM",
      priority: "medium",
      status: "in progress",
    },
    {
      ticketId: 104,
      subject: "Hardware issue",
      assigned: { empId: 14, name: "Marks", profile: "/public/admin/user.jpeg" },
      createdDate: "6 Oct 2019 07:21 AM",
      lastReply: "6 Oct 2019 07:21 PM",
      priority: "low",
      status: "closed",
    },
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("assigned.")) {
      const fieldName = name.split(".")[1];
      setEditTicket((prev) => ({
        ...prev,
        assigned: { ...prev.assigned, [fieldName]: value },
      }));
    } else {
      setEditTicket((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.ticketId.toString().includes(search)
  );

  return (
    <>
      <div className="text-blue-900 bg-white min-h-screen min-w-screen p-8 border border-gray-200 rounded-2xl border-x-gray-200 border-y-gray-200">
        {/* Ticket Summary */}
        <div className="flex flex-row m-0 mb-2">
          {ticketData.map((ticket) => (
            <div
              key={ticket.ticketStatus}
              className="text-white bg-blue-900 basis-1/4 h-28 rounded-md m-2"
            >
              <h1 className="m-2 text-lg font-medium">{ticket.name}</h1>
              <h1 className="m-2 text-xl">{ticket.ticketCount}</h1>
              <div className="border-black bg-white h-1 w-60 m-2 rounded-2xl">
                <div
                  className={`border-red-600 bg-green-700 h-1 rounded-2xl`}
                  style={{ width: `${ticket.ticketCount}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Add Ticket */}
        <div className="flex gap-4">
          <input
            type="text"
            value={search}
            placeholder="Search by ticket ID or ticket subject"
            onChange={handleSearch}
            className="p-2 border border-blue-900 rounded-md w-72 h-10"
          />
        </div>

        {/* Ticket Table */}
        <table className="w-full mt-4 border-collapse border-gray-200">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200 rounded-l">#</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Ticket Id</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Ticket Subject</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Assigned Staff</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Created Date</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Last Reply</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Priority</th>
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, index) => (
              <tr key={ticket.ticketId}>
                <td className="border-b px-4 py-2">{index + 1}</td>
                <td className="border-b px-4 py-2">{ticket.ticketId}</td>
                <td className="border-b px-4 py-2">{ticket.subject}</td>
                <td className="border-b px-4 py-2">{ticket.assigned.name}</td>
                <td className="border-b px-4 py-2">{ticket.createdDate}</td>
                <td className="border-b px-4 py-2">{ticket.lastReply}</td>
                <td className="border-b px-4 py-2">{ticket.priority}</td>
                <td className="border-b px-4 py-2">{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
