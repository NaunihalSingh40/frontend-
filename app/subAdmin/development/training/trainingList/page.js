"use client";
import { useState } from "react";
import Image from "next/image";

export default function Trainings() {
  // Sample data
  const initialTrainings = [
    {
      id: 1,
      type: "Leadership Training",
      trainer: {
        name: "John Doe",
        avatar: "/admin/user.jpeg",
      },
      employees: [
        { avatar: "/admin/user.jpeg" },
        { avatar: "/admin/user.jpeg" },
        { avatar: "/admin/user.jpeg" },
      ],
      timeDuration: "3 hours",
      description: "Focus on leadership and team management.",
      cost: "$500",
      status: "Active",
    },
    {
      id: 2,
      type: "Technical Skills Workshop",
      trainer: {
        name: "Jane Smith",
        avatar: "/admin/user.jpeg",
      },
      employees: [
        { avatar: "/admin/user.jpeg" },
        { avatar: "/admin/user.jpeg" },
      ],
      timeDuration: "4 hours",
      description: "Workshop on advanced technical skills.",
      cost: "$600",
      status: "Inactive",
    },
  ];

  const [trainings, setTrainings] = useState(initialTrainings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({
    type: "",
    trainer: { name: "", avatar: "" },
    employees: [],
    timeDuration: "",
    description: "",
    cost: "",
    status: "Active",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id ? { ...training, status: newStatus } : training
      )
    );
  };

  const handleAddTraining = () => {
    // Validation
    if (
      !newTraining.type ||
      !newTraining.trainer.name ||
      !newTraining.timeDuration ||
      !newTraining.description ||
      !newTraining.cost
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setTrainings([...trainings, { id: trainings.length + 1, ...newTraining }]);
    setIsModalOpen(false);
    setNewTraining({
      type: "",
      trainer: { name: "", avatar: "" },
      employees: [],
      timeDuration: "",
      description: "",
      cost: "",
      status: "Active",
    });
    setErrorMessage("");
  };

  // Filtered trainings based on search and status
  const filteredTrainings = trainings.filter((training) => {
    const matchesQuery = training.type
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus
      ? training.status === selectedStatus
      : true;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Training List</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Training
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search Training"
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3 text-gray-400"
        >
          <option value="">-- Select Status --</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-100 border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Training Type</th>
              <th className="p-3">Trainer</th>
              <th className="p-3">Time Duration</th>
              <th className="p-3">Description</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-blue-900">
            {filteredTrainings.map((training, index) => (
              <tr key={training.id} className="border-b border-gray-300">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{training.type}</td>
                <td className="p-3 flex items-center space-x-2">
                  <Image
                    src={training.trainer.avatar}
                    alt={training.trainer.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{training.trainer.name}</span>
                </td>
                <td className="p-3">{training.timeDuration}</td>
                <td className="p-3">{training.description}</td>
                <td className="p-3">{training.cost}</td>
                <td className="p-3">
                  <select
                    value={training.status}
                    onChange={(e) =>
                      handleStatusChange(training.id, e.target.value)
                    }
                    className={`bg-gray-100 border border-gray-300 p-2 rounded ${
                      training.status === "Active"
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
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

      {/* Modal for adding new training */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[68vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">
              Add New Training
            </h2>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <form className="space-y-4 grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Training Type:
                </label>
                <input
                  type="text"
                  placeholder="Training Type"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.type}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, type: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Trainer Name:
                </label>
                <input
                  type="text"
                  placeholder="Trainer Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.trainer.name}
                  onChange={(e) =>
                    setNewTraining({
                      ...newTraining,
                      trainer: { ...newTraining.trainer, name: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Trainer Avatar URL:
                </label>
                <input
                  type="text"
                  placeholder="Trainer Avatar URL"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.trainer.avatar}
                  onChange={(e) =>
                    setNewTraining({
                      ...newTraining,
                      trainer: {
                        ...newTraining.trainer,
                        avatar: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employee Avatars (comma-separated):
                </label>
                <input
                  type="text"
                  placeholder="Employee Avatars"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.employees.map((e) => e.avatar).join(", ")}
                  onChange={(e) => {
                    const avatars = e.target.value
                      .split(",")
                      .map((url) => url.trim());
                    setNewTraining({
                      ...newTraining,
                      employees: avatars.map((avatar) => ({ avatar })),
                    });
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Time Duration:
                </label>
                <input
                  type="text"
                  placeholder="Time Duration"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.timeDuration}
                  onChange={(e) =>
                    setNewTraining({
                      ...newTraining,
                      timeDuration: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description:
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.description}
                  onChange={(e) =>
                    setNewTraining({
                      ...newTraining,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cost:</label>
                <input
                  type="text"
                  placeholder="Cost"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newTraining.cost}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, cost: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status:
                </label>
                <select
                  value={newTraining.status}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, status: e.target.value })
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
                onClick={handleAddTraining}
              >
                Add Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
