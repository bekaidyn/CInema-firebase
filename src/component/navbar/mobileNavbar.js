import React from 'react'

export default function Mobile() {
    return (
        <div className={` bg-white w-full `}>
            <ul className={`   flex flex-col   divide-y divide-blue-200`}>
                <li className='text-black m-2 '><a href='/series'>SERIES</a></li>
                <li className='text-black m-2 '><a href='/movies'>MOVIES</a></li>
                <li className='text-black m-2 '><a href='/new&last'>NEW&LAST CHANCE</a></li>
                <li className='text-black m-2 '><a href='/schedule'>SCHEDULE</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>FREE EPISODES</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>MORE</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>DOCMENTARIES</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>SPECIALS</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>SPORTS</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>PODCATS</a></li>
                <li className='text-black m-2 '><a href='/comingsoon'>MAX</a></li>
            </ul>
        </div>
    )
}
