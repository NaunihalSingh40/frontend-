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

  const handleAddTicket = () => {
    setIsAdding(true);
    setEditTicket({
      ticketId: Date.now(),
      subject: "",
      assigned: { empId: "", name: "", profile: "" },
      createdDate: new Date().toLocaleString(),
      lastReply: new Date().toLocaleString(),
      priority: "medium",
      status: "new",
    });
  };

  const handleEdit = (ticket) => {
    setIsEditing(true);
    setEditTicket(ticket);
  };

  const handleDelete = (ticketId) => {
    setTickets(tickets.filter((ticket) => ticket.ticketId !== ticketId));
  };

  const handleSave = () => {
    if (isAdding) {
      setTickets([...tickets, editTicket]);
      setIsAdding(false);
    } else if (isEditing) {
      setTickets(
        tickets.map((ticket) =>
          ticket.ticketId === editTicket.ticketId ? editTicket : ticket
        )
      );
      setIsEditing(false);
    }
    setEditTicket(null);
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
          <button
            type="button"
            onClick={handleAddTicket}
            className="flex p-2 border bg-blue-900 rounded-md h-10 font-bold hover:bg-blue-800 text-gray-200 justify-end"
          >
            Add Ticket
          </button>
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
              <th className="border-b px-4 py-2 bg-blue-900 text-gray-200 rounded-r">Action</th>
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
                <td className="border-b px-4 py-2">
                  <button onClick={() => handleEdit(ticket)} className="text-blue-600 hover:text-blue-900">Edit</button> |{" "}
                  <button onClick={() => handleDelete(ticket.ticketId)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit or Add Ticket Modal */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4 text-blue-900">{isEditing ? "Edit Ticket" : "Add Ticket"}</h2>
            <div className="flex flex-col gap-4">
              {/* Subject Input */}
              <label className="font-medium text-blue-900">Ticket Subject:</label>
              <input
                type="text"
                name="subject"
                value={editTicket.subject}
                onChange={handleChange}
                placeholder="Ticket Subject"
                className="p-2 border border-blue-900 rounded-md text-blue-900"
              />

              {/* Assigned Staff Input */}
              <label className="font-medium text-blue-900">Assigned Staff:</label>
              <input
                type="text"
                name="assigned.name"
                value={editTicket.assigned.name}
                onChange={handleChange}
                placeholder="Assigned Staff"
                className="p-2 border border-blue-900 rounded-md text-blue-900"
              />

              {/* Priority Dropdown */}
              <label className="font-medium text-blue-900">Priority:</label>
              <select
                name="priority"
                value={editTicket.priority}
                onChange={handleChange}
                className="p-2 border border-blue-900 rounded-md text-blue-900"
              >
                <option className='text-blue-900' value="low">Low</option>
                <option className='text-blue-900' value="medium">Medium</option>
                <option className='text-blue-900' value="high">High</option>
              </select>

              {/* Status Dropdown */}
              <label className="font-medium text-blue-900
              ">Status:</label>
              <select
                name="status"
                value={editTicket.status}
                onChange={handleChange}
                className="p-2 border border-blue-900 rounded-md text-blue-900"
              >
                <option className='text-blue-900' value="new">New</option>
                <option className='text-blue-900' value="open">Open</option>
                <option className='text-blue-900' value="in progress">In Progress</option>
                <option className='text-blue-900' value="closed">Closed</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsAdding(false);
                  setEditTicket(null);
                }}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
