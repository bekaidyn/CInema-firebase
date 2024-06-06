import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../images/movies1.png';
// import Button from '../button/button';
import Mobile from './mobileNavbar';
import Drop from './dropdown';


const Navbar = ({ handleLogout, isLoggedIn }) => {

    const location = useLocation();
    const currentRoute = location.pathname;
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
                        <div className='flex-none my-2 p-0'>
                            <a href='/'>
                                <img className='h-10' src={Logo} alt='Logo' />
                            </a>
                        </div>
                        <div className='flex-1 w-64 my-1.5  pl-0 '>
                            <ul className="font-extralight text-md flex items-center gap-[1vw]  my-3">
                                <li className="text-black"><Link to="/series">SERIES</Link></li>
                                <li className="text-black"><Link to="/movies">MOVIES</Link></li>
                                <li className="text-black"><Link to="/new&last">NEW&LAST CHANCE</Link></li>
                                <li className="text-black"><Link to="/schedule">SCHEDULE</Link></li>
                                <li className="text-black"><Link to="/comingsoon">FREE EPISODES</Link></li>
                                <li className="text-black"><Drop /></li>
                            </ul>
                        </div >
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="my-auto text-black">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="my-auto text-black">
                                Login
                            </Link>
                        )}
                        {/* <div className='my-auto'>
                            <Button />
                        </div> */}
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
                        {/* <div className='md:ml-auto md1:ml-auto md:mr-2 md:my-0 sm:mr-5 sm:ml-auto'>
                            <Button />
                        </div> */}
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
