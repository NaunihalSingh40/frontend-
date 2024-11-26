'use client';
import { useState, useEffect, useRef } from 'react';


const Dashboard = () => {
    const [tasks, setTasks] = useState([
        { title: 'Patient appointment booking', status: 'completed', date: '2023-08-21' },
        { title: 'Appointment booking with payment gateway', status: 'completed', date: '2023-08-20' },
        { title: 'Doctor available module', status: 'completed', date: '2023-08-19' },
        { title: 'Patient and Doctor video conferencing', status: 'pending', date: '2023-08-18' },
        { title: 'Private chat module', status: 'pending', date: '2023-08-17' },
        { title: 'Patient Profile add', status: 'pending', date: '2023-08-16' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', status: 'pending', date: '' });
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    // Handle task completion toggle
    const handleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
        );
        setTasks(updatedTasks);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    // Handle form submission and add task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.title && newTask.date) {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTask({ title: '', status: 'pending', date: '' });
            setShowModal(false);
        } else {
            alert('Please fill out all fields');
        }
    };

    // Handle new messages from the server
    // useEffect(() => {
    //     socket.on('receive_message', (message) => {
    //         setMessages((prevMessages) => [...prevMessages, message]);
    //     });

    //     return () => {
    //         socket.off('receive_message');
    //     };
    // }, []);

    // Scroll to the bottom of the chat when a new message is received
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle sending a new message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                text: newMessage,
                sender: 'Admin', // Change this according to your actual sender
                timestamp: new Date().toISOString(),
            };
            // socket.emit('send_message', message);
            setNewMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <div className="bg-[#1E3A8A] text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button
                    className="bg-[#3B82F6] px-4 py-2 rounded hover:bg-[#60A5FA]"
                    onClick={() => setShowModal(true)}
                >
                    + Add Task
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md text-gray-900 w-96 relative">
                        <h2 className="text-lg font-bold mb-4 text-[#4B5563]">Add New Task</h2>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <form onSubmit={handleAddTask}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Status
                                </label>
                                <select
                                    name="status"
                                    value={newTask.status}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newTask.date}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#3B82F6] text-white px-4 py-2 rounded hover:bg-[#60A5FA]"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Task List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div>
                    <div className="bg-white shadow rounded">
                        <div className="border-b-2 border-gray-300 p-4 bg-[#1E3A8A]">
                            <h2 className="text-lg font-bold text-[#ffffff]">Tasks</h2>
                        </div>
                        <ul>
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className={`flex justify-between items-center p-4 ${
                                        index % 2 === 0 ? 'bg-[#F3F4F6]' : 'bg-[#E5E7EB]'
                                    } border-b border-[#9CA3AF] hover:bg-[#E0E7FF]`}
                                >
                                    <span className={`font-medium ${task.status === 'completed' ? 'text-[#10B981]' : 'text-[#F97316]'}`}>
                                        {task.title}
                                    </span>
                                    <button
                                        className={`px-4 py-2 rounded ${
                                            task.status === 'completed' ? 'bg-[#10B981]' : 'bg-[#F97316]'
                                        } text-white`}
                                        onClick={() => handleTaskCompletion(index)}
                                    >
                                        {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* Chat Section */}
                <div className="bg-white shadow rounded h-[calc(60vh-3rem)] overflow-hidden">
                    <div className="border-b-2 border-gray-300 p-4 bg-[#1E3A8A]">
                        <h2 className="text-lg font-bold text-[#ffffff]">Chat</h2>
                    </div>
                    <div className="p-4 flex-1 overflow-auto">
                        <div className="space-y-2">
                            {messages.map((message, index) => (
                                <div key={index} className={`p-2 rounded ${message.sender === 'Admin' ? 'bg-[#3B82F6] text-white' : 'bg-[#E5E7EB] text-gray-800'}`}>
                                    <div className="font-medium">{message.sender}</div>
                                    <div>{message.text}</div>
                                    <div className="text-sm text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</div>
                                </div>
                            ))}
                            <div ref={messageEndRef} /> {/* Scroll to bottom */}
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="border-t border-gray-300 p-4 bg-gray-100">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Type your message..."
                            required
                        />
                        <button
                            type="submit"
                            className="bg-[#3B82F6] text-white px-4 py-2 rounded hover:bg-[#60A5FA] mt-2"
                        >
                            Send
                        </button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
