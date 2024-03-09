import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Eye } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';
const KinoView = () => {
    const [kino, setKino] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos/${id}`);
                setKino(movieResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    // const handleLikeVideo = async () => {
    //     try {
    //         // Make a request to increment the likes
    //         await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos/${id}?action=like`);

    //         // After incrementing likes, fetch updated movie details
    //         const updatedMovieResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos/${id}`);
    //         setKino(updatedMovieResponse.data);
    //     } catch (error) {
    //         console.error('Error liking video:', error);
    //     }
    // };
    if (loading) {
        return <Spinner />; // Show the spinner while loading
    }
    return (
        <div className='bg-gray-800'>
            <div className='mx-[20%] p-6'>
                <h2 className='text-2xl mx-auto text-gray-300 font-bold mb-4'>{kino.categoryName}</h2>
                <div className='w-[640px] h-[360px]'>
                    <ReactPlayer
                        url={`${process.env.REACT_APP_API_URL}/${kino.kino}`}

                        controls
                        playbackRate={1}
                        volume={1}
                    />
                </div>
                <div className='flex'>
                    {/* <div className='mt-5 mr-5 flex '>
                        <button onClick={handleLikeVideo} className=''><Heart /> </button>
                        <div className='my-auto'>
                            {kino.likes}
                        </div>
                    </div> */}
                    <div className='flex mt-5 mr-5 '>
                        <Eye className='mr-2' />
                        {kino.views}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KinoView;
