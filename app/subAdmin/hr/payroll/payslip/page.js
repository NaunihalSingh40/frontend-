"use client"

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";

const Payslip = () => {
  const [filter, setFilter] = useState("");
  const [formData, setFormData] = useState({
    employees: [
      {
        employeeId: "FT-0009",
        firstName: "John",
        lastName: "Doe",
        middleName: "",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        profilePicture: "",
        department: "Design",
        designation: "Web Designer",
        employmentType: "Full-time",
        employeeStatus: "Active",
        dateOfJoining: "2013-01-01",
        baseSalary: "6500",
        bonuses: 55,
        allowances: 55,
        accountNumber: "123456789012",
        bankName: "Bank of America",
        ifscCode: "BOA0001234",
        panNumber: "ABCDE1234F",
        taxSlabs: "0%",
        permanentAddress: "1234 Street, City, State, ZIP",
        currentAddress: "1234 Street, City, State, ZIP",
        emergencyContactName: "Jane Doe",
        emergencyContactRelationship: "Wife",
        emergencyContactPhone: "0987654321",
        alternateEmail: "john.alternate@example.com",
      },
      {
        employeeId: "FT-0010",
        firstName: "Jane",
        lastName: "Smith",
        middleName: "A.",
        email: "jane.smith@example.com",
        phoneNumber: "9876543210",
        dateOfBirth: "1985-05-15",
        gender: "Female",
        profilePicture: "",
        department: "Marketing",
        designation: "Marketing Manager",
        employmentType: "Part-time",
        employeeStatus: "Active",
        dateOfJoining: "2016-03-10",
        baseSalary: "7500",
        bonuses: 100,
        allowances: 75,
        accountNumber: "987654321098",
        bankName: "Chase Bank",
        ifscCode: "CHAS0005678",
        panNumber: "XYZAB5678C",
        taxSlabs: "10%",
        permanentAddress: "5678 Avenue, City, State, ZIP",
        currentAddress: "5678 Avenue, City, State, ZIP",
        emergencyContactName: "John Smith",
        emergencyContactRelationship: "Husband",
        emergencyContactPhone: "1234567890",
        alternateEmail: "jane.alternate@example.com",
      },
      // Add more sample employees as needed
    ],
  });

  const filteredEmployee = formData.employees.find(
    (employee) =>
      employee.employeeId.includes(filter) ||
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(filter.toLowerCase())
  );

  const generatePDF = () => {
    const input = document.getElementById("payslip-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`payslip_${filteredEmployee.employeeId}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="bg-[#1E3A8A] text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Payslip for Employee</h1>
        <input
          type="text"
          placeholder="Search by Employee ID or Name"
          className="mt-4 p-2 border rounded-lg w-80 text-[#1E3A8A]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {/* PDF Generation Button */}
        {filteredEmployee && (
          <button
            onClick={generatePDF}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 float-end"
          >
            Download Payslip as PDF
          </button>
        )}
      </div>

      {filteredEmployee ? (
        <div
          id="payslip-content"
          className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          {/* Company Logo */}
          <div className="flex gap-3 items-center mb-6">
            <h2 className="text-3xl font-bold text-[#1E3A8A]">
              Cogent Creators
            </h2>
            <Image
              src="/appPage/ll1_dark1.png"
              alt="Cogent Creators"
              height={48} // Adjust height as needed
              width={48} // Adjust width as needed
              className="h-12"
            />
          </div>

          <h2 className="text-2xl font-bold mb-4">Payslip</h2>

          <div className="mb-4 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-bold">Employee Details</h3>
            <p>
              <strong>Employee ID:</strong> {filteredEmployee.employeeId}
            </p>
            <p>
              <strong>Full Name:</strong> {filteredEmployee.firstName}{" "}
              {filteredEmployee.middleName} {filteredEmployee.lastName}
            </p>
            <p>
              <strong>Designation:</strong> {filteredEmployee.designation}
            </p>
            <p>
              <strong>Date of Joining:</strong> {filteredEmployee.dateOfJoining}
            </p>
          </div>

          <div className="mb-4 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-bold">Earnings</h3>
            <p>
              <strong>Base Salary:</strong> ${filteredEmployee.baseSalary}
            </p>
            <p>
              <strong>Bonuses:</strong> ${filteredEmployee.bonuses}
            </p>
            <p>
              <strong>Allowances:</strong> ${filteredEmployee.allowances}
            </p>
            <p>
              <strong>Total Earnings:</strong> $
              {parseInt(filteredEmployee.baseSalary) +
                parseInt(filteredEmployee.bonuses) +
                parseInt(filteredEmployee.allowances)}
            </p>
          </div>

          <div className="mb-4 border-b border-gray-300 pb-4">
            <h3 className="text-xl font-bold">Deductions</h3>
            <p>
              <strong>Tax Deducted at Source (TDS):</strong> $0
            </p>
            <p>
              <strong>Provident Fund:</strong> $0
            </p>
            <p>
              <strong>Loan:</strong> $300
            </p>
            <p>
              <strong>Total Deductions:</strong> $300
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Net Salary</h3>
            <p>
              <strong>Net Salary:</strong> $
              {parseInt(filteredEmployee.baseSalary) +
                parseInt(filteredEmployee.bonuses) +
                parseInt(filteredEmployee.allowances) -
                300}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-700">
          No employee found with the given criteria.
        </p>
      )}
    </div>
  );
};

export default Payslip;
