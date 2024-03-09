import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import Spinner from '../../spinner/spinner';
function MovieUpdate(userDetails) {
  const [loading, setLoading] = useState(true);
  const [poster, setPoster] = useState(null);
  const [movie, setMovie] = useState({
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
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/${id}`)
      .then((res) => { setMovie(res.data) })
      .catch(err => console.log(err));
  }, [id]);

  // Function to handle changes in input fields.
  // It takes an event object (e) as a parameter, which contains information about the input change.
  const handleChange = (e) => {
    // Destructuring the 'name' and 'value' properties from the input event.
    const { name, value } = e.target;

    // The previous state (prevMovies) is spread to keep the existing properties, and the property with the 'name' is updated with the new 'value'.
    setMovie((prevMovies) => ({
      ...prevMovies,
      [name]: value,
    }));
  };


  // Function to handle changes in the input of a file (e.g., file input for a poster image).
  // It takes an event object (e) as a parameter, which contains information about the selected file.
  const handlePosterFileChange = (e) => {
    // Extracting the first file from the selected files array (assuming single file selection).
    const file = e.target.files[0];

    // Updating the 'poster' state with the selected file.
    setPoster(file);
  };




  const handleUpdate = () => {
    const formData = new FormData();

    // Append updated movie data to formData
    formData.append('title', movie.title);
    formData.append('year', movie.year);
    formData.append('released', movie.released);
    formData.append('rated', movie.rated);
    formData.append('runtime', movie.runtime);
    formData.append('genre', movie.genre);
    formData.append('director', movie.director);
    formData.append('writer', movie.writer);
    formData.append('actors', movie.actors);
    formData.append('plot', movie.plot);
    formData.append('language', movie.language);
    formData.append('country', movie.country);
    formData.append('type', movie.type);
    formData.append('awards', movie.awards);
    // Append new poster if it's selected
    if (poster) {
      formData.append('posterImage', poster);
    }



    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/movies/${id}`, formData)
      .then((res) => {
        console.log("Update successful. Response:");
      })
      .catch((err) => {
        console.error("Update failed. Error:", err);
      });
  };

  const navigate = useNavigate();


  const handleButtonClick = () => {
    navigate('/create/movie');
  };





  //spinner
  setTimeout(() => {
    setLoading(false);
  }, 100);



  return (
    <form>
      {loading ? (<Spinner />) : (
        <div className='mx-[10%]'>
          <div className='flex justify-center mt-5 w-[50%] gap-[75%]'>
            <button className=' my-auto hover:bg-gray-200 px-2 py-1' onClick={handleButtonClick}><MoveLeft /></button>
            <h1 className=' font-semibold my-auto '>Movie Update</h1>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-6 lg:gap-y-6 sm:gap-y-1 sm:grid-cols-6">
            {/* Title */}
            <div className="sm:col-span-full lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id='title'
                  type="text"
                  name="title"
                  value={movie.title}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/*Year*/}
            <div className="sm:col-span-full lg:col-span-2">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                Year
              </label>
              <div className="mt-2">
                <input
                  id='year'
                  type="text"
                  name="year"
                  value={movie.year}
                  onChange={handleChange}
                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/*Date*/}
            <div className="sm:col-span-full lg:col-span-2">
              <label htmlFor="movieReleased" className="block text-sm font-medium leading-6 text-gray-900">
                Released
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="released"
                  value={movie.released}
                  onChange={handleChange}
                  className="block lg:w-[100%] sm:w-[100%]  pl-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  name="rated"
                  id="Rated"
                  value={movie.rated}
                  onChange={handleChange}
                  className="block  pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  type="text"
                  name="runtime"
                  id="Runtime"
                  value={movie.runtime}
                  onChange={handleChange}
                  className="block  pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/*Genr*/}
            <div className="sm:col-span-full lg:col-span-2">
              <label htmlFor="movieYear" className="block text-sm font-medium leading-6 text-gray-900">
                Genre
              </label>
              <div className="mt-2">
                <select
                  name="genre"
                  value={movie.genre}
                  onChange={handleChange}
                  className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value='' disabled>Select Role</option>
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
                  name="actors"
                  value={movie.actors}
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a kino Actors.</p>
            </div>
            {/*Language*/}
            <div className="sm:col-span-full lg:col-span-2">
              <label htmlFor="movieLanguage" className="block text-sm font-medium leading-6 text-gray-900">
                Language
              </label>
              <div className="mt-2">
                <select
                  name="language"
                  value={movie.language}
                  onChange={handleChange}
                  className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >

                  <option value='' disabled>Select Role</option>
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
                  name="director"
                  value={movie.director}
                  onChange={handleChange}
                  className="block w-full  pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  name="writer"
                  type="text"
                  value={movie.writer}
                  onChange={handleChange}
                  className="block pl-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  name="country"
                  value={movie.country}
                  onChange={handleChange}
                  className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >

                  <option value='' disabled>Select Role</option>
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
            {/*Awards*/}
            <div className="sm:col-span-4 ">
              <label htmlFor="movieAwards" className="block text-sm font-medium leading-6 text-gray-900">
                Awards
              </label>
              <div className="mt-2">
                <input
                  id="text"
                  name="awards"
                  type="Awards"
                  value={movie.awards}
                  onChange={handleChange}
                  className="block w-full pl-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  name="type"
                  value={movie.type}
                  onChange={handleChange}
                  className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >

                  <option value='' disabled>Select Role</option>
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
            {/*Plot*/}
            <div className=" col-span-full">
              <label htmlFor="moviePlot" className="block text-sm font-medium leading-6 text-gray-900">
                Plot
              </label>
              <div className="mt-2">
                <textarea
                  id="Plot"
                  name="plot"
                  rows={3}
                  value={movie.plot}
                  onChange={handleChange}
                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write description</p>
            </div>
            {/* Poster */}
            <div className='flex'>
              <div>
                {movie && (
                  <div>
                    <h2 className='text-3xl font-bold ml-[10%] mb-4'>Poster Image</h2>
                    <div className='bg-gray-100 px-4 pt-4 pb-2 rounded-md shadow-lg'>

                      <img
                        src={`${process.env.REACT_APP_API_URL}/${movie.posterUrl}?${Date.now()}`}
                        alt={movie.title}
                        className='w-full '
                      />
                      <label htmlFor={`poster`} className='block text-center bg-gray-400 text-white my-2  py-2 rounded-md cursor-pointer'>
                        Change Image
                      </label>
                      <input id='poster' type="file" className='hidden' onChange={handlePosterFileChange} />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
          <button className='bg-blue-500 hover:bg-gray-300 px-6 py-3 mb-10 mx-5 rounded-md' onClick={handleUpdate}>Update</button>
          <button className='bg-gray-600 hover:bg-gray-300 px-6 py-3 mb-10 rounded-md' onClick={handleButtonClick}>Back</button>
        </div >
      )}
    </form>
  );
}

export default MovieUpdate;
