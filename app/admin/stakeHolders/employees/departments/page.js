'use client'
import { useState } from 'react';

const departmentsData = [
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'Application Development' },
  { id: 3, name: 'IT Management' },
  { id: 4, name: 'Accounts Management' },
  { id: 5, name: 'Support Management' },
  { id: 6, name: 'Marketing' },
];

export default function Departments() {
  const [departments, setDepartments] = useState(departmentsData);
  const [sortOrder, setSortOrder] = useState(true); // true for asc, false for desc
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const departmentsPerPage = 5;

  const sortByColumn = (column) => {
    const sortedDepartments = [...departments].sort((a, b) => {
      if (a[column] > b[column]) return sortOrder ? 1 : -1;
      if (a[column] < b[column]) return sortOrder ? -1 : 1;
      return 0;
    });
    setDepartments(sortedDepartments);
    setSortOrder(!sortOrder);
  };

  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddOrUpdate = () => {
    if (isEditing) {
      setDepartments(departments.map(dept => dept.id === currentDept.id ? formData : dept));
    } else {
      setDepartments([...departments, { ...formData, id: departments.length + 1 }]);
    }
    resetForm();
  };

  const handleEdit = (dept) => {
    setCurrentDept(dept);
    setFormData(dept);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  const resetForm = () => {
    setFormData({ id: '', name: '' });
    setCurrentDept(null);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Department Management</h1>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          + Add Department
        </button>
      </div>
      
      <table className="min-w-full bg-gray-100 rounded-lg shadow-md border border-gray-300 overflow-hidden">
  <thead>
    <tr className="bg-blue-900 text-white">
      <th
        className="p-4 text-left cursor-pointer"
        onClick={() => sortByColumn('id')}
      >
        #
      </th>
      <th
        className="p-4 text-left cursor-pointer"
        onClick={() => sortByColumn('name')}
      >
        Department Name
      </th>
      <th className="p-4 text-left">Action</th>
    </tr>
  </thead>
  <tbody>
    {currentDepartments.map(dept => (
      <tr
        key={dept.id}
        className="border-b border-gray-300 hover:bg-gray-200 transition-colors"
      >
        <td className="p-4 text-blue-900 font-semibold">{dept.id}</td>
        <td className="p-4 text-blue-900 font-semibold">{dept.name}</td>
        <td className="p-4 flex space-x-2">
          <button
            className="text-blue-500 hover:text-blue-700 font-bold"
            onClick={() => handleEdit(dept)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-700 font-bold"
            onClick={() => handleDelete(dept.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={nextPage}
          disabled={currentDepartments.length < departmentsPerPage}
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Department' : 'Add Department'}</h2>
            <label className="block text-sm font-medium mb-1">Department Name:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="text"
              name="name"
              placeholder="Department Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 mr-2"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddOrUpdate}
              >
                {isEditing ? 'Update Department' : 'Add Department'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
