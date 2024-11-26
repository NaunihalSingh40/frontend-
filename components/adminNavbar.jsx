import React, { useContext, useState, useEffect } from 'react';
import { BsPersonFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage3Fill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { IoFilterCircleSharp } from 'react-icons/io5';
import ActiveItemContext from './context/adminContext';
import Image from 'next/image';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
    const { activeItem } = useContext(ActiveItemContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const formatActiveItem = (item) => {
        if (!item) return 'HRMS';
        const formattedItem = item.replace(/([A-Z])/g, ' $1').trim();
        return formattedItem.charAt(0).toUpperCase() + formattedItem.slice(1);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed h-20 flex justify-between items-center w-full px-6 border-b border-[#CACACA] z-[999] transition-colors duration-300 ${scrolled ? 'bg-[#FFFFFF]' : 'bg-[#F5F6FA]'}`}>
            <div className="xl:pr-5 xl:px-0 lg:px-10 md:px-10 sm:px-1 px-1 flex justify-between w-full items-center flex-wrap">
                <div className='flex xl:gap-5 justify-center items-center'>
                    <div className='flex gap-3 items-center m-2 xl:mx-6 lg:mx-6 md:mx-6 sm:mx-2 mx-2'>
                        <Image src='/appPage/ll1_dark1.png' alt='logo' width={50} height={50} />
                        <p className='flex justify-center font-bold text-[22px] text-[#142A6E]'>COGENT CREATORS</p> {/* Dark Blue for the brand name */}
                    </div>
                    <div className='xl:pl-[100px] lg:pl-[100px] md:pl-[100px] text-[#142A6E] text-[22px] xl:block lg:block md:hidden sm:hidden hidden font-900'>{formatActiveItem(activeItem)}</div> {/* Dark Blue */}
                    <div className='xl:block lg:block md:hidden sm:hidden hidden'>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                className="w-[250px] py-2 px-4 pr-10 rounded-md outline-none border border-[#CACACA]"  /* Light Grey for the border */
                                placeholder="Search..."
                                style={{ backgroundColor: '#F5F6FA', color: '#142A6E' }}  // Light Grey background, Dark Blue text
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#18BADD]" /> {/* Light Blue for the search icon */}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className='p-2 shadow-md rounded-md bg-[#F5F6FA]'> {/* Light Grey background */}
                        <IoIosSettings size={20} color='#202121' />  {/* Dark Grey icons */}
                    </div>
                    <div className='p-2 shadow-md rounded-md bg-[#F5F6FA]'>
                        <IoIosNotifications size={20} color='#202121' />
                    </div>
                    <div className='p-2 shadow-md rounded-md bg-[#F5F6FA]'>
                        <RiMessage3Fill size={18} color='#202121' />
                    </div>
                    <div className='p-2 shadow-md rounded-md bg-[#F5F6FA]'>
                        <BsPersonFill size={20} color='#202121' />
                    </div>
                </div>
            </div>
            <button
                className="lg:hidden md:hidden flex justify-center items-center w-8 h-8 bg-[#CACACA] hover:bg-[#B0B0B0] rounded-full"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
    );
}
