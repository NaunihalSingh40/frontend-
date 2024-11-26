'use client'
import React, { useState } from 'react';

export default function Page() {
  const [search, setSearch] = useState('');
  const [pSchema, setPSchema] = useState([
    {
      "project_id": 101,
      "name": "Project Alpha",
      "leader": {
        "employee_id": 1,
        "name": "Alice Johnson"
      },
      "team": [
        {
          "employee_id": 2,
          "name": "Bob Smith"
        },
        {
          "employee_id": 3,
          "name": "Carol White"
        },
        {
          "employee_id": 4,
          "name": "David Brown"
        }
      ],
      "deadline": "2024-12-31",
      "priority": "High",
      "status": "Active"
    },
    {
      "project_id": 102,
      "name": "Project Beta",
      "leader": {
        "employee_id": 5,
        "name": "Eve Davis"
      },
      "team": [
        {
          "employee_id": 6,
          "name": "Frank Harris"
        },
        {
          "employee_id": 7,
          "name": "Grace Lee"
        }
      ],
      "deadline": "2024-10-15",
      "priority": "Medium",
      "status": "Inactive"
    },
    {
      "project_id": 103,
      "name": "Project Gamma",
      "leader": {
        "employee_id": 8,
        "name": "Hannah Martinez"
      },
      "team": [
        {
          "employee_id": 9,
          "name": "Ian Walker"
        },
        {
          "employee_id": 10,
          "name": "Julia Scott"
        }
      ],
      "deadline": "2025-03-20",
      "priority": "Low",
      "status": "Active"
    },
    {
      "project_id": 104,
      "name": "Project Delta",
      "leader": {
        "employee_id": 11,
        "name": "Kevin Johnson"
      },
      "team": [
        {
          "employee_id": 12,
          "name": "Laura Green"
        },
        {
          "employee_id": 13,
          "name": "Mike Adams"
        }
      ],
      "deadline": "2024-07-31",
      "priority": "High",
      "status": "Active"
    },
    {
      "project_id": 105,
      "name": "Project Epsilon",
      "leader": {
        "employee_id": 14,
        "name": "Nancy Clark"
      },
      "team": [
        {
          "employee_id": 15,
          "name": "Oscar Wright"
        },
        {
          "employee_id": 16,
          "name": "Pamela Young"
        }
      ],
      "deadline": "2024-11-01",
      "priority": "Medium",
      "status": "Inactive"
    },
    {
      "project_id": 106,
      "name": "Project Zeta",
      "leader": {
        "employee_id": 17,
        "name": "Quincy Turner"
      },
      "team": [
        {
          "employee_id": 18,
          "name": "Rachel King"
        },
        {
          "employee_id": 19,
          "name": "Steve Harris"
        }
      ],
      "deadline": "2025-01-15",
      "priority": "Low",
      "status": "Active"
    }
  ]);

  const handleEditClick = (projectId) => {
    // Handle edit action here
    console.log(`Edit project with ID: ${projectId}`);
  };

  const handleDeleteClick = (projectId) => {
    // Handle delete action here
    console.log(`Delete project with ID: ${projectId}`);
  };

  return (
    <div className='text-blue-900 bg-white min-h-screen p-8 border border-gray-200 rounded-2xl border-x-gray-200 border-y-gray-200'>
      <div className='flex gap-4'>
        <input
          type='text'
          value={search}
          placeholder='Search by project ID or project name'
          onChange={(e) => setSearch(e.target.value)}
          className='p-2 border border-blue-900 rounded-md w-72 h-10'
        />
        <button
          type='button'
          className='p-2 border bg-blue-900 rounded-md h-10 font-bold text-gray-200 hover:bg-blue-800'
        >
          Filter
        </button>
        <button
        type='button'
        className='flex p-2 border bg-blue-900 rounded-md h-10 font-bold hover:bg-blue-800 text-gray-200 justify-end'>
          Add Project
        </button>
      </div>
      <table className='w-full mt-4 border-collapse border-gray-200'>
        <thead>
          <tr>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200 rounded-l'>Project</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Project ID</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Leader</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Team</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Deadline</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Priority</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200'>Status</th>
            <th className='border-b px-4 py-2 bg-blue-900 text-gray-200 rounded-r'>Action</th>
          </tr>
        </thead>
        <tbody>
          {pSchema.filter(
            (project) =>
              project.name.toLowerCase().includes(search.toLowerCase()) ||
              project.project_id.toString().includes(search)
          ).map((project) => (
            <tr key={project.project_id} className='bg-gray-100 border-b-2'>
              <td className="p-3 text-blue-900 font-semibold">
                {project.name}
              </td>
              <td className="p-3">
                {project.project_id}
              </td>
              <td className="p-3">
                {project.leader.name}
              </td>
              <td className="p-3">
                {project.team.map(member => member.name).join(', ')}
              </td>
              <td className="p-1">
                {project.deadline}
              </td>
              <td className="p-3">
                {project.priority}
              </td>
              <td className="p-3">
                {project.status}
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  onClick={() => handleEditClick(project.project_id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(project.project_id)}
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
  );
}
