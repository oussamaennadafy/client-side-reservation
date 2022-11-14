import React from 'react'
import { BsSearch } from "react-icons/bs";

const Navbaar = () =>
{
    return (
        <header>
            <nav className="bg-[#353333] h-22 w-screen flex items-center justify-between">
                <div className='flex items-center'>
                    <img className='w-32 mb-5 cursor-pointer' src='https://www.oncf.ma/images/logo.png?v4.6'></img>
                    <ul className='flex gap-5 ml-20 text-gray-200'>
                        <li className='cursor-pointer'>Company</li>
                        <li className='cursor-pointer'>Travelers</li>
                        <li className='cursor-pointer'>Freight and Logistics</li>
                        <li className='cursor-pointer'>Development</li>
                        <li className='cursor-pointer'>Al Boraq</li>
                    </ul>
                </div>
                <i className='text-white mr-12 cursor-pointer font-[24px]'><BsSearch /></i>
            </nav>
        </header>
    )
}

export default Navbaar