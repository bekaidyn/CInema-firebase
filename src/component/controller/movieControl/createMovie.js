import React, { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import Spinner from '../../spinner/spinner';
import axios from 'axios';

export default function Form({ onCloseForm }) {
    const [loading, setLoading] = useState(true);
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [posterImage, setPosterImage] = useState(null);
    const [movieDetails, setMovieDetails] = useState({
        title: '',
        year: '',
        released: '',
        rated: '',
        runtime: '',
        genre: '',
        director: '',
        writer: '',
        actors: '',
        plot: '',
        language: '',
        country: '',
        type: '',
        awards: '',
    });

    const handleFileChange = (event, type) => {
        const files = Array.from(event.target.files);

        if (type === 'background') {
            setBackgroundImages([...backgroundImages, ...files]);
        } else {
            setPosterImage(files[0]);
        }
    };

    const handleRemoveImage = (index, type) => {
        if (type === 'background') {
            const newImages = [...backgroundImages];
            newImages.splice(index, 1);
            setBackgroundImages(newImages);
        } else {
            setPosterImage(null);
        }
    };

    const handleChange = (event, field) => {
        setMovieDetails({ ...movieDetails, [field]: event.target.value });
    };

    const handleUpload = async () => {
        // const requiredFields = ['title', 'year', 'rated', 'runtime', 'director', 'writer', 'actors',  'plot', 'awards',]; 
        // Add other required fields as needed
        const requiredFields = ['title', 'year', 'rated', 'runtime', 'director', 'writer', 'actors', 'plot', 'language', 'country', 'type', 'released', 'awards'];  // Add other required fields as needed

        const missingFields = requiredFields.filter(field => {
            if (field === 'released') {
                return !movieDetails[field] || isNaN(new Date(movieDetails[field]).getTime());
            }
            return !movieDetails[field];
        });

        if (missingFields.length > 0 || !posterImage || backgroundImages.length === 0) {
            const missingFieldsMessage = missingFields.length > 0
                ? `The following fields are required: ${missingFields.join(', ')}`
                : '';
            const missingImagesMessage = !posterImage
                ? 'Poster image is required.'
                : (backgroundImages.length === 0
                    ? 'At least one background image is required.'
                    : '');

            alert(`${missingFieldsMessage}\n${missingImagesMessage}`);
            return;
        }

        // Show confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to save?");

        // Proceed with upload only if the user confirms
        if (userConfirmed) {
            try {
                const formData = new FormData();

                // Append background images
                if (backgroundImages) {
                    const backgroundImagesArray = Array.from(backgroundImages);
                    backgroundImagesArray.forEach((file) => formData.append('background', file));
                }

                // Append poster image
                if (posterImage) {
                    formData.append('posterImage', posterImage);
                }

                // Append movie details
                Object.entries(movieDetails).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Use axios to make the POST request
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/movies/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    window.location.reload();
                    console.log('Uploaded Images:', data);
                } else {
                    console.error('Failed to upload images');
                }

            } catch (error) {
                console.error('Error during image upload:', error);
            }
        } else {
            console.log('Upload canceled by user.');
        }
    };

    //spinner
    setTimeout(() => {
        setLoading(false);
    }, 100);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <form className='lg:container  sm:px-10'>
                    <div className='space-y-12'>
                        <div className="border-b border-gray-900/10 ">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 lg:gap-y-6 sm:gap-y-1 sm:grid-cols-6">

                                {/*Title*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="Title"
                                            value={movieDetails.title}
                                            onChange={(e) => handleChange(e, 'title')}
                                            autoComplete="given-name"
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter title'
                                        />
                                    </div>
                                </div>

                                {/*Year*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieYear" className="block text-sm font-medium leading-6 text-gray-900">
                                        Year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id='year'
                                            type="text"
                                            name="Year"
                                            value={movieDetails.year}
                                            onChange={(e) => handleChange(e, 'year')}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter year'
                                        />
                                    </div>
                                </div>

                                {/*Date*/}
                                <div className="sm:col-span-full lg:col-span-2 ">
                                    <label htmlFor="movieReleased" className="block text-sm font-medium leading-6 text-gray-900">
                                        Released
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="Released"
                                            id="Released"
                                            value={movieDetails.released}
                                            onChange={(e) => handleChange(e, 'released')}
                                            className="block lg:w-full sm:w-[100%]  pl-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>

                                {/*Rate*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieRated" className="block text-sm font-medium leading-6 text-gray-900">
                                        Rated
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="Rated"
                                            id="Rated"
                                            value={movieDetails.rated}
                                            onChange={(e) => handleChange(e, 'rated')}
                                            className="block  pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter rated'
                                        />
                                    </div>
                                </div>

                                {/*RunTime*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieRuntime" className="block text-sm font-medium leading-6 text-gray-900">
                                        Runtime
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="Number"
                                            name="Runtime"
                                            id="Runtime"
                                            value={movieDetails.runtime}
                                            onChange={(e) => handleChange(e, 'runtime')}
                                            className="block  pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter runtime'
                                        />
                                    </div>
                                </div>

                                {/*Genr*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieGenre" className="block text-sm font-medium leading-6 text-gray-900">
                                        Genre
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Genre"
                                            name="Genre"
                                            value={movieDetails.genre}
                                            onChange={(e) => handleChange(e, 'genre')}
                                            className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="Drama">Drama</option>
                                            <option value="Horror">Horror</option>
                                            <option value="Sci-Fi">Sci-Fi</option>
                                            <option value="Action">Action</option>
                                            <option value="Comedy">Comedy</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Thriller">Thriller</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Adventure">Adventure</option>
                                        </select>
                                    </div>
                                </div>

                                {/*Actor*/}
                                <div className="sm:col-span-full lg:col-span-4">
                                    <label htmlFor="movieActors" className="block text-sm font-medium leading-6 text-gray-900">
                                        Actors
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="Actors"
                                            name="Actors"
                                            value={movieDetails.actors}
                                            onChange={(e) => handleChange(e, 'actors')}
                                            className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Write a kino Actors.'
                                        />
                                    </div>
                                </div>

                                {/*Language*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieLanguage" className="block text-sm font-medium leading-6 text-gray-900">
                                        Language
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Language"
                                            name="Language"
                                            value={movieDetails.language}
                                            onChange={(e) => handleChange(e, 'language')}
                                            className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >



                                            <option value="" disabled>Select</option>
                                            <option value="English">English</option>
                                            <option value="Jp">Japanese</option>
                                            <option value="Kaz">Kazakh</option>
                                            <option value="Kor">Korean</option>
                                            <option value="Mon">Mongolian</option>
                                            <option value="Rus">Russian</option>
                                            <option value="Esp">Spanish</option>
                                            <option value="Ger">German</option>
                                            <option value="Fra">French</option>
                                            <option value="Ita">Italian</option>
                                            <option value="Por">Portuguese</option>
                                            <option value="Chi">Chinese</option>
                                            <option value="Hin">Hindi</option>
                                            <option value="Arb">Arabic</option>
                                            <option value="Tur">Turkish</option>
                                            <option value="Dut">Dutch</option>
                                            <option value="Swi">Swedish</option>
                                            <option value="Gre">Greek</option>
                                            <option value="Pol">Polish</option>
                                            <option value="Tha">Thai</option>
                                        </select>
                                    </div>
                                </div>

                                {/*Director*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieDirector" className="block text-sm font-medium leading-6 text-gray-900">
                                        Director
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Director"
                                            name="Director"
                                            value={movieDetails.director}
                                            onChange={(e) => handleChange(e, 'director')}
                                            className="block w-full  pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter derector'
                                        />
                                    </div>
                                </div>

                                {/*Writer*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieWriter" className="block text-sm font-medium leading-6 text-gray-900">
                                        Writer
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Writer"
                                            name="Writer"
                                            type="text"
                                            value={movieDetails.writer}
                                            onChange={(e) => handleChange(e, 'writer')}
                                            className="block pl-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter writer'
                                        />
                                    </div>
                                </div>

                                {/*Country*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieCountry" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Country"
                                            name="Country"
                                            value={movieDetails.country}
                                            onChange={(e) => handleChange(e, 'country')}
                                            className="block w-full pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value='USA'>USA</option>
                                            <option value='Japan'>Japan</option>
                                            <option value='Kazakhstan'>Kazakhstan</option>
                                            <option value='Korea'>Korea</option>
                                            <option value='Mongolia'>Mongolia</option>
                                            <option value='Russia'>Russia</option>
                                            <option value='Canada'>Canada</option>
                                            <option value='Australia'>Australia</option>
                                            <option value='Germany'>Germany</option>
                                            <option value='France'>France</option>
                                            <option value='Italy'>Italy</option>
                                            <option value='Spain'>Spain</option>
                                            <option value='Brazil'>Brazil</option>
                                            <option value='India'>India</option>
                                            <option value='China'>China</option>
                                            <option value='Mexico'>Mexico</option>
                                            <option value='South Africa'>South Africa</option>
                                            <option value='Argentina'>Argentina</option>
                                            <option value='Nigeria'>Nigeria</option>
                                            <option value='Egypt'>Egypt</option>
                                        </select>
                                    </div>
                                </div>

                                {/*Plot*/}
                                <div className="sm:col-span-full lg:col-span-4">
                                    <label htmlFor="moviePlot" className="block text-sm font-medium leading-6 text-gray-900">
                                        Plot
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="Plot"
                                            name="Plot"
                                            rows={3}
                                            value={movieDetails.plot}
                                            onChange={(e) => handleChange(e, 'plot')}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Write description'
                                        />
                                    </div>
                                </div>

                                {/*Type*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieType" className="block text-sm font-medium leading-6 text-gray-900">
                                        Type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Type"
                                            value={movieDetails.type}
                                            onChange={(e) => handleChange(e, 'type')}
                                            className="block w-full pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="TV Show">TV Show</option>
                                            <option value="Documentaries">Documentaries</option>
                                            <option value="Movies">Movies</option>
                                            <option value="Series">Series</option>
                                            <option value="Animation">Animation</option>
                                            <option value="Biography">Biography</option>
                                            <option value="Family">Family</option>
                                            <option value="History">History</option>
                                            <option value="Musical">Musical</option>
                                            <option value="Sport">Sport</option>
                                            <option value="War">War</option>
                                            <option value="Western">Western</option>
                                            <option value="Crime">Crime</option>
                                            <option value="Sci-Fi">Sci-Fi</option>
                                            <option value="Fantasy">Fantasy</option>
                                        </select>
                                    </div>
                                </div>

                                {/*Awards*/}
                                <div className="sm:col-span-full ">
                                    <label htmlFor="movieAwards" className="block text-sm font-medium leading-6 text-gray-900">
                                        Awards
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="text"
                                            name="Awards"
                                            type="Awards"
                                            value={movieDetails.awards}
                                            onChange={(e) => handleChange(e, 'awards')}
                                            className="block w-full pl-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter awards'
                                        />
                                    </div>
                                </div>

                                {/*Poster new*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Poster photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            {posterImage && (
                                                <div className='px-2  py-2'>
                                                    <img
                                                        src={URL.createObjectURL(posterImage)}
                                                        alt="Poster"
                                                        className=" h-20 w-[80px]  mx-auto object-cover rounded-md flex flex-wrap "
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(0, 'poster')}
                                                        className=" text-gray-400 hover:text-gray-300 bg-opacity-100  p-1 cursor-pointer"
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                            )}
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-uploadP"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <label htmlFor={`poster`} >Poster </label>
                                                    <input type="file" id='poster' className='hidden' accept="image/*" onChange={(e) => handleFileChange(e, 'poster')} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/*Backgrounf img*/}
                                <div className="sm:col-span-full lg:col-span-4">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Background Images
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center ">
                                            <div className='flex flex-row '>

                                                {backgroundImages.length > 0 && (
                                                    <div className=' px-2 py-2 '>

                                                        <div className="  w-[500px] flex flex-wrap ">
                                                            {backgroundImages.map((image, index) => (
                                                                <div key={index} className='    '>
                                                                    <img
                                                                        src={URL.createObjectURL(image)}
                                                                        alt={`Background ${index + 1}`}
                                                                        className=" h-20 w-[80px]  mx-2 object-cover rounded-md flex flex-wrap "
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveImage(index, 'background')}
                                                                        className=" text-gray-400 hover:text-gray-300 bg-opacity-100  p-1 cursor-pointer"
                                                                    >
                                                                        delete
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-4 flex    text-sm leading-6  text-gray-600">
                                                <label

                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <label htmlFor={`Background`} className=''>
                                                        Upload files
                                                    </label>


                                                    <input
                                                        id='Background'
                                                        type="file"
                                                        className='hidden'
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => handleFileChange(e, 'background')}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*Button*/}
                    <div className='flex flex-row'>
                        <button type='button' className='px-4 py-1 mx-2 my-3 flex flex-row bg-[#50C878] text-white hover:bg-gray-300 rounded-md' onClick={handleUpload}>
                            <Save /> Save
                        </button>
                        <button type="button" onClick={onCloseForm} className=" flex flex-row mx-2 px-2 py-1 my-3 bg-[#C0C0C0] text-white hover:bg-gray-200 rounded-md">
                            <RotateCcw /> Bcak
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
};