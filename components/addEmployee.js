'use client'
import { useState } from 'react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    profilePicture: '',
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
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    alternateEmail: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send formData to backend
    console.log(formData);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-900">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <select
            name="gender"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department ID"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <select
            name="employmentType"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Employment Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
          <select
            name="employeeStatus"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            defaultValue="Active"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
            <option value="Terminated">Terminated</option>
          </select>
          <input
            type="date"
            name="dateOfJoining"
            placeholder="Date of Joining"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="baseSalary"
            placeholder="Base Salary"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="bonuses"
            placeholder="Bonuses"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="allowances"
            placeholder="Allowances"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="accountNumber"
            placeholder="Bank Account Number"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="ifscCode"
            placeholder="IFSC Code"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="panNumber"
            placeholder="PAN Number"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="taxSlabs"
            placeholder="Tax Slabs"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="permanentAddress"
            placeholder="Permanent Address"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="currentAddress"
            placeholder="Current Address"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="emergencyContactRelationship"
            placeholder="Emergency Contact Relationship"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="alternateEmail"
            placeholder="Alternate Email"
            className="border p-2 rounded-lg"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-900 text-white p-2 rounded-lg mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
