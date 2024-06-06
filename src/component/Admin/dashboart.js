// Dashboard.js
import React, { useState } from 'react';
import { MonitorPlay, Settings, HelpCircle, FileVideo, MessageCircle, UserRoundCog, User, MoveRight, MoveLeft, CircleUserRound, AreaChart, Clapperboard, BellRing, Home, FileVideo2 } from 'lucide-react'
import Form from '../controller/movieControl/createMovie';
import MovieController from '../controller/movieControl/controller';
import UserManagement from '../controller/userControl/userControl';
import Chart from '../Chart/Chart';
import Spinner from '../spinner/spinner';
import CommentDashboard from '../controller/commentControl/comment';
import VideoForm from '../controller/movieControl/createMovieVideo';

const Dashboard = ({ handleLogout, isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isControl, setIsControl] = useState(false);
    const [saitBar, setSiteBar] = useState(false);
    const [analise, setAnalise] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [comment, setComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [movieAdd, setMovieAdd] = useState(false);
    //spinner
    setTimeout(() => {
        setLoading(false);
    }, 200);
    //Menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    //Sitebar
    const toggleSlite = () => {
        setSiteBar(!saitBar);
    };
    //Form
    const openForm = () => {
        setIsFormOpen(true);
        setIsControl(false); // Close Movie Controller when opening Movie Create form
        setAnalise(false);
        setComment(false);
        setAdmin(false);
        setMovieAdd(false);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };
    //Form
    const openMovieAdd = () => {
        setMovieAdd(true);
        setIsFormOpen(false);
        setIsControl(false); // Close Movie Controller when opening Movie Create form
        setAnalise(false);
        setComment(false);
        setAdmin(false);
    };

    const closeMovieAdd = () => {
        setMovieAdd(false);
    };
    //Comment
    const openComment = () => {
        setComment(true);
        setMovieAdd(false);
        setIsFormOpen(false);
        setIsControl(false); // Close Movie Controller when opening Movie Create form
        setAnalise(false);
        setAdmin(false);
    };

    const closeComment = () => {
        setComment(false);
    };

    //Admin
    const openAdmin = () => {
        setAdmin(true);
        setIsFormOpen(false);
        setMovieAdd(false);
        setComment(false);
        setIsControl(false); // Close Movie Controller when opening Movie Create form
        setAnalise(false);
    };

    const closeAdmin = () => {
        setAdmin(false);
    };
    //MovieControll
    const openControl = () => {
        setIsControl(true);
        setMovieAdd(false);
        setAdmin(false);
        setComment(false);
        setIsFormOpen(false);
        setAnalise(false);
    };

    const closeControl = () => {
        setIsControl(false);
    };

    //Chart
    const openAnalis = () => {
        setAnalise(true)
        setAdmin(false);
        setMovieAdd(false);
        setComment(false);
        setIsControl(false);
        setIsFormOpen(false); // Close Movie Create form when opening Movie Controller
    };

    const closeAnalis = () => {
        setAnalise(false);
    };

    // get user data



    //Che
    //Logout
    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, '_self');
    };
    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex h-auto bg-gray-100  ">

                    {saitBar && (
                        <aside className={` h-screen sm1:top-0 sm1:fixed lg:top-0 lg:sticky lg:block bg-blue-400 sm1:pt-10 sm:pt-10 md:pt-10 lg:pt-10 text-white lg:w-1/5 p-4  transition-transform transform ${saitBar ? 'translate-x-0' : '-translate-x-full'}`}>
                            <div className='lg:top-0  lg:sticky' >
                                <h1 className="text-2xl font-bold mb-4 flex sm:mt-5 lg:mt-0 "> <Clapperboard className='my-auto mr-3' size={30} />Dashboard</h1>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2 "> Admin</h2>
                                    <ul>
                                        <li className='py-2'>
                                            <a href='/profile' className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                                                <User className='mr-2' />     Profile
                                            </a>
                                        </li>

                                        <li className="lg:text-white py-0 sm1:text-white no-underline" >

                                            <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={openAdmin}>
                                                <UserRoundCog className='mr-2' /> User Management
                                            </div>

                                        </li>


                                        <li className='py-2'>
                                            <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                                                <Settings className='mr-2' />     Settings
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold mb-2">Movie</h2>
                                    <ul>
                                        <li className='py-2'>
                                            <button className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={openControl} >
                                                <MonitorPlay className='mr-2' />  Movie Control
                                            </button>
                                        </li>
                                        <li className='py-2'>
                                            <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={openForm} >
                                                <FileVideo className='mr-2' /> Movie Create
                                            </div>
                                        </li>
                                        <li className='py-2'>
                                            <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={openMovieAdd} >
                                                <FileVideo2 className='mr-2' /> Movie Add
                                            </div>
                                        </li>
                                        <li className='py-2'>
                                            <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={openComment}>
                                                <MessageCircle className='mr-2' />  Comment
                                            </div>
                                        </li>
                                        <li className='py-2'>
                                            <button onClick={openAnalis} className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                                                <AreaChart className='mr-2' /> Analise
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className='flex '>
                                        <h2 className="text-lg font-semibold mb-4 ">Help</h2>
                                    </div>
                                    <ul>
                                        <div className='flex flex-row'>
                                            <li className=''>
                                                <div className='flex w-full py-1 px-1  text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>
                                                    <HelpCircle className='mr-2' />     Help
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    )}


                    <main className={`flex-1 lg:container sm1:mx-5  lg:mx-auto lg:p-4 `}>
                        <div className="top-0 sticky bg-blue-400 text-white ">
                            <div className="sm1:ml-5  mt-1 absolute">
                                <button onClick={toggleSlite} className="text-white p-2  bg-blue-400 rounded-md">
                                    {saitBar ? < MoveLeft /> : <MoveRight />}
                                </button>
                            </div>
                            <nav className=" bg-blue-400 py-2">
                                <ul className={`flex space-x-4 justify-end mx-[10%] ${isOpen ? 'menu-open' : ''}`}>
                                    <li className="lg:text-white py-1 sm1:text-white no-underline" >
                                        <a href='/'>
                                            <Home className='mr-4' />
                                        </a>
                                    </li>
                                    <li className="lg:text-white py-1 sm1:text-white no-underline" >
                                        <BellRing className='mr-4' />
                                    </li>
                                    <li className="lg:text-white py-1 sm1:text-white no-underline" onClick={toggleMenu}>
                                        <CircleUserRound />
                                    </li>
                                    {isOpen && (
                                        <div className='absolute mt-[4%] py-2 mx-2 rounded-sm bg-blue-400 sm1:left-[40%] sm:left-[65%] md:left-[70%] lg:left-[70%]  right-[10%] shadow-lg' >

                                            <div className='mx-0 '>

                                                <button className='w-full py-2 px-4 mb-2 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300'>About</button>



                                                <button className='w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300 relative' onClick={openAdmin}>
                                                    Management
                                                </button>



                                                <button className='w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300' onClick={handleLogout}>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>

                                    )}
                                </ul>
                            </nav>
                        </div>
                        {/* Widget 1 */}
                        <div className="bg-white mx-auto h-auto rounded-md shadow-md mt-4 py-4 mb-4">
                            <h2 className="text-lg font-semibold  mb-10">
                                {admin && <UserManagement onCloseAdmin={closeAdmin} />}
                                {isFormOpen && <Form onCloseForm={closeForm} />}
                                {movieAdd && <VideoForm onCloseMovieAdd={closeMovieAdd} />}
                                {isControl && <MovieController onCloseControl={closeControl} />}
                                {analise && <Chart onCloseAnalise={closeAnalis} />}
                                {comment && <CommentDashboard onCloseComment={closeComment} />}
                            </h2>
                            {/* Your other widgets */}
                        </div>
                    </main>
                </div >
            )}
        </div>
    );
};

export default Dashboard;
