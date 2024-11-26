"use client";
import React, { useState } from "react";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: "",
    department: "",
    designation: "",
    employmentType: "",
    employeeStatus: "Active",
    dateOfJoining: "",
    baseSalary: "",
    bonuses: 0,
    allowances: 0,
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    panNumber: "",
    taxSlabs: "",
    permanentAddress: "",
    currentAddress: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    alternateEmail: "",
  });

  const [employees, setEmployees] = useState([
    {
      id: "FT-0007",
      name: "Bernardo Galaviz",
      email: "bernardogalaviz@example.com",
      role: "Web Developer",
      joinDate: "1 Jan 2014",
      salary: "$38400",
    },
    {
      id: "FT-0009",
      name: "Jeffery Lalor",
      email: "jefferylalor@example.com",
      role: "Team Leader",
      joinDate: "1 Jan 2013",
      salary: "$73550",
    },
    // Add more employees here
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([
      ...employees,
      {
        ...formData,
        id: `FT-${employees.length + 1}`, // Fixed ID generation
        name: `${formData.firstName} ${formData.lastName}`,
        joinDate: formData.dateOfJoining,
        salary: `$${
          (parseInt(formData.baseSalary) || 0) +
          (parseInt(formData.bonuses) || 0) +
          (parseInt(formData.allowances) || 0)
        }`,
      },
    ]);
    setIsFormVisible(false);
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      profilePicture: "",
      department: "",
      designation: "",
      employmentType: "",
      employeeStatus: "Active",
      dateOfJoining: "",
      baseSalary: "",
      bonuses: 0,
      allowances: 0,
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      panNumber: "",
      taxSlabs: "",
      permanentAddress: "",
      currentAddress: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      alternateEmail: "",
    });
  };

  const handleEdit = (employee) => {
    setFormData({
      ...employee,
      firstName: employee.name.split(" ")[0],
      lastName: employee.name.split(" ")[1],
    });
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearchTerm =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = role ? employee.role === role : true;
    return matchesSearchTerm && matchesRole;
  });

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Employee Name/Id"
          className="bg-gray-100 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-gray-100 p-2 border border-gray-300 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">--select--</option>
          <option value="Web Developer">Web Developer</option>
          <option value="Team Leader">Team Leader</option>
          {/* Add more roles as needed */}
        </select>
        <select
          className="bg-gray-100 p-2 border border-gray-300 rounded"
          value={leaveStatus}
          onChange={(e) => setLeaveStatus(e.target.value)}
        >
          <option value="">--select--</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          {/* Add more leave statuses as needed */}
        </select>
        <input
          type="date"
          className="bg-gray-100 p-2 border border-gray-300 rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="bg-gray-100 p-2 border border-gray-300 rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setIsFormVisible(true)}
        >
          + Add Salary
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4"></div>

      <table className="w-full text-left bg-gray-100 border border-gray-300">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Employee ID</th>
            <th className="p-3">Email</th>
            <th className="p-3">Join Date</th>
            <th className="p-3">Role</th>
            <th className="p-3">Salary</th>
            <th className="p-3">Payslip</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-300">
              <td className="p-3">{employee.name}</td>
              <td className="p-3">{employee.id}</td>
              <td className="p-3">{employee.email}</td>
              <td className="p-3">{employee.joinDate}</td>
              <td className="p-3">{employee.role}</td>
              <td className="p-3">{employee.salary}</td>
              <td className="p-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  onClick={() =>
                    alert(`Generating payslip for employee ID: ${employee.id}`)
                  }
                >
                  Generate Slip
                </button>
              </td>
              <td className="p-3">
                <button
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-700 ml-2"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4">Add/Edit Employee</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employee ID:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Employee ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender:
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Base Salary:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  name="baseSalary"
                  value={formData.baseSalary}
                  onChange={handleInputChange}
                  placeholder="Base Salary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bonuses:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  name="bonuses"
                  value={formData.bonuses}
                  onChange={handleInputChange}
                  placeholder="Bonuses"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Allowances:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="number"
                  name="allowances"
                  value={formData.allowances}
                  onChange={handleInputChange}
                  placeholder="Allowances"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Joining:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Designation:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Designation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employment Type:
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  placeholder="Employment Type"
                />
              </div>
              <br></br>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 col-span-1"
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-4 col-span-1"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
