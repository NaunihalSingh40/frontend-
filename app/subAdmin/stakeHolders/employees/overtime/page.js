'use client'
import { useState } from 'react';

const OvertimeDashboard = () => {
    // Sample data for display
    const [overtimes, setOvertimes] = useState([
        {
            name: 'John Doe',
            date: '2023-08-21',
            hours: 2,
            type: 'Normal day OT 1.5x',
            description: 'Completed project tasks.',
            status: 'Approved',
            approvedBy: 'Richard Miles',
        },
        {
            name: 'Jane Smith',
            date: '2023-08-20',
            hours: 3,
            type: 'Weekend OT 2x',
            description: 'Worked on urgent bug fixes.',
            status: 'Pending',
            approvedBy: 'N/A',
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        hours: '',
        type: '',
        description: '',
        status: 'New', // Default status
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addOvertime = () => {
        if (isEditing) {
            const updatedOvertimes = overtimes.map((overtime, index) =>
                index === currentEditIndex ? { ...formData, approvedBy: 'Richard Miles' } : overtime
            );
            setOvertimes(updatedOvertimes);
        } else {
            setOvertimes([...overtimes, { ...formData, approvedBy: 'Richard Miles' }]);
        }
        setShowModal(false);
        setFormData({ name: '', date: '', hours: '', type: '', description: '', status: 'New' });
        setIsEditing(false);
        setCurrentEditIndex(null);
    };

    const openEditModal = (index) => {
        setFormData(overtimes[index]);
        setIsEditing(true);
        setCurrentEditIndex(index);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-white text-blue-900 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Overtime Dashboard</h1>
                <button
                    className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowModal(true)}
                >
                    + Add Overtime
                </button>
            </div>
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-bold">Overtime Employees</h2>
                    <p className="text-2xl">{overtimes.length}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-bold">Overtime Hours</h2>
                    <p className="text-2xl">{overtimes.reduce((total, ot) => total + parseFloat(ot.hours), 0)}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-bold">Pending Request</h2>
                    <p className="text-2xl">{overtimes.filter(ot => ot.status === 'Pending').length}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-lg font-bold">Rejected</h2>
                    <p className="text-2xl">0</p> {/* Adjust as needed */}
                </div>
            </div>
            <table className="min-w-full bg-gray-100 rounded">
                <thead>
                    <tr>
                        <th className="p-4 text-left">#</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">OT Date</th>
                        <th className="p-4 text-left">OT Hours</th>
                        <th className="p-4 text-left">OT Type</th>
                        <th className="p-4 text-left">Description</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Approved by</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {overtimes.map((overtime, index) => (
                        <tr key={index} className="border-b border-gray-300">
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{overtime.name}</td>
                            <td className="p-4">{overtime.date}</td>
                            <td className="p-4">{overtime.hours}</td>
                            <td className="p-4">{overtime.type}</td>
                            <td className="p-4">{overtime.description}</td>
                            <td className="p-4">{overtime.status}</td>
                            <td className="p-4">{overtime.approvedBy}</td>
                            <td className="p-4">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => openEditModal(index)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md text-blue-900 w-96">
                        <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Overtime' : 'Add Overtime'}</h2>
                        <label className="block text-sm font-medium mb-1">Employee Name:</label>
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            type="text"
                            name="name"
                            placeholder="Employee Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <label className="block text-sm font-medium mb-1">OT Date:</label>
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                        <label className="block text-sm font-medium mb-1">Overtime Hours:</label>
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            type="number"
                            name="hours"
                            placeholder="Overtime Hours"
                            value={formData.hours}
                            onChange={handleInputChange}
                        />
                        <label className="block text-sm font-medium mb-1">Overtime Type:</label>
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            type="text"
                            name="type"
                            placeholder="Overtime Type"
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        <textarea
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>

                        <label className="block text-sm font-medium mb-1">Status:</label>
                        <select
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="New">New</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                        </select>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={addOvertime}
                            >
                                {isEditing ? 'Update Overtime' : 'Add Overtime'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OvertimeDashboard;
