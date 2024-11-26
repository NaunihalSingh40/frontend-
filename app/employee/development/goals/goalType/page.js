"use client";

import { useState } from 'react';

const GoalTable = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      type: "Invoice Goal",
      description: "Lorem ipsum dollar",
      status: "Active",
    },
    {
      id: 2,
      type: "Event Goal",
      description: "Lorem ipsum dollar",
      status: "Inactive",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ type: '', description: '', status: 'Active' });
  const [errorMessage, setErrorMessage] = useState('');

  const openNewGoalModal = () => {
    setNewGoalModal(true);
  };

  const closeNewGoalModal = () => {
    setNewGoalModal(false);
    setErrorMessage('');
  };

  const handleNewGoalChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const addNewGoal = () => {
    // Validate if all fields are filled
    if (newGoal.type.trim() === '' || newGoal.description.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    setGoals([...goals, { id: goals.length + 1, ...newGoal }]);
    setNewGoalModal(false);
    setNewGoal({ type: '', description: '', status: 'Active' });
    setErrorMessage('');
  };

  const filteredGoals = goals.filter((goal) => {
    const matchesQuery = goal.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus ? goal.status === selectedStatus : true;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Goals List</h1>
        <button
          onClick={openNewGoalModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Goal
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
              <th className="p-3">Type</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-blue-900">
            {filteredGoals.map((goal) => (
              <tr key={goal.id} className="border-b border-gray-300">
                <td className="p-3">{goal.id}</td>
                <td className="p-3">{goal.type}</td>
                <td className="p-3">{goal.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${goal.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {goal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new goal */}
      {newGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[52vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">Add New Goal</h2>
            <form className="space-y-4 grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Type:</label>
                <input
                  type="text"
                  name="type"
                  value={newGoal.type}
                  onChange={handleNewGoalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newGoal.description}
                  onChange={handleNewGoalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status:</label>
                <select
                  name="status"
                  value={newGoal.status}
                  onChange={handleNewGoalChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeNewGoalModal}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addNewGoal}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTable;
