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

  const filteredClients = clients.filter(client =>
    client.id.toLowerCase().includes(search.id.toLowerCase()) &&
    client.company.toLowerCase().includes(search.company.toLowerCase()) &&
    client.contactPerson.toLowerCase().includes(search.contactPerson.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-blue-950 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDashboard;
