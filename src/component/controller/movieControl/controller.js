import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, MoveLeft } from 'lucide-react';
import Spinner from '../../spinner/spinner';

const MovieController = ({ onCloseControl }) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then(res => {
                setMovies(res.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const handleDeleteClick = (movieId) => {
        // Use window.confirm to show a confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

        if (confirmDelete) {
            // Send a delete request to the server
            axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/movies/${movieId}`)
                .then(() => {
                    // Remove the deleted movie from the state
                    setMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
                    alert('Movie deleted successfully!');
                })
                .catch(err => {
                    console.error('Error deleting movie:', err);
                    alert('Error deleting movie. Please try again.');
                });
        }
    };


    //Spinner
    setTimeout(() => {
        setLoading(false);
    }, 100)
    return (
        <div>
            {loading ? (<Spinner />) : (
                <div className='lg1:container'>
                    <div className='  w-auto divide-y divide-gray-200'>
                        <ul className=''>
                            <table className="my-5 w-full ">
                                <thead className='text-center'>
                                    <tr>
                                        <th className='border'>Image</th>
                                        <th className='border'>Title</th>
                                        <th className='border'>Edit</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {movies.map(movie => (
                                        <tr className='border' key={movie._id}>
                                            <td className="flex  justify-center"> {/* Center the content */}
                                                <img className='h-[50px] w-[40px] my-2 rounded-lg shadow-lg object-cover' src={`${process.env.REACT_APP_API_URL}/${movie.posterUrl}`} alt={movie.title} />
                                            </td>
                                            <td className='text-left pl-5 pr-40 border font-thin align-middle'>
                                                {movie.title}
                                            </td>
                                            <td className=' '>
                                                <button className='p-1 my-1 rounded-md mx-2 hover:bg-gray-100 hover:text-blue-400 text-black shadow-lg bg-blue-400'>
                                                    <Link to={`/update/movie/${movie._id}`}>
                                                        <Pencil />
                                                    </Link>
                                                </button>
                                                <button className='p-1 my-1  rounded-md mx-2 hover:bg-gray-100 hover:text-red-400 text-black shadow-lg bg-red-400'
                                                    onClick={() => handleDeleteClick(movie._id)}>
                                                    <Trash2 className='' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>

                        </ul>
                    </div>
                    <button type="button" onClick={onCloseControl} className=" flex flex-row mx-2 px-2 py-1 my-3 text-black hover:bg-gray-200 rounded-md">
                        <MoveLeft />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieController;
