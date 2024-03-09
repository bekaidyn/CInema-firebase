import React from 'react';
import { Link } from 'react-router-dom';

export default function YourComponent() {


    return (
        <div className='lg1:m-2.5 sm:my-1 '>
            <button className='bg-white text-gray-600 text-xs py-2.5 md:px-2 lg1:px-2 sm:px-1 mr-0 hover:bg-gray-200'>
                <Link to="/login">SIGN IN</Link>
            </button>
            <button className='bg-[#002be7] text-white text-xs py-2.5 mx-2 lg1:px-6 lg1:p-2.5 sm:px-1 m-0 hover:bg-[#00008b]'>
                <b>SIGN UP FOR</b> <strong>MAX</strong>
            </button>
        </div >
    );
};
