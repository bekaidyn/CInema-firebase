import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import Spinner from '../spinner/spinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
import { Star } from 'lucide-react';

const MovieDetails = () => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [background, setBackground] = useState([]);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [comments, setComments] = useState([]);
    const [kinoData, setKinoData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);

    const handleStarClick = (starIndex) => {
        // Set the rating when a star is clicked
        setRating(starIndex + 1);
    };

    //get current movie data
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/${id}`);
                setMovie(movieResponse.data);
                setBackground(movieResponse.data.backgroundUrls);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    //get current datas kino
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos`)
            .then((res) => {
                setKinoData(res.data);

            })
            .catch((err) => console.log(err));
    }, []);
    console.log(kinoData)
    //get current movie datas comment
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment?movieId=${id}`)
            .then((res) => {
                setComments(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);


    //commet
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    //handle userName add
    const handleUserChange = (e) => {
        setUser(e.target.value);
    };
    //handle email add
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAddComment = async () => {
        if (comment.trim() !== '' && user.trim() !== '' && email.trim() !== '') {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment`, {
                    movieId: id, // Include the movieId parameter
                    user: user,
                    email: email,
                    comment: comment,
                });


                console.log('Comment posted successfully:', response.data);

                // Update the commentsList state with the new comment
                setCommentsList([...commentsList, { user, comment }]);
                setUser('');
                setEmail('');
                setComment('');
            } catch (error) {
                console.error('Error posting comment:', error.response ? error.response.data : error.message);
            }
        }
    };

    // views function
    const handleWatchVideo = async (kinoId) => {
        try {
            // Make a request to increment the views for the specific kino
            await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos/${kinoId}?action=watch`);

            // After incrementing views, fetch updated movie details
            const updatedMovieResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/${id}`);
            setMovie(updatedMovieResponse.data);
        } catch (error) {
            console.error('Error watching video:', error);
        }
    };


    // Background slide
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    //back function
    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-800">
            {loading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto p-4">
                    <div>
                        {/*Backbutton */}
                        <button onClick={handleButtonClick} className="text-black w-10 my-3 py-2 px-3 rounded-md hover:bg-gray-200">
                            <MoveLeft />
                        </button>
                        {/*Movie details*/}
                        <div className="flex lg:flex-row sm:flex-col">
                            <div className="lg:w-[50%] h-[400px] my-5 mx-left">
                                <Slider {...settings}>
                                    {background.map((image, index) => (
                                        <div key={index}>
                                            <img src={`${process.env.REACT_APP_API_URL}/${image}`} alt={`Slide ${index + 1}`} className="w-full h-[400px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 rounded-lg" />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="lg:ml-[5%] p-4 bg-gray-100 opacity-60 rounded-lg shadow-md">
                                <div className=" mx-[5%] p-4 bg-gray-100 opacity-60 rounded-lg shadow-md  ">
                                    <h2 className="text-2xl font-bold mb-2   ">{movie.title}</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p>
                                                <span className="font-semibold">Year:</span> {movie.year}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Runtime:</span> {movie.runtime}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Genre:</span> {movie.genre}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Rated:</span> {movie.rated}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <span className="font-semibold">Director:</span> {movie.director}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Actors:</span> {movie.actors}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Language:</span> {movie.language}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Country:</span> {movie.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p>
                                            <span className="font-semibold">Type:</span> {movie.type}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Awards:</span> {movie.awards}
                                        </p>
                                        <p>
                                            <span className="font-semibold "> Plot:</span>{movie.plot}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex my-5 flex-col lg:flex-row'>
                        {/*Trailer  */}
                        <div className='mx-[10%]'>
                            {kinoData.map((kino) => (
                                <div key={kino._id} className=' my-[2%]' >
                                    <div
                                        className={` ${kino.categoryId === movie._id ? '' : 'hidden'}`}
                                    >
                                        <h1 className='text-2xl mx-auto text-gray-300 font-bold mb-4'>Trailer {kino.categoryName}</h1>
                                        <div className='w-[640px] h-[360px]'>
                                            <ReactPlayer
                                                url={`${process.env.REACT_APP_API_URL}/${kino.trailer}`}
                                                controls
                                                playbackRate={1}
                                                volume={1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div >
                            <div className="mt-10 flex justify-center ">
                                {kinoData.map((kino) => (
                                    <div key={kino._id}>
                                        <Link to={`/movie/detail/kino/${kino._id}`}>
                                            <button onClick={() => handleWatchVideo(kino._id)}
                                                className={`bg-blue-600 px-20 py-5 rounded-md hover:bg-blue-400 ${kino.categoryId === movie._id ? '' : 'hidden'}`}
                                            >
                                                Watch kino
                                                <div className=' font-bold'>
                                                    {kino.categoryName}
                                                </div>
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='flex mt-[20%] '>
                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                    <Star
                                        key={starIndex}
                                        onClick={() => handleStarClick(starIndex)}
                                        color={starIndex <= rating ? 'gold' : 'gray'} // Change color based on the rating
                                        size={24}
                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                    />
                                ))}
                                <p>Your rating: {rating}</p>
                            </div>
                        </div>
                    </div>
                    {/*Comment section */}
                    <div className="my-5 container">
                        <div className='flex sm:flex-col lg:flex-row'>
                            <div className=''>
                                <h2 className="text-2xl font-bold mb-2">Comment Section</h2>
                                <textarea
                                    rows="5"
                                    cols="50"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    placeholder="Enter your comment"
                                    className="border rounded p-2 mb-2 lg:w-[600px] sm:w-full"
                                ></textarea>
                            </div>

                            <div className='flex flex-col sm:w-auto lg:w-[40%] lg:mx-[5%]'>
                                <div className='flex flex-col mt-2 mb-6'>
                                    <label className='font-bold mb-2'>Name</label>
                                    <input className='py-2 rounded-md pl-2 border' value={user} onChange={handleUserChange} placeholder='Name' type='text' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-bold mb-2'>Email</label>
                                    <input value={email} onChange={handleEmailChange} className='py-2 rounded-md pl-2 border' placeholder='Email' type='text' />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleAddComment} className="bg-blue-600 px-4 py-2 my-5 rounded-md hover:bg-blue-400 text-white">Add Comment</button>
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">Comments:</h3>
                            <ul className="list-none pl-4 bg-blue-700 ">
                                {comments.map((c, index) => (
                                    <li key={index} className="mb-2">
                                        <div className='p-5 bg-blue-700 rounded-lg '>
                                            <p className='text-white font-semibold'>User: {c.user}</p>
                                            <p className='pl-4 py-2 bg-blue-600 text-white rounded-md'>{c.comment}</p>
                                        </div>
                                    </li>
                                ))}
                                {commentsList.map((c, index) => (
                                    <li key={index} className="mb-2">
                                        <div className='p-5 bg-blue-700 rounded-lg '>
                                            <p className='text-white font-semibold'>User: {c.user}</p>
                                            <p className='pl-4 py-2 bg-blue-600 text-white rounded-md'>{c.comment}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
