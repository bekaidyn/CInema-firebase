import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './pagination'; // Adjust the import path based on your project structure
import { Link } from 'react-router-dom';
import SearchInput from './Search';

const itemsPerPage = 12;

const MovieCards = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then((res) => {
                // Assuming movies have a 'popularity' field, you can sort and filter them here
                const sortedMovies = res.data.sort((a, b) => {
                    return sortOrder === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity;
                }).slice(0, 10); // Get the top 20 movies based on popularity

                setMovies(sortedMovies);
            })
            .catch(err => {
                console.error('Error fetching movies:', err);
            });
    }, [sortOrder]); // Include sortOrder in the dependency array to re-fetch movies when the sort order changes

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset currentPage to 1 when the search term changes
    };

    const handleSort = () => {
        // Toggle the sorting order
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    // Filtered movies based on search term
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
                <div className='text-center'>
                    <h1 className='text-center m-8 text-5xl'>KAZ top 10 Movies</h1>
                </div>
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

export default MovieCards;
