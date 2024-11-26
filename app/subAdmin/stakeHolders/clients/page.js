'use client';
import { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ClientDashboard = () => {
  const [clients, setClients] = useState([
    { id: 'CLT-0008', company: 'Carlson Tech', contactPerson: 'Betty Carlson', email: 'bettycarlson@example.com', mobile: '9876543210', status: 'Inactive' },
    { id: 'CLT-0003', company: 'Cream Inc', contactPerson: 'Ruby Bartlett', email: 'rubybartlett@example.com', mobile: '9876543210', status: 'Active' },
    { id: 'CLT-0002', company: 'Delta Infotech', contactPerson: 'Tressa Wexler', email: 'tressawexler@example.com', mobile: '9876543210', status: 'Inactive' },
    { id: 'CLT-0001', company: 'Global Technologies', contactPerson: 'Barry Cuda', email: 'barrycuda@example.com', mobile: '9876543210', status: 'Active' },
    { id: 'CLT-0006', company: 'International Software Inc', contactPerson: 'Walter Weaver', email: 'walterweaver@example.com', mobile: '9876543210', status: 'Active' },
    { id: 'CLT-0007', company: 'Mercury Software Inc', contactPerson: 'Amanda Warren', email: 'amandawarren@example.com', mobile: '9876543210', status: 'Active' },
  ]);

  const [showAddClient, setShowAddClient] = useState(false);
  const [search, setSearch] = useState({ id: '', company: '', contactPerson: '' });
  const [formData, setFormData] = useState({ id: '', company: '', contactPerson: '', email: '', mobile: '', status: 'Active' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const addClient = () => {
    setClients([...clients, { ...formData }]);
    setShowAddClient(false);
    setFormData({ id: '', company: '', contactPerson: '', email: '', mobile: '', status: 'Active' });
  };

  const editClient = (index) => {
    const updatedClients = [...clients];
    updatedClients[index] = formData;
    setClients(updatedClients);
    setShowAddClient(false);
  };

  const deleteClient = (index) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const filteredClients = clients.filter(client =>
    client.id.toLowerCase().includes(search.id.toLowerCase()) &&
    client.company.toLowerCase().includes(search.company.toLowerCase()) &&
    client.contactPerson.toLowerCase().includes(search.contactPerson.toLowerCase())
  );

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
      <div className="flex space-x-4 mb-6">
        <input
          className="p-2 w-full rounded bg-gray-200 text-blue-950"
          type="text"
          placeholder="Client ID"
          name="id"
          value={search.id}
          onChange={handleSearchChange}
        />
        <input
          className="p-2 w-full rounded bg-gray-200 text-blue-950"
          type="text"
          placeholder="Company"
          name="company"
          value={search.company}
          onChange={handleSearchChange}
        />
        <input
          className="p-2 w-full rounded bg-gray-200 text-blue-950"
          type="text"
          placeholder="Contact Person"
          name="contactPerson"
          value={search.contactPerson}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900">SEARCH</button>
      </div>
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
          {filteredClients.map((client, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="p-4">{client.company}</td>
              <td className="p-4">{client.id}</td>
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
                      setFormData(client);
                      setShowAddClient(true);
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

      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-blue-950 w-96">
            <h2 className="text-lg font-bold mb-4">{formData.id ? 'Edit Client' : 'Add Client'}</h2>
            <label className="block text-sm font-medium mb-1">Client ID:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="text"
              name="id"
              placeholder="Client ID"
              value={formData.id}
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-1">Company:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-1">Contact Person:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-1">Mobile:</label>
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowAddClient(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
                onClick={formData.id ? () => editClient(clients.findIndex(client => client.id === formData.id)) : addClient}
              >
                {formData.id ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
