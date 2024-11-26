"use client";
import { useState } from "react";

export default function Goals() {
  const [data, setData] = useState([
    {
      goalType: "Fitness",
      subject: "Weight Loss",
      targetAchievement: "10kg",
      startDate: "2024-01-01",
      endDate: "2024-03-01",
      description: "Lose 10kg in 3 months",
      status: "Active",
      progress: "50%",
    },
    {
      goalType: "Career",
      subject: "Skill Development",
      targetAchievement: "Complete Course",
      startDate: "2024-02-01",
      endDate: "2024-06-01",
      description: "Complete the online skill development course",
      status: "Inactive",
      progress: "20%",
    },
    {
      goalType: "Personal",
      subject: "Read Books",
      targetAchievement: "Read 12 Books",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      description: "Read 12 books throughout the year",
      status: "Active",
      progress: "30%",
    },
    {
      goalType: "Health",
      subject: "Meditation",
      targetAchievement: "30 Days Challenge",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      description: "Complete a 30-day meditation challenge",
      status: "Active",
      progress: "70%",
    },
    {
      goalType: "Finance",
      subject: "Savings Plan",
      targetAchievement: "$5000",
      startDate: "2024-04-01",
      endDate: "2024-12-31",
      description: "Save $5000 by the end of the year",
      status: "Inactive",
      progress: "10%",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [progressModal, setProgressModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    goalType: "",
    subject: "",
    targetAchievement: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "Active",
    progress: "0%",
  });

  const openProgressModal = (goal) => {
    setCurrentGoal(goal);
    setProgressModal(true);
  };

  const openAddGoalModal = () => {
    setIsModalOpen(true);
  };

  const closeAddGoalModal = () => {
    setIsModalOpen(false);
  };

  const validateGoal = () => {
    return Object.values(newGoal).every(field => field.trim() !== "");
  };

  const handleAddGoal = () => {
    if (validateGoal()) {
      setData([...data, newGoal]);
      setNewGoal({
        goalType: "",
        subject: "",
        targetAchievement: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "Active",
        progress: "0%",
      });
      closeAddGoalModal();
    } else {
      alert("Please fill out all fields.");
    }
  };

  const filteredGoals = data.filter((goal) => {
    const matchesQuery = goal.goalType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         goal.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus ? goal.status === selectedStatus : true;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Goals List</h1>
        <button
          onClick={openAddGoalModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Goal
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search Goals"
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
              <th className="p-3">Goal Type</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Target Achievement</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Progress</th>
            </tr>
          </thead>
          <tbody className="text-blue-900">
            {filteredGoals.map((goal, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{goal.goalType}</td>
                <td className="p-3">{goal.subject}</td>
                <td className="p-3 text-center">{goal.targetAchievement}</td>
                <td className="p-3">{goal.startDate}</td>
                <td className="p-3">{goal.endDate}</td>
                <td className="p-3">{goal.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${goal.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {goal.status}
                  </span>
                </td>
                <td className="p-3">{goal.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for updating progress */}
      {progressModal && currentGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[68vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">Update Progress for {currentGoal.goalType}</h2>
            <p>Subject: {currentGoal.subject}</p>
            <p>Target Achievement: {currentGoal.targetAchievement}</p>
            <p>Description: {currentGoal.description}</p>
            <p>Progress: {currentGoal.progress}</p>
            <button
              onClick={() => setProgressModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding a new goal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[68vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">Add New Goal</h2>
            <form className="space-y-4 grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Goal Type:</label>
                <input
                  type="text"
                  placeholder="Goal Type"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.goalType}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, goalType: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.subject}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Achievement:</label>
                <input
                  type="text"
                  placeholder="Target Achievement"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.targetAchievement}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetAchievement: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date:</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.startDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date:</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.endDate}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, endDate: e.target.value })
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
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status:</label>
                <select
                  value={newGoal.status}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, status: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Progress:</label>
                <input
                  type="text"
                  placeholder="Progress"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newGoal.progress}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, progress: e.target.value })
                  }
                  required
                />
              </div>
            </form>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={closeAddGoalModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleAddGoal}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
