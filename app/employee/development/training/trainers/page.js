"use client";
import { useState } from "react";
import Image from "next/image";

export default function Employees() {
  // Sample data
  const initialEmployees = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/admin/user.jpeg",
      contactNumber: "9876543210",
      email: "johndoe@example.com",
      description: "Lorem ipsum dollar",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Mike Litorus",
      avatar: "/admin/user.jpeg",
      contactNumber: "9876543120",
      email: "mikelitorus@example.com",
      description: "Lorem ipsum dollar",
      status: "Active",
    },
    // Add more sample data if needed
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    avatar: "",
    contactNumber: "",
    email: "",
    description: "",
    status: "Inactive",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, status: newStatus } : employee
      )
    );
  };

  const handleAddTrainer = () => {
    // Validate form
    if (
      !newTrainer.name ||
      !newTrainer.avatar ||
      !newTrainer.contactNumber ||
      !newTrainer.email ||
      !newTrainer.description
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setEmployees([
      ...employees,
      { id: employees.length + 1, ...newTrainer },
    ]);
    setNewTrainer({
      name: "",
      avatar: "",
      contactNumber: "",
      email: "",
      description: "",
      status: "Inactive",
    });
    setErrorMessage("");
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex flex-col mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trainers</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Trainer
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          className="w-80 p-2 border border-gray-400 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-100 border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Contact Number</th>
              <th className="p-3">Email</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                className="border-b border-gray-300 text-blue-900"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center space-x-2">
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{employee.name}</span>
                </td>
                <td className="p-3">{employee.contactNumber}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3">{employee.description}</td>
                <td className="p-3">
                  <select
                    value={employee.status}
                    onChange={(e) =>
                      handleStatusChange(employee.id, e.target.value)
                    }
                    className={`bg-gray-100 border border-gray-300 p-2 rounded ${
                      employee.status === "Active"
                        ? "text-green-400 bg-green-100"
                        : "text-red-400 bg-red-100"
                    }`}
                  >
                    <option
                      value="Active"
                      className="bg-green-100 text-green-600"
                    >
                      Active
                    </option>
                    <option
                      value="Inactive"
                      className="bg-red-100 text-red-600"
                    >
                      Inactive
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[68vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">Add New Trainer</h2>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <form className="space-y-4 grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTrainer.name}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar URL:</label>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTrainer.avatar}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, avatar: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number:</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTrainer.contactNumber}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, contactNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTrainer.email}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description:</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTrainer.description}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, description: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status:</label>
                <select
                  value={newTrainer.status}
                  onChange={(e) =>
                    setNewTrainer({ ...newTrainer, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleAddTrainer}
              >
                Add Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
