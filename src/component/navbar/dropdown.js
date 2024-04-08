import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Drop() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div>
            <div className="relative inline-block text-center">
                <button onClick={toggleDropdown} type="button" className="text-sm font-sm">
                    MORE</button>
                {isDropdownOpen && (
                    <div className=" absolute top-8 left-1/2 transform -translate-x-1/2 w-36 bg-white ring-1 ring-black ring-opacity-5">
                        <div>
                            <Link to="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                DOCMENTARIES</Link>
                            <Link to="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                SPECIALS</Link>
                            <Link to="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                SPORTS</Link>
                            <Link to="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                PODCATS</Link>
                            <Link to="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                MAX
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Drop;
