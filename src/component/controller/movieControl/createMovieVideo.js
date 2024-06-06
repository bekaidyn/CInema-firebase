import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../carts/pagination';
import SearchInput from '../../carts/Search';
import { Trash2 } from 'lucide-react'

const VideoForm = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [trailerFile, setTrailerFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [kinoFiles, setKinoFiles] = useState([]);
    const [kinoList, setKinoList] = useState([]);
    const [kinoUrls, setKinoUrls] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleFileChange = (event, type) => {
        const files = Array.from(event.target.files);

        if (type === 'kino') {
            setKinoFiles([...kinoFiles, ...files]);
        } else {
            setTrailerFile(files[0]);
        }
    };

    //kino upload
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            if (kinoFiles) {
                const backgroundImagesArray = Array.from(kinoFiles);
                backgroundImagesArray.forEach((file) => formData.append('kino', file));
            }

            if (trailerFile) {
                formData.append('trailer', trailerFile);
            }

            // Find the selected category based on its title
            const selectedCategoryObject = categories.find(category => category.title === selectedCategory);

            // Append both category name and ID to the form data
            formData.append('categoryId', selectedCategoryObject._id);
            formData.append('categoryName', selectedCategoryObject.title);

            // Make a POST request to your server endpoint with progress tracking
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    console.log(`Upload Progress: ${progress}%`);
                    setUploadProgress(progress);
                }
            });

            console.log('Response:', response.data);
            // If the upload is successful, refresh the page
            if (response.status === 200) {
                window.location.reload();
            }
            // Handle success or show a success message
        } catch (error) {
            console.error('Error uploading files:', error);
            // Handle error or show an error message
        }
    };


    //kino upload video remove
    const handleRemoveVideo = (index, type) => {
        if (type === 'trailer') {
            setTrailerFile(null);

        } else if (type === 'kino') {
            const updatedFiles = [...kinoFiles];
            updatedFiles.splice(index, 1);
            setKinoFiles(updatedFiles);

            const updatedUrls = [...kinoUrls];
            updatedUrls.splice(index, 1);
            setKinoUrls(updatedUrls);
        }
    };

    //kino list or table
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos`)
            .then((res) => {
                setKinoList(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    //kino delete
    const handleDelete = async (id) => {
        try {
            // Make a DELETE request to your server endpoint
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/movies/videos/${id}`);

            console.log('Response:', response.data);

            // If the delete is successful, refresh the page
            if (response.status === 200) {
                window.location.reload();
            }
            // Handle success or show a success message
        } catch (error) {
            console.error('Error deleting video:', error);
            // Handle error or show an error message
        }
    };

    //----
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset currentPage to 1 when the search term changes
    };

    //...
    const filteredData = kinoList.filter((data) => {
        return data.categoryName && data.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    //pagination
    const itemsPerPage = 15
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container  mt-8">
            <div className="max-w-auto mx-auto bg-white p-8 border rounded shadow-md">
                {/* header title */}
                <h1>
                    Kino add
                </h1>
                {/* select category */}
                <div className="mb-4">
                    <label htmlFor="categorySelect" className=" text-sm font-medium text-gray-900">
                        Select Category
                    </label>
                    <select
                        id="categorySelect"
                        className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black sm:text-sm"
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select a category...</option>
                        {categories.map((category) => (
                            !kinoList.some((video) => video.categoryName === category.title) && (
                                <option key={category._id} value={category.title}>
                                    {category.title}
                                </option>
                            )
                        ))}
                    </select>
                </div>
                {/* trailerUrl */}
                <div className="sm:col-span-full lg:col-span-2">
                    <label htmlFor="trailer-video" className="block text-sm font-medium leading-6 text-gray-900">
                        Trailer video
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            {trailerFile && (
                                <div className='px-2 py-2'>
                                    <video controls width="120" height="80">
                                        <source src={trailerFile} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveVideo(0, 'trailer')}
                                        className="text-gray-400 hover:text-gray-300 bg-opacity-100 p-1 cursor-pointer">
                                        <Trash2 />
                                    </button>
                                </div>
                            )}
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-uploadT"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <label htmlFor={`trailer`}>Trailer </label>
                                    <input type="file" id='trailer' className='hidden' accept="video/*" onChange={(e) => handleFileChange(e, 'trailer')} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">MP4, WebM, OGG up to 10MB</p>
                        </div>
                    </div>
                </div>

                {/* kinoUrl */}
                <div className="sm:col-span-full lg:col-span-2">
                    <label htmlFor="kino-video" className="block text-sm font-medium leading-6 text-gray-900">
                        Kino video
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            {kinoFiles.length > 0 && (
                                <div className='px-2 py-2'>
                                    <div className="w-[500px] flex flex-wrap ">
                                        {kinoFiles.map((video, index) => (
                                            <div key={index} className='mx-1'>
                                                <video controls width="120" height="80">
                                                    <source src={kinoUrls[index]} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveVideo(index, 'kino')}
                                                    className="text-gray-400 hover:text-gray-300 bg-opacity-100 p-1 cursor-pointer">
                                                    <Trash2 />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-uploadK"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <label htmlFor={`kino`}>Kino </label>
                                    <input type="file" id='kino' className='hidden' accept="video/*" onChange={(e) => handleFileChange(e, 'kino')} multiple />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">MP4, WebM, OGG up to 10MB</p>
                        </div>
                    </div>
                </div>
                {uploadProgress > 0 && (
                    <div>Upload Progress: {uploadProgress}%</div>
                )}
                <button
                    className="w-full mt-5 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300" onClick={handleUpload}>
                    Upload
                </button>
            </div>

            <div className="border mt-8 p-4">
                <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
                    <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                </form>
                {currentItems.map((kino) => (
                    <div key={kino._id} className="mb-2">
                        <div className="bg-gray-200 p-2 rounded-md">{kino.categoryName}</div>
                        <button type="button" onClick={() => handleDelete(kino._id)}
                            className="ml-2 text-red-500 hover:text-red-700">
                            <Trash2 />
                        </button>
                    </div>
                ))}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default VideoForm;
