"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/employee/addEmployee', employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const EmployeePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: null,
    username: '',
    password: '',
    department: '',
    designation: '',
    employmentType: '',
    employeeStatus: 'Active',
    dateOfJoining: '',
    baseSalary: '',
    bonuses: 0,
    allowances: 0,
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    panNumber: '',
    taxSlabs: '',
    permanentAddress: '',
    currentAddress: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhoneNumber: '',
    alternateNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Only store the file itself
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset any previous error messages
  
    const employeeData = new FormData();
    
    // Append all form fields to FormData
    employeeData.append('employeeId', formData.employeeId);
    employeeData.append('firstName', formData.firstName);
    employeeData.append('lastName', formData.lastName);
    employeeData.append('middleName', formData.middleName);
    employeeData.append('email', formData.email);
    employeeData.append('phoneNumber', formData.phoneNumber);
    employeeData.append('dateOfBirth', formData.dateOfBirth);
    employeeData.append('gender', formData.gender);
    
    // If there is a profile picture, append it
    if (formData.profilePicture) {
      employeeData.append('profilePicture', formData.profilePicture);
    }
  
    employeeData.append('username', formData.username);
    employeeData.append('password', formData.password);
    employeeData.append('department', formData.department);
    employeeData.append('designation', formData.designation);
    employeeData.append('employmentType', formData.employmentType);
    employeeData.append('employeeStatus', formData.employeeStatus);
    employeeData.append('dateOfJoining', formData.dateOfJoining);
    employeeData.append('baseSalary', formData.baseSalary);
    employeeData.append('bonuses', formData.bonuses);
    employeeData.append('allowances', formData.allowances);
    employeeData.append('accountNumber', formData.accountNumber);
    employeeData.append('bankName', formData.bankName);
    employeeData.append('ifscCode', formData.ifscCode);
    employeeData.append('panNumber', formData.panNumber);
    employeeData.append('taxSlabs', formData.taxSlabs);
    
    employeeData.append('permanentAddress', formData.permanentAddress);
    employeeData.append('currentAddress', formData.currentAddress);
    employeeData.append('emergencyName', formData.emergencyName);
    employeeData.append('emergencyRelationship', formData.emergencyRelationship);
    employeeData.append('emergencyPhoneNumber', formData.emergencyPhoneNumber);
    employeeData.append('alternateNumber', formData.alternateNumber);
  
    try {
      // Directly making the API call to add the employee
      const response = await axios.post('http://localhost:8080/api/employee/addEmployee', employeeData);
  
      if (response.data) {
        // Handle successful response
        alert('Employee successfully added!');
  
        // Reset the form fields after successful submission
        setFormData({
          employeeId: '',
          firstName: '',
          lastName: '',
          middleName: '',
          email: '',
          phoneNumber: '',
          dateOfBirth: '',
          gender: '',
          profilePicture: null,
          username: '',
          password: '',
          department: '',
          designation: '',
          employmentType: '',
          employeeStatus: 'Active',
          dateOfJoining: '',
          baseSalary: '',
          bonuses: 0,
          allowances: 0,
          accountNumber: '',
          bankName: '',
          ifscCode: '',
          panNumber: '',
          taxSlabs: '',
          permanentAddress: '',
          currentAddress: '',
          emergencyName: '',
          emergencyRelationship: '',
          emergencyPhoneNumber: '',
          alternateNumber: '',
        });
      }
    } catch (error) {
      console.error('Error during employee save:', error);
  
      // Handle different error types
      if (error.response) {
        // Server responded with a status other than 2xx
        const serverError = error.response.data.message || 'Something went wrong with the server!';
        setErrorMessage(serverError);
      } else if (error.request) {
        // No response was received from the server
        setErrorMessage('Network error: Please check your internet connection.');
      } else {
        // Something went wrong in setting up the request
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const [employees, setEmployees] = useState([
    {
      id: "E001",
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      dateOfJoining: "2023-01-15",
      role: "Developer",
    },
    {
      id: "E002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "0987654321",
      dateOfJoining: "2022-12-10",
      role: "Designer",
    },
    // Add more dummy employees here
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const roles = ["Developer", "Designer", "Manager", "Analyst"];
  const genders = ["Male", "Female", "Other"];
  const employmentTypes = ["Full-time", "Part-time", "Contract"];
  const statuses = ["Active", "Inactive"];


  const handleEdit = (employee) => {
    // Implement the edit functionality if needed
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="p-8 min-h-screen bg-white ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">
          Employee Management
        </h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-blue-900 text-white p-2 rounded-lg"
        >
          Add Employee
        </button>
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 ml-64 mt-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">
              Add Employee
            </h2>
            <div className="overflow-y-auto flex-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Employee ID:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Employee ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    First Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Last Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Middle Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Middle Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Email:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Phone Number:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Date of Birth:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Gender:
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="" className="text-blue-900">
                      Select Gender
                    </option>
                    {genders.map((gender) => (
                      <option
                        key={gender}
                        value={gender}
                        className="text-blue-900"
                      >
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Department:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Department"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Designation:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Designation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Employment Type:
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                  >
                    <option value="" className="text-blue-900">
                      Select Employment Type
                    </option>
                    {employmentTypes.map((type) => (
                      <option key={type} value={type} className="text-blue-900">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Employee Status:
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    name="employeeStatus"
                    value={formData.employeeStatus}
                    onChange={handleInputChange}
                  >
                    {statuses.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="text-blue-900"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Date of Joining:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Base Salary:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="number"
                    name="baseSalary"
                    value={formData.baseSalary}
                    onChange={handleInputChange}
                    placeholder="Base Salary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Bonuses:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="number"
                    name="bonuses"
                    value={formData.bonuses}
                    onChange={handleInputChange}
                    placeholder="Bonuses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Allowances:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleInputChange}
                    placeholder="Allowances"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Account Number:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Account Number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Bank Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="Bank Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    IFSC Code:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    placeholder="IFSC Code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    PAN Number:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    placeholder="PAN Number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Permanent Address:
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    placeholder="Permanent Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Current Address:
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    placeholder="Current Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Emergency Contact Name:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    placeholder="Emergency Contact Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Emergency Contact Relationship:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    placeholder="Emergency Contact Relationship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Emergency Contact Phone:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="text"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    placeholder="Emergency Contact Phone"
                  />
                </div>
                {/* Add remaining form fields here in the same format */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Alternate Email:
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded text-blue-900"
                    type="email"
                    name="alternateEmail"
                    value={formData.alternateEmail}
                    onChange={handleInputChange}
                    placeholder="Alternate Email"
                  />
                </div>
              </form>
            </div>
            <div className="bg-white p-4 flex justify-end gap-4 border-t border-gray-300 mt-4">
              <button
                type="submit"
                className="bg-blue-900 text-white p-2 rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-red-600 text-white p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" p-2 border border-gray-300 rounded text-blue-900"
          />
          <div className="">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-blue-900 text-white p-2 rounded-lg "
            >
              Filter by Role
            </button>
            {showDropdown && (
              <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
                {roles.map((role) => (
                  <div
                    key={role}
                    onClick={() => {
                      setSelectedRole(role);
                      setShowDropdown(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-blue-900"
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <table className="min-w-full bg-gray-100 rounded-lg shadow-md border border-gray-300 overflow-hidden">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-4 text-left">Profile</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter(
                (emp) =>
                  emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  emp.id.toString().includes(searchTerm)
              )
              .filter((emp) => !selectedRole || emp.role === selectedRole)
              .map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  <td className="p-4 text-center">
                    <Image
                      src={
                        emp.profilePicture || '/admin/user.jpeg'
                      }
                      alt={emp.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4 text-blue-900 font-semibold">{emp.id}</td>
                  <td className="p-4 text-blue-900 font-semibold">
                    {emp.name}
                  </td>
                  <td className="p-4 text-blue-900">{emp.email}</td>
                  <td className="p-4 text-blue-900">{emp.role}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(emp)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(emp.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePage;
