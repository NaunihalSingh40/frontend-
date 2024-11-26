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
                    { name: 'Admin Dashboard', path: '/admin/main/dashboard' }
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
                    { name: 'All Employees', path: '/admin/stakeHolders/employees/allEmployees' },
                    { name: 'Holidays', path: '/admin/stakeHolders/employees/holidays' },
                    { name: 'Leaves', path: '/admin/stakeHolders/employees/leaves' },
                    { name: 'Attendance', path: '/admin/stakeHolders/employees/attendance' },
                    { name: 'Departments', path: '/admin/stakeHolders/employees/departments' },
                    { name: 'Shift And Schedule', path: '/admin/stakeHolders/employees/shiftAndSchedule' },
                    { name: 'Overtime', path: '/admin/stakeHolders/employees/overtime' },
                ]
            },
            { name: 'Clients', path: '/admin/stakeHolders/clients', icon: <LiaUsersSolid /> },
            {
                name: 'Projects',
                icon: <IoRocketOutline />,
                subItems: [
                    { name: 'Project Dashboard', path: '/admin/stakeHolders/projects/projectDashboard' },
                    { name: 'Tasks', path: '/admin/stakeHolders/projects/tasks' },
                ]
            },
            { name: 'Tickets', path: '/admin/stakeHolders/tickets', icon: <BsTicket /> },
        ]
    },
    {
        name: 'HR',
        items: [
            {
                name: 'Payroll',
                icon: <MdOutlinePayments />,
                subItems: [
                    { name: 'Employee Salary', path: '/admin/hr/payroll/employeeSalary' },
                    { name: 'Payslip', path: '/admin/hr/payroll/payslip' },
                ]
            },
            { name: 'Policies', path: '/admin/hr/policies', icon: <MdOutlinePolicy /> },
        ]
    },
    {
        name: 'Performance',
        items: [
            {
                name: 'Goals',
                icon: <GoGoal />,
                subItems: [
                    { name: 'Goal List', path: '/admin/development/goals/goalList' },
                    { name: 'Goal Type', path: '/admin/development/goals/goalType' }
                ]
            },
            {
                name: 'Training',
                icon: <MdModelTraining />,
                subItems: [
                    { name: 'Training List', path: '/admin/development/training/trainingList' },
                    { name: 'Trainers', path: '/admin/development/training/trainers' },
                ]
            },
            { name: 'Promotion', path: '/admin/development/promotion', icon: <IoIosStats /> },
            { name: 'Resignation', path: '/admin/development/resignation', icon: <RiIndeterminateCircleLine /> },
            { name: 'Termination', path: '/admin/development/termination', icon: <RiIndeterminateCircleLine /> }
        ]
    },
    {
        name: 'Administration',
        items: [
            { name: 'Assets', path: '/admin/administration/assets', icon: <LuCassetteTape /> },
            {
                name: 'Authentication',
                icon: <MdLogin />,
                subItems: [
                    { name: 'Login', path: '/admin/administration/authentication/login' },
                    { name: 'Register', path: '/admin/administration/authentication/register' },
                    { name: 'Forgot Passowrd', path: '/admin/administration/authentication/forgotPassword' }
                ]
            },
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
            Dashboard: pathname.includes('/admin/main/dashboard'),
            Employees: pathname.includes('/admin/stakeHolders/employees/allUsers') || pathname.includes('/admin/stakeHolders/employees/allEmployees') || pathname.includes('/admin/stakeHolders/employees/holidays') || pathname.includes('/admin/stakeHolders/employees/leaves') || pathname.includes('/admin/stakeHolders/employees/attendance') || pathname.includes('/admin/stakeHolders/employees/departments') || pathname.includes('/admin/stakeHolders/employees/shiftAndSchedule') || pathname.includes('/admin/stakeHolders/employees/overtime'),
            [currentDropdown || '']: true,
            Goals: pathname.includes('/admin/development/goals/goalList') || pathname.includes('/admin/development/goals/goalType'),
            Training: pathname.includes('/admin/development/training/trainingList') || pathname.includes('/admin/development/training/trainers'),
            Authentication: pathname.includes('/admin/administration/authentication/login') || pathname.includes('/admin/administration/authentication/register') || pathname.includes('/admin/administration/authentication/forgotPassword'),
            Payroll: pathname.includes('/admin/hr/payroll/employeeSalary') || pathname.includes('/admin/hr/payroll/payslip'),
            Projects: pathname.includes('/admin/stakeHolders/projects/projectDashboard') || pathname.includes('/admin/stakeHolders/projects/tasks'),
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