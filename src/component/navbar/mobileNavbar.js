import React from 'react'
import { Link } from 'react-router-dom';
export default function Mobile() {
    return (
        <div className={` bg-white w-full `}>
            <ul className={`   flex flex-col   divide-y divide-blue-200`}>
                <li className="text-black m-2"><Link to="/series">SERIES</Link></li>
                <li className="text-black m-2"><Link to="/movies">MOVIES</Link></li>
                <li className="text-black m-2"><Link to="/new&last">NEW&LAST CHANCE</Link></li>
                <li className="text-black m-2"><Link to="/schedule">SCHEDULE</Link></li>
                <li className="text-black m-2"><Link to="/comingsoon">FREE EPISODES</Link></li>
                <li className='text-black m-2 '><Link to="/comingsoon">DOCMENTARIES</Link></li>
                <li className='text-black m-2 '><Link to="/comingsoon">SPECIALS</Link></li>
                <li className='text-black m-2 '><Link to="/comingsoon">SPORTS</Link></li>
                <li className='text-black m-2 '><Link to="/comingsoon">PODCATS</Link></li>
                <li className='text-black m-2 '><Link to="/comingsoon">MAX</Link></li>
            </ul>
        </div>
    )
}
