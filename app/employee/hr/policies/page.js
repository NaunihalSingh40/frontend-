import React from 'react';

const policies = [
  {
    id: 1,
    name: 'Leave Policy',
    department: 'All Departments',
    description: 'Lorem ipsum dolor sit amet',
    created: '19 Feb 2019',
    pdfUrl: '/pdfs/leave-policy.pdf', // Change to actual URL or file path
  },
  {
    id: 2,
    name: 'Permission Policy',
    department: 'Marketing',
    description: 'Lorem ipsum dolor sit amet',
    created: '20 Feb 2019',
    pdfUrl: '/pdfs/permission-policy.pdf', // Change to actual URL or file path
  },
];

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#4a4a4a] p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#001f5b]">Policies</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-[#001f5b] text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Policy Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={policy.id} className={`${index % 2 === 0 ? 'bg-[#dedede]' : 'bg-white'} hover:bg-[#a3c8ff]`}>
                <td className="py-3 px-4 border-b border-[#757575] text-center">{policy.id}</td>
                <td className="py-3 px-4 border-b border-[#757575]">{policy.name}</td>
                <td className="py-3 px-4 border-b border-[#757575]">{policy.department}</td>
                <td className="py-3 px-4 border-b border-[#757575]">{policy.description}</td>
                <td className="py-3 px-4 border-b border-[#757575]">{policy.created}</td>
                <td className="py-3 px-4 border-b border-[#757575]">
                  <a
                    href={policy.pdfUrl}
                    download
                    className="text-[#001f5b] hover:text-[#004080] font-semibold"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoliciesPage;
