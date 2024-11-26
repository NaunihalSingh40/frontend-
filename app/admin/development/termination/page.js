"use client";

import { useState } from 'react';

const TerminationTable = () => {
  // Initial state with sample data
  const [records, setRecords] = useState([
    { id: 1, name: 'John Doe', department: 'Web Development', terminationType: 'Misconduct', terminationDate: '28 Feb 2019', reason: 'Lorem Ipsum Dollar', noticeDate: '28 Feb 2019' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', terminationType: 'Performance', terminationDate: '15 Mar 2020', reason: 'Lorem Ipsum Dollar', noticeDate: '15 Mar 2020' },
    { id: 3, name: 'Mike Brown', department: 'Sales', terminationType: 'Restructuring', terminationDate: '02 Jan 2021', reason: 'Lorem Ipsum Dollar', noticeDate: '01 Jan 2021' },
  ]);

  // State for managing the new record form
  const [newRecord, setNewRecord] = useState({
    name: '',
    department: '',
    terminationType: '',
    terminationDate: '',
    reason: '',
    noticeDate: '',
  });

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle new record input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to add new record
  const handleAddTermination = () => {
    // Check if all fields are filled
    if (Object.values(newRecord).some(value => !value)) {
      alert('Please fill out all fields.');
      return;
    }

    const newEntry = {
      id: records.length + 1,
      ...newRecord,
      terminationDate: new Date(newRecord.terminationDate).toLocaleDateString(),
      noticeDate: new Date(newRecord.noticeDate).toLocaleDateString(),
    };
    setRecords([...records, newEntry]);
    setIsModalOpen(false); // Close the modal
    setNewRecord({ name: '', department: '', terminationType: '', terminationDate: '', reason: '', noticeDate: '' }); // Reset form
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Terminations</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Termination
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-100 border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Terminated Employee</th>
              <th className="p-3">Department</th>
              <th className="p-3">Termination Type</th>
              <th className="p-3">Termination Date</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Notice Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-gray-300 text-blue-900">
                <td className="p-3">{record.id}</td>
                <td className="p-3">{record.name}</td>
                <td className="p-3">{record.department}</td>
                <td className="p-3">{record.terminationType}</td>
                <td className="p-3">{record.terminationDate}</td>
                <td className="p-3">{record.reason}</td>
                <td className="p-3">{record.noticeDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new termination */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mt-10">
            <h2 className="text-lg font-bold mb-4">Add New Termination</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddTermination(); }}>
              {['name', 'department', 'terminationType', 'terminationDate', 'reason', 'noticeDate'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
                  <input
                    type={field.includes('Date') ? 'date' : 'text'}
                    name={field}
                    value={newRecord[field]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminationTable;
