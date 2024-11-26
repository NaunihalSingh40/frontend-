'use client';

import { useState } from 'react';

const sampleData = [
  {
    name: 'John Doe',
    attendance: {
      '1': [true, true, true, true, true, false, true, false, false, false, true, false, true, false, false, true, true, true, false, true, true, true, true, true, false, true, false, false, true, false],
      '2': [true, true, false, true, false, true, true, true, false, true, true, false, false, true, true, true, false, true, true, true, false, false, true, true, true, false, true, false, true, false],
      // Add more months if needed
    },
  },
  {
    name: 'Richard Miles',
    attendance: {
      '1': [true, true, true, true, true, true, true, false, false, false, true, false, true, false, false, true, true, true, false, true, true, true, true, true, false, true, false, false, true, false],
      '2': [false, true, true, true, true, false, true, true, true, false, true, true, false, true, true, false, true, false, true, true, true, true, false, true, true, false, false, true, false, true],
    },
  },
  // Add more employees as needed
];

const months = [
  { value: '1', name: 'January' },
  { value: '2', name: 'February' },
  { value: '3', name: 'March' },
  { value: '4', name: 'April' },
  { value: '5', name: 'May' },
  { value: '6', name: 'June' },
  { value: '7', name: 'July' },
  { value: '8', name: 'August' },
  { value: '9', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' },
];

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('1'); // Default to January

  const filteredData = sampleData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <input
          type="text"
          placeholder="Search Employee Name"
          className="border border-gray-300 rounded-lg p-3 mr-4 w-full md:w-1/3 mb-4 md:mb-0 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 mb-4 md:mb-0 shadow-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 text-white p-3 rounded-lg w-full md:w-1/3 shadow-md hover:bg-blue-600 transition-colors duration-200">
          Search
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 border">Employee</th>
              {Array.from({ length: 30 }, (_, i) => (
                <th key={i} className="py-3 px-4 border text-center">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr key={index} className="text-blue-900 hover:bg-blue-100 transition-colors duration-200">
                <td className="py-3 px-4 border font-medium">{employee.name}</td>
                {employee.attendance[selectedMonth].map((attended, i) => (
                  <td key={i} className={`py-3 px-4 border text-center ${attended ? 'text-green-500' : 'text-red-500'}`}>
                    {attended ? '✔️' : '❌'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
