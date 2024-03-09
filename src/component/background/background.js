import React, { useState, useEffect } from 'react';
import Trailer from '../button/trailerButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Background = () => {
    const [bgImage, setBgImage] = useState('');
    const { id } = useParams('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then((res) => {
                const randomMovie = res.data[Math.floor(Math.random() * res.data.length)];
                setBgImage(randomMovie);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <section>
            {bgImage && (
                <div>
                    <div className='w-auto '>
                        <img className='w-full  lg:h-screen' src={`${process.env.REACT_APP_API_URL}/${bgImage.backgroundUrls[1]}`} alt='Small' />
                    </div>
                    <div className='backdrop-brightness-[110%] w-full pl-[10%] px-[15%] pb-20 lg:top-[40%] lg1:absolute lg1:top-[30%] lg1:pl-[10%] lg1:text-white lg1:text-left sm:text-center sm:relative sm:text-gray-800 sm:p-0 sm:text-xs'>
                        <div className="sm:m-2 font-extralight">SUNDAYS AT 9 PM</div>
                        <h1 className='text-5xl sm:my-3'><strong>{bgImage.title}</strong></h1>
                        <p className="sm:text-base sm:m-4 font-extralight">From Downton Abbey creator Julian Fellowes comes this drama that follows a young woman living in New York City's glittering Gilded Age.</p>
                        <Trailer />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Background;