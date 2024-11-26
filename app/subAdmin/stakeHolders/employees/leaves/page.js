"use client";
import { useState } from "react";

const LeaveDashboard = () => {
  // Sample data for display
  const [leaves, setLeaves] = useState([
    {
      name: "John Doe",
      leaveType: "Medical Leave",
      from: "2023-08-27",
      to: "2023-08-27",
      days: 1,
      reason: "Going to Hospital",
      status: "Approved",
    },
    {
      name: "Buster Wigton",
      leaveType: "Hospitalisation",
      from: "2023-08-15",
      to: "2023-08-25",
      days: 10,
      reason: "Surgery",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    leaveType: "",
    from: "",
    to: "",
    days: "",
    reason: "",
    status: "New", // Default status
  });

  const [searchFilters, setSearchFilters] = useState({
    name: "",
    leaveType: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const addLeave = () => {
    if (isEditing) {
      const updatedLeaves = leaves.map((leave, index) =>
        index === currentEditIndex ? { ...formData } : leave
      );
      setLeaves(updatedLeaves);
    } else {
      setLeaves([...leaves, { ...formData }]);
    }
    setShowModal(false);
    setFormData({
      name: "",
      leaveType: "",
      from: "",
      to: "",
      days: "",
      reason: "",
      status: "New",
    });
    setIsEditing(false);
    setCurrentEditIndex(null);
  };

  const openEditModal = (index) => {
    setFormData(leaves[index]);
    setIsEditing(true);
    setCurrentEditIndex(index);
    setShowModal(true);
  };

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      leave.leaveType
        .toLowerCase()
        .includes(searchFilters.leaveType.toLowerCase()) &&
      leave.status.toLowerCase().includes(searchFilters.status.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Dashboard</h1>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          + Add Leave
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Total Employees on Leave</h2>
          <p className="text-2xl">{leaves.length}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Planned Leaves</h2>
          <p className="text-2xl">
            {leaves.filter((leave) => leave.status === "Approved").length}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Pending Requests</h2>
          <p className="text-2xl">
            {leaves.filter((leave) => leave.status === "Pending").length}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold">Unplanned Leaves</h2>
          <p className="text-2xl">0</p> {/* Adjust as needed */}
        </div>
      </div>

      <div className="flex mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by Employee Name"
          value={searchFilters.name}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <input
          type="text"
          name="leaveType"
          placeholder="Search by Leave Type"
          value={searchFilters.leaveType}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <select
          name="status"
          value={searchFilters.status}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Status --</option>
          <option value="New">New</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      <table className="min-w-full bg-gray-100 rounded">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Leave Type</th>
            <th className="p-4 text-left">From</th>
            <th className="p-4 text-left">To</th>
            <th className="p-4 text-left">Days</th>
            <th className="p-4 text-left">Reason</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{leave.name}</td>
              <td className="p-4">{leave.leaveType}</td>
              <td className="p-4">{leave.from}</td>
              <td className="p-4">{leave.to}</td>
              <td className="p-4">{leave.days}</td>
              <td className="p-4">{leave.reason}</td>
              <td className="p-4">{leave.status}</td>
              <td className="p-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openEditModal(index)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-2xl h-[80vh] relative flex flex-col mt-8">
      <h2 className="text-lg font-bold mb-4 text-blue-900">
        {isEditing ? "Edit Leave" : "Add Leave"}
      </h2>

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1">
        <form className="space-y-4" onSubmit={addLeave}>
          <div>
            <label className="block text-sm font-medium text-blue-900">
              Employee Name:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              Leave Type:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              name="leaveType"
              placeholder="Leave Type"
              value={formData.leaveType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              From Date:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="date"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              To Date:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="date"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              Total Days:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              name="days"
              placeholder="Total Days"
              value={formData.days}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              Reason:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              name="reason"
              placeholder="Reason for Leave"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900">
              Status:
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="New">New</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <div className="bg-white p-4 flex justify-end gap-4 border-t border-gray-300 mt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white p-2 rounded-lg"
            >
              {isEditing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default LeaveDashboard;
