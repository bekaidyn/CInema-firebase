import React from 'react';
import { Link } from 'react-router-dom';

export default function Profilebutton() {


    return (
        <div >

            <Link to="/create/movie">
                <button className="bg-white text-gray-600 font-extralight text-md   py-2 md:px-2 lg:px-2 sm:px-1 hover:bg-gray-200 focus:outline-none focus:shadow-outline-gray active:bg-gray-300">
                    Profile
                </button>

            </Link>

        </div>
    );
}
