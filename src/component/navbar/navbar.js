// Import the necessary dependencies
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../images/movies1.png';
import Button from '../button/button';
import Mobile from './mobileNavbar';
import Profilebutton from '../button/profileButton';
import axios from 'axios';
import Drop from './dropdown';


const Navbar = (userDetails) => {
    const [auth, setAuth] = useState([]);
    const location = useLocation();
    const currentRoute = location.pathname;
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user`).then((res) => {
            setAuth(res.data.data.filter(item => item.email).map(item => item.email))
        })
            .catch((err) => { console.log(err) })
    }, [])

    const user = userDetails.user;


    const isAuth = () => {
        if (!user || !user.email) {
            return false; // User is empty or email is not available
        } else if (auth.includes(user.email)) {
            return true; // User's email is in the auth array
        } else {
            return false; // User is not authenticated
        }
    }


    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header
            className={`z-10 bg-white w-[100%] p-0 m-0 top-0  sticky  border `}
            style={{
                display:
                    ['/login', '/create/movie', '/profile', '/movie/controller'].includes(
                        currentRoute
                    ) || currentRoute.startsWith('/update/movie')
                        ? 'none'
                        : 'block',
            }}
        >
            <div>
                <div className='hidden lg1:block m-0 '>
                    <nav className={`container flex `}>
                        <div className='flex-none m-2 p-0'>
                            <a href='/'>
                                <img className='h-10' src={Logo} alt='Logo' />
                            </a>
                        </div>
                        <div className='flex-1 w-64 m-1.5 pl-0'>
                            <ul className='font-extralight text-md flex items-center gap-[1vw] m-3'>
                                <li className='text-black'><a href='/series'>SERIES</a></li>
                                <li className='text-black'><a href='/movies'>MOVIES</a></li>
                                <li className='text-black'><a href='/new&last'>NEW&LAST CHANCE</a></li>
                                <li className='text-black'><a href='/schedule'>SCHEDULE</a></li >
                                <li className='text-black'><a href='/comingsoon'>FREE EPISODES</a></li >
                                <li className='text-black'><Drop /></li >
                            </ul >
                        </div >
                        <div className='my-auto'>
                            {isAuth() ? <Profilebutton /> : <Button />}
                        </div>
                    </nav >
                </div>
                <div className={`lg1:hidden sm:w-full bg-white `}>
                    <div className='flex sm:w-full bg-white'>
                        <button
                            className={`sm:mx-3 sm:my-2 p-0 text-black`}
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                        <a className=' mx-0 p-0 ' href='/'>
                            <img className='h-11' src={Logo} alt='Logo' />
                        </a>
                        <div className='md:ml-auto md1:ml-auto md:mr-2 md:my-0 sm:mr-5 sm:ml-auto'>
                            {isAuth() ? <Profilebutton /> : <Button />}
                        </div>
                    </div>
                    {isOpen && (
                        <div>
                            <Mobile />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
