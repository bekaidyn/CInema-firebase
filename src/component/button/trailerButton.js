import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Trailer = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then((res) => {
                setMovies(res.data);
            })
            .catch(err => {
                console.error('Error fetching movies:', err);
            });
    }, []);

    console.log(movies)
    return (
        <div className='lg1: lg1:my-5 lg1:mx-auto flex sm:flex-col'>
            {movies.map(movie => (
                <div >
                    <Link key={movie._id} to={`/movie/detail/${movie._id}`}>
                        <button className='lg1:absolute lg1:mr-0 sm:relative sm:m-2 bg-[#2bb0d8] hover:bg-w-blue-300 p-2 text-sm text-white'>
                            &#9658; Watch the trailer
                        </button>
                        <button className='lg1:absolute text-sm sm:m-2 lg1:mx-[20%] sm:relative bg-[#2bb0d8] hover:bg-w-blue-300 p-2 lg1:ml-40 text-white'>
                            Find out more
                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Trailer;