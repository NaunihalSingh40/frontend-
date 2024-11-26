'use client';
import { useEffect, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const ClientDashboard = () => {


  const [formData, setFormData] = useState({
    clientId: "",
    companyName: "",
    contactPerson: "",
    email: "",
    mobile: "",
    status: "Active",
  });

  const [search, setSearch] = useState({
    id: "",
    company: "",
    contactPerson: "",
  });

  const [showAddClient, setShowAddClient] = useState(false)

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/client/addClient", formData);

      if (response.data.success) {
        alert("Client added successfully!");
        setFormData({
          clientId: "",
          company: "",
          contactPerson: "",
          email: "",
          mobile: "",
          status: "Active",
        });
        setShowAddClient(false)
      } else {
        alert("Failed to add client: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Error adding client. Please try again.");
    }
  };

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/client/allClients");
      if (response.data.success) {
        setClients(response.data.clients);
      } else {
        console.error("Failed to fetch clients:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-white text-blue-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
          onClick={() => setShowAddClient(true)}
        >
          + Add Client
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-6">Clients List</h2>
        {loading ? (
          <p>Loading clients...</p>
        ) : (
          <table className="min-w-full bg-gray-100 rounded">
            <thead>
              <tr>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Client ID</th>
                <th className="p-4 text-left">Contact Person</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-4">{client.companyName}</td>
                  <td className="p-4">{client.clientId}</td>
                  <td className="p-4">{client.contactPerson}</td>
                  <td className="p-4">{client.email}</td>
                  <td className="p-4">{client.mobile}</td>
                  <td className="p-4">
                    <select
                      className="bg-gray-200 text-blue-950 rounded"
                      value={client.status}
                      onChange={(e) => {
                        const updatedClients = [...clients];
                        updatedClients[index].status = e.target.value;
                        setClients(updatedClients);
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="relative flex space-x-2">
                      <button
                        className="bg-blue-950 text-white p-2 rounded hover:bg-blue-900"
                        onClick={() => {
                          alert("Edit functionality can be implemented here.");
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                        onClick={() => deleteClient(index)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 ml-64 mt-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] relative flex flex-col">
            <h2 className="text-lg font-bold mb-4 text-blue-900">
              Add Client
            </h2>
            <div className="overflow-y-auto flex-1">
              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Clinet ID:
                  </label>
                  <input
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    type="text"
                    placeholder="Client ID"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Company Name:
                  </label>
                  <input
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    type="text"
                    placeholder="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Contact Person:
                  </label>
                  <input
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    type="text"
                    placeholder="Contact Person"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Email:
                  </label>
                  <input
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Mobile:
                  </label>
                  <input
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-blue-900">
                    Status:
                  </label>
                  <select
                    className="p-2 w-full rounded bg-gray-200 text-blue-950"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="bg-white p-4 flex justify-end gap-4 border-t border-gray-300 mt-4">
              <button
                type="submit"
                className="bg-blue-900 text-white p-2 rounded-lg"
                onClick={handleFormSubmit}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddClient(false)}
                className="bg-red-600 text-white p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
