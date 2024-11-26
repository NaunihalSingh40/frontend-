"use client";

import { useState } from "react";
import Image from "next/image";

export default function Promotions() {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: "John Doe",
      department: "Web Development",
      from: "Web Developer",
      to: "Sr Web Developer",
      promotionDate: "28 Feb 2019",
      imageUrl: "/admin/user.jpeg",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Design",
      from: "Designer",
      to: "Lead Designer",
      promotionDate: "12 Mar 2020",
      imageUrl: "/admin/user.jpeg",
    },
    {
      id: 3,
      name: "Sam Wilson",
      department: "Marketing",
      from: "Marketing Specialist",
      to: "Marketing Manager",
      promotionDate: "05 Jan 2021",
      imageUrl: "/admin/user.jpeg",
    },
    // More sample data can be added here
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    department: "",
    from: "",
    to: "",
    promotionDate: "",
    imageUrl: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddPromotion = () => {
    if (
      !newPromotion.name ||
      !newPromotion.department ||
      !newPromotion.from ||
      !newPromotion.to ||
      !newPromotion.promotionDate
    ) {
      // Set error message instead of alert
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setPromotions([
      ...promotions,
      { id: promotions.length + 1, ...newPromotion },
    ]);
    setIsModalOpen(false);
    setNewPromotion({
      name: "",
      department: "",
      from: "",
      to: "",
      promotionDate: "",
      imageUrl: "",
    });
    setErrorMessage("");
  };

  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Promotion List</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Employee name"
          className="flex-1 p-2 border border-gray-300 rounded max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Promotion
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-blue-900 rounded-lg shadow-lg border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Promoted Employee</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Promotion Designation From</th>
              <th className="py-2 px-4">Promotion Designation To</th>
              <th className="py-2 px-4">Promotion Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promotion) => (
              <tr
                key={promotion.id}
                className="hover:bg-gray-100 text-blue-900"
              >
                <td className="py-2 px-4">{promotion.id}</td>
                <td className="py-2 px-4 flex items-center">
                  <Image
                    className="w-8 h-8 rounded-full mr-2"
                    src={promotion.imageUrl}
                    alt={promotion.name}
                    width={32}
                    height={32}
                  />
                  {promotion.name}
                </td>
                <td className="py-2 px-4">{promotion.department}</td>
                <td className="py-2 px-4">{promotion.from}</td>
                <td className="py-2 px-4">{promotion.to}</td>
                <td className="py-2 px-4">{promotion.promotionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding promotion */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Add Promotion
            </h2>
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Employee Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPromotion.name}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPromotion.department}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    department: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Promotion Designation From"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPromotion.from}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    from: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Promotion Designation To"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPromotion.to}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    to: e.target.value,
                  })
                }
                required
              />
              <input
                type="date"
                placeholder="Promotion Date"
                className="w-full p-2 border border-gray-300 rounded text-gray-400"
                value={newPromotion.promotionDate}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    promotionDate: e.target.value,
                  })
                }
                required
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
                onClick={handleAddPromotion}
              >
                Add Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
