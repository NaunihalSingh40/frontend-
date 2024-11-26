//cspell:disable

import React, { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Link from 'next/link';
import ActiveItemContext from './context/adminContext';
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { RiApps2Line } from "react-icons/ri";
import { LiaUsersSolid } from "react-icons/lia";
import { IoRocketOutline } from "react-icons/io5";
import { LiaUserSecretSolid } from "react-icons/lia";
import { BsTicket } from "react-icons/bs";
import './scrollBar.css'
import { LiaSalesforce } from "react-icons/lia";
import { MdOutlineAccountBalance } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { GrDocumentPerformance } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { MdModelTraining } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { LuCassetteTape } from "react-icons/lu";
import { TbSalad } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { MdLogin } from "react-icons/md";

const sidebarItems = [
    {
        name: 'MAIN',
        items: [
            {
                name: 'Dashboard',
                icon: <AiOutlineDashboard />,
                subItems: [
                    { name: 'Admin Dashboard', path: '/subAdmin/main/dashboard' }
                ]
            },
        ]
    },
    {
        name: 'STAKEHOLDERS',
        items: [
            {
                name: 'Employees',
                icon: <AiOutlineUser />,
                subItems: [
                    { name: 'All Employees', path: '/subAdmin/stakeHolders/employees/allEmployees' },
                    { name: 'Holidays', path: '/subAdmin/stakeHolders/employees/holidays' },
                    { name: 'Leaves', path: '/subAdmin/stakeHolders/employees/leaves' },
                    { name: 'Attendance', path: '/subAdmin/stakeHolders/employees/attendance' },
                    { name: 'Departments', path: '/subAdmin/stakeHolders/employees/departments' },
                    // { name: 'Designations', path: '/employees/designations' },
                    { name: 'Overtime', path: '/subAdmin/stakeHolders/employees/overtime' },
                ]
            },
            { name: 'Clients', path: '/subAdmin/stakeHolders/clients', icon: <LiaUsersSolid /> },
            {
                name: 'Projects',
                icon: <IoRocketOutline />,
                subItems: [
                    { name: 'Project Dashboard', path: '/subAdmin/stakeHolders/projects/projectDashboard' },
                    { name: 'Tasks', path: '/subAdmin/stakeHolders/projects/tasks' },
                ]
            },
            { name: 'Tickets', path: '/subAdmin/stakeHolders/tickets', icon: <BsTicket /> },
        ]
    },
    {
        name: 'HR',
        items: [
            {
                name: 'Payroll',
                icon: <MdOutlinePayments />,
                subItems: [
                    { name: 'Employee Salary', path: '/subAdmin/hr/payroll/employeeSalary' },
                    { name: 'Payslip', path: '/subAdmin/hr/payroll/payslip' },
                ]
            },
            { name: 'Policies', path: '/subAdmin/hr/policies', icon: <MdOutlinePolicy /> },
        ]
    },
    {
        name: 'Performance',
        items: [
            {
                name: 'Goals',
                icon: <GoGoal />,
                subItems: [
                    { name: 'Goal List', path: '/subAdmin/development/goals/goalList' },
                    { name: 'Goal Type', path: '/subAdmin/development/goals/goalType' }
                ]
            },
            {
                name: 'Training',
                icon: <MdModelTraining />,
                subItems: [
                    { name: 'Training List', path: '/subAdmin/development/training/trainingList' },
                    { name: 'Trainers', path: '/subAdmin/development/training/trainers' },
                ]
            },
            { name: 'Resignation', path: '/subAdmin/development/resignation', icon: <RiIndeterminateCircleLine /> },
        ]
    },
];

export default function Sidebar({ isOpen }) {
    const { activeItem, setActiveItem } = useContext(ActiveItemContext);
    const [openDropdown, setOpenDropdown] = useState({});

    const pathname = usePathname();

    useEffect(() => {
        const currentItem = pathname.split('/').pop();

        const currentDropdown = sidebarItems.find(section =>
            section.items.some(item =>
                item.subItems?.some(subItem => subItem.path?.endsWith(currentItem)) ||
                item.path?.endsWith(currentItem)
            )
        )?.name;

        setOpenDropdown({
            Dashboard: pathname.includes('/subAdmin/main/dashboard'),
            Employees: pathname.includes('/subAdmin/stakeHolders/employees/allUsers') || pathname.includes('/subAdmin/stakeHolders/employees/allEmployees') || pathname.includes('/subAdmin/stakeHolders/employees/holidays') || pathname.includes('/subAdmin/stakeHolders/employees/leaves') || pathname.includes('/subAdmin/stakeHolders/employees/attendance') || pathname.includes('/subAdmin/stakeHolders/employees/departments') || pathname.includes('/subAdmin/stakeHolders/employees/shiftAndSchedule') || pathname.includes('/subAdmin/stakeHolders/employees/overtime'),
            [currentDropdown || '']: true,
            Goals: pathname.includes('/subAdmin/development/goals/goalList') || pathname.includes('/subAdmin/development/goals/goalType'),
            Training: pathname.includes('/subAdmin/development/training/trainingList') || pathname.includes('/subAdmin/development/training/trainers'),
            Authentication: pathname.includes('/subAdmin/administration/authentication/login') || pathname.includes('/subAdmin/administration/authentication/register') || pathname.includes('/subAdmin/administration/authentication/forgotPassword'),
            Payroll: pathname.includes('/subAdmin/hr/payroll/employeeSalary') || pathname.includes('/subAdmin/hr/payroll/payslip'),
            Projects: pathname.includes('/subAdmin/stakeHolders/projects/projectDashboard') || pathname.includes('/subAdmin/stakeHolders/projects/tasks'),
        });

        setActiveItem(currentItem);
    }, [pathname, setActiveItem]);


    const handleItemClick = (itemName) => {
        setActiveItem(itemName.toLowerCase().replace(/\s+/g, ''));
    };

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(prev => ({
            ...prev,
            [dropdownName]: !prev[dropdownName]
        }));
    };


    return (
        <aside
    className={`fixed inset-y-0 left-0 z-50 w-[300px] py-4 mt-20 overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 md:translate-x-0 sm:translate-x-0'} scrollBar`}
    style={{ background: '#19358B' }}  // Primary color for sidebar background
>
    <ul className="space-y-2 font-medium">
        {sidebarItems.map(section => (
            <li className='px-5' key={section.name}>
                <div className="text-[#FAFAFA] text-[13px] font-bold mt-4 flex gap-3">  {/* White text for headers */}
                    {section.name}
                </div>
                {section.items.map(item => (
                    <div key={item.name}>
                        {item.subItems ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => toggleDropdown(item.name)}
                                    className={`flex items-center w-full p-1 text-[17px] hover:scale-105 transition duration-75 rounded-lg group ${openDropdown[item.name] ? 'text-[#FAFAFA] font-semibold' : 'text-[#FAFAFA] font-medium'}`}
                                    style={{ backgroundColor: openDropdown[item.name] ? '#2C6FED' : '#19358B' }}  // Lighter blue for hover/active states
                                >
                                    <div>{item?.icon}</div>
                                    <span className="flex-1 ml-2 text-left rtl:text-right whitespace-nowrap">{item.name}</span>
                                    {openDropdown[item.name] ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                </button>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openDropdown[item.name] ? 'max-h-[1000px] bg-[#E7F3FF] rounded-xl' : 'max-h-0'}`}  // Light blue for expanded section background
                                     style={{ padding: openDropdown[item.name] ? '10px' : '0', marginTop: '5px' }}>
                                    <ul className="space-y-2" style={{ listStyle: "none", paddingLeft: 0 }}>
                                        {item.subItems.map(subItem => (
                                            <li key={subItem.name} className="relative pl-5 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-[#18BADD]">
                                                <Link
                                                    href={subItem.path || '#'}
                                                    className={`flex items-center w-full transition duration-75 pl-6 rounded-lg hover:text-[#18BADD] group ${subItem.path && activeItem === subItem.path.split('/').pop() ? 'text-[#18BADD] font-semibold text-[16px]' : 'text-[#4d5052] text-[15px]'}`}
                                                    onClick={() => handleItemClick(subItem.name)}
                                                >
                                                    <span className={`absolute left-0 top-1/2 transform -translate-y-1/2 pl-5 hover:text-[#18BADD] ${subItem.path && activeItem === subItem.path.split('/').pop() ? 'text-[#18BADD]' : 'text-gray-400'}`}>
                                                        {subItem.path && activeItem === subItem.path.split('/').pop() ? <>&#8594;</> : <>&#8594;</>}
                                                    </span>
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link
                                href={item.path || '#'}
                                className={`flex items-center w-full p-1 text-[17px] transition hover:scale-105 duration-75 rounded-lg group ${item.path && activeItem === item.path.split('/').pop() ? 'text-[#18BADD] font-semibold text-[15px]' : 'text-[#FAFAFA] text-[15px]'}`}
                                onClick={() => handleItemClick(item.name)}
                            >
                                <div>{item?.icon}</div>
                                <span className="flex-1 ml-2 text-left rtl:text-right whitespace-nowrap">{item.name}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </li>
        ))}
    </ul>
</aside>

    );
}