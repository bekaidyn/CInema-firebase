import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../carts/pagination';// Adjust the import path based on your project structure
import { Link } from 'react-router-dom';
import SearchInput from '../carts/Search';

const itemsPerPage = 12;

const Series = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then((res) => {
                setMovies(res.data);
            })
            .catch(err => {
                console.error('Error fetching movies:', err);
            });
    }, []);


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset currentPage to 1 when the search term changes
    };

    const handleSort = () => {
        // Toggle the sorting order
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        // Sort the movies based on the selected order
        const sortedMovies = [...movies].sort((a, b) => {
            const checkA = typeof a.title === 'string' ? a.title.toLowerCase() : String(a.title);
            const checkB = typeof b.title === 'string' ? b.title.toLowerCase() : String(b.title);
            return newSortOrder === 'asc' ? checkA.localeCompare(checkB) : checkB.localeCompare(checkA);
        });

        setMovies(sortedMovies);
        setCurrentPage(1); // Reset currentPage to 1 after sorting
    };

    const filteredData = movies.filter((data) => {
        return data.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className=' lg:mx-[7%]'>
            <div className='  relative'>
                <div className='  box-border  border-2 w-auto divide-y divide-gray-200'>
                    <div className='mr-10 flex my-2'>
                        <button className="button mx-2 border-2 p-1 bg-gray-300" onClick={handleSort}>
                            Sort {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                        <form className=" mx-5" onSubmit={(e) => e.preventDefault()}>
                            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                        </form>
                    </div>
                    <ul className='flex flex-wrap'>
                        {currentItems.map(movie => (
                            <li key={movie._id} className='border-2 sm:w-1/2 md:w-1/3 lg1:w-1/4 text-xl font-light'>
                                <Link to={`/movie/detail/${movie._id}`}>
                                    <div className=' rounded-md p-3'>
                                        <img className='h-[380px] w-[300px] rounded-lg shadow-lg object-cover' src={`${process.env.REACT_APP_API_URL}/${movie.posterUrl}`} alt='' />
                                    </div>
                                    <h1 className='p-3'>{movie.title}</h1>
                                    <h1 className='p-3'>{movie.runtime} min</h1>
                                    <h1 className='p-3'>{movie.plot}</h1>
                                    <button className='p-3 hover:text-w-blue-300 ml-3 text-[#2bb0d8]'>Find out &gt;</button>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className='border-2'>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default Series;
