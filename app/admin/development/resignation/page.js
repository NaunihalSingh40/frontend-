"use client"

import { useState } from "react";
import Image from "next/image";

export default function Resignations() {
  const [resignations, setResignations] = useState([
    {
      id: 1,
      name: "John Doe",
      department: "Web Development",
      reason: "Lorem ipsum dolor",
      noticeDate: "28 Feb 2019",
      resignationDate: "28 Feb 2019",
      imageUrl: "/admin/user.jpeg",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Design",
      reason: "Family reasons",
      noticeDate: "12 Mar 2020",
      resignationDate: "12 Apr 2020",
      imageUrl: "/admin/user.jpeg",
    },
    {
      id: 3,
      name: "Sam Wilson",
      department: "Marketing",
      reason: "New opportunity",
      noticeDate: "05 Jan 2021",
      resignationDate: "05 Feb 2021",
      imageUrl: "/admin/user.jpeg",
    },
    {
      id: 4,
      name: "David Lee",
      department: "HR",
      reason: "Relocation",
      noticeDate: "20 Jul 2022",
      resignationDate: "20 Aug 2022",
      imageUrl: "/admin/user.jpeg",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResignation, setNewResignation] = useState({
    name: "",
    department: "",
    reason: "",
    noticeDate: "",
    resignationDate: "",
    imageUrl: "",
  });

  const handleAddResignation = () => {
    setResignations([
      ...resignations,
      { id: resignations.length + 1, ...newResignation },
    ]);
    setIsModalOpen(false);
    setNewResignation({
      name: "",
      department: "",
      reason: "",
      noticeDate: "",
      resignationDate: "",
      imageUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-blue-900 text-2xl font-bold">Resignation List</h1>
        <button
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add Resignation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-blue-900 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Resigning Employee</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Notice Date</th>
              <th className="py-2 px-4">Resignation Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {resignations.map((resignation) => (
              <tr key={resignation.id}>
                <td className="py-2 px-4">{resignation.id}</td>
                <td className="py-2 px-4 flex items-center">
                  <Image
                    className="w-8 h-8 rounded-full mr-2"
                    src={resignation.imageUrl}
                    alt={resignation.name}
                    width={32} // Equivalent to w-8 (8 * 4px in Tailwind)
                    height={32} // Equivalent to h-8 (8 * 4px in Tailwind)
                  />
                  {resignation.name}
                </td>
                <td className="py-2 px-4">{resignation.department}</td>
                <td className="py-2 px-4">{resignation.reason}</td>
                <td className="py-2 px-4">{resignation.noticeDate}</td>
                <td className="py-2 px-4">{resignation.resignationDate}</td>
                <td className="py-2 px-4">
                  <button className="text-blue-900">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding resignation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Add Resignation
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Employee Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={newResignation.name}
                onChange={(e) =>
                  setNewResignation({ ...newResignation, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full p-2 border border-gray-300 rounded"
                value={newResignation.department}
                onChange={(e) =>
                  setNewResignation({
                    ...newResignation,
                    department: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Reason"
                className="w-full p-2 border border-gray-300 rounded"
                value={newResignation.reason}
                onChange={(e) =>
                  setNewResignation({
                    ...newResignation,
                    reason: e.target.value,
                  })
                }
              />
              <input
                type="date"
                placeholder="Notice Date"
                className="w-full p-2 border border-gray-300 rounded"
                value={newResignation.noticeDate}
                onChange={(e) =>
                  setNewResignation({
                    ...newResignation,
                    noticeDate: e.target.value,
                  })
                }
              />
              <input
                type="date"
                placeholder="Resignation Date"
                className="w-full p-2 border border-gray-300 rounded"
                value={newResignation.resignationDate}
                onChange={(e) =>
                  setNewResignation({
                    ...newResignation,
                    resignationDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                onClick={handleAddResignation}
              >
                Add Resignation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
