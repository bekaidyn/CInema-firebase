import React from 'react';

const SearchInput = ({ searchTerm, handleSearch, }) => {
    return (
        <div className="">
            <input
                type="search"
                id="default-search"
                value={searchTerm}
                onChange={handleSearch}
                className="block p-3  text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 w-[90%] lg:w-auto mx-auto dark:focus:border-blue-500"
                placeholder="Search..."
                required
            />
        </div>
    );
};

export default SearchInput;
