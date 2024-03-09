import React, { useState } from 'react';

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
                            <a href="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                DOCMENTARIES</a>
                            <a href="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                SPECIALS</a>
                            <a href="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                SPORTS</a>
                            <a href="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                PODCATS</a>
                            <a href="/comingsoon" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">
                                MAX
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drop;
