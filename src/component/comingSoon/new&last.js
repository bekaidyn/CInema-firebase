import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../carts/Search'; // Import your SearchInput component
import Pagination from '../carts/pagination'; // Import your Pagination component
import axios from 'axios';

const NewAndLast = () => {
    const [latestMovies, setLatestMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        // Assuming you have an API endpoint for fetching the latest movies
        const fetchLatestMovies = async () => {
            try {
                const latestMoviesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`);
                setLatestMovies(latestMoviesResponse.data);
            } catch (error) {
                console.error('Error fetching latest movies:', error);
            }
        };

        fetchLatestMovies();
    }, []);

    const isNewMovie = (movieId) => latestMovies.includes(movieId);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset currentPage to 1 when the search term changes
    };

    const itemsPerPage = 10

    const handleSort = () => {
        // Toggle the sorting order
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        // Sort the movies based on the selected order
        const sortedMovies = [...latestMovies].sort((a, b) => {
            const checkA = typeof a.title === 'string' ? a.title.toLowerCase() : String(a.title);
            const checkB = typeof b.title === 'string' ? b.title.toLowerCase() : String(b.title);
            return newSortOrder === 'asc' ? checkA.localeCompare(checkB) : checkB.localeCompare(checkA);
        });

        setLatestMovies(sortedMovies);
        setCurrentPage(1); // Reset currentPage to 1 after sorting
    };

    const filteredData = latestMovies.filter((data) => {
        return data.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className='lg:mx-[7%]'>
            <div className='relative'>
                <div className='box-border border-2 w-auto divide-y divide-gray-200'>
                    <div className='mr-10 flex my-2'>
                        <button className="button mx-2 border-2 p-1 bg-gray-300" onClick={handleSort}>
                            Sort {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                        <form className="mx-5" onSubmit={(e) => e.preventDefault()}>
                            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                        </form>
                    </div>
                    <ul className='flex flex-wrap'>
                        {currentItems.map((movie) => (
                            <li key={movie._id} className='border-2 sm:w-1/2 md:w-1/3 lg1:w-1/4 text-xl font-light'>
                                <Link to={`/movie/detail/${movie._id}`}>
                                    <div className='rounded-md p-3'>
                                        <img className='h-[380px] w-[300px] rounded-lg shadow-lg object-cover' src={`${process.env.REACT_APP_API_URL}/${movie.posterUrl}`} alt='' />
                                    </div>
                                    <h1 className={`p-3 text-white bg-gray-800 ${isNewMovie(movie._id) ? 'border-2 border-yellow-400' : ''}`}>
                                        {movie.title} {isNewMovie(movie._id) && <span className="text-xs bg-yellow-400 px-1 ml-1">New</span>}
                                    </h1>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='border-2 mt-4'>
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
export default NewAndLast;