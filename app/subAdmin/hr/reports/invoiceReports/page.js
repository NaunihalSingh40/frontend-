'use client'
import { useState, useEffect } from 'react';

export default function Invoices() {
  const initialInvoices = [
    { id: 1, number: 'INV-0001', client: 'Global Technologies', createdDate: '11 Mar 2019', dueDate: '17 Mar 2019', amount: '$2099', status: 'Paid' },
    { id: 2, number: 'INV-0002', client: 'Delta Infotech', createdDate: '11 Mar 2019', dueDate: '17 Mar 2019', amount: '$2099', status: 'Sent' },
  ];

  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const filteredInvoices = initialInvoices.filter(invoice =>
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedClient || invoice.client === selectedClient)
    );
    setInvoices(filteredInvoices);
  }, [searchQuery, selectedClient]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedClient('');
    setInvoices(initialInvoices); // Reset to initial invoices
  };

  return (
    <div className="min-h-screen rounded-md text-white p-8 bg-white">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            className="bg-white text-blue-900 border border-blue-900 rounded p-2"
            onChange={(e) => setSelectedClient(e.target.value)}
            value={selectedClient}
          >
            <option value="">All Clients</option>
            <option value="Global Technologies">Global Technologies</option>
            <option value="Delta Infotech">Delta Infotech</option>
          </select>

          <input
            type="text"
            placeholder="Search by client..."
            className="bg-white text-blue-900 border border-blue-900 rounded p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFilters}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full  text-blue-900  bg-gray-100 rounded">
          <thead>
            <tr className='text-white  bg-blue-900'>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Invoice Number</th>
              <th className="py-2 px-4">Client</th>
              <th className="py-2 px-4">Created Date</th>
              <th className="py-2 px-4">Due Date</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="py-2 px-4">{invoice.id}</td>
                <td className="py-2 px-4">{invoice.number}</td>
                <td className="py-2 px-4">{invoice.client}</td>
                <td className="py-2 px-4">{invoice.createdDate}</td>
                <td className="py-2 px-4">{invoice.dueDate}</td>
                <td className="py-2 px-4">{invoice.amount}</td>
                <td className={`py-2 px-4 ${invoice.status === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {invoice.status}
                </td>
                <td className="py-2 px-4">
                  <button className="text-blue-900">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
