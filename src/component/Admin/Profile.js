import React, { useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner';
const ProfilePage = (userDetails) => {
    const [loading, setLoading] = useState(true);//spinner
    const [profilePicture, setProfilePicture] = useState(userDetails.user.picture);
    const user = userDetails.user;

    //spinner
    setTimeout(() => {
        setLoading(false);
    }, 200);

    //logout
    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, '_self');
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handBack = useNavigate();
    const handleButtonClick = () => {
        // Change the page location to '/update/movie'
        handBack('/create/movie');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {loading ? (
                <Spinner />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <button
                        type="button"
                        className="flex py-1 my-3 text-black rounded-md"
                        onClick={handleButtonClick}
                    >
                        <MoveLeft />
                    </button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6 text-purple-600">Your Profile</h1>
                        <div className="flex items-start mb-8">

                            <div className="text-left">
                                <div className="mb-4">
                                    <label className="text-gray-600">Username</label>
                                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-600">Email</label>
                                    <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-600">Phone</label>
                                    <p className="text-lg font-semibold text-gray-800">8 707 000 00 00</p>
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-600">GitHub</label>
                                    <a
                                        href="https://github.com/bekaidyn"
                                        className="text-lg font-semibold text-blue-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://github.com/bekaidyn
                                    </a>
                                </div>
                            </div>

                            <label htmlFor="profilePictureInput" className="cursor-pointer">
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="rounded-full w-[100px] h-[100px] mx-auto mb-4 border-2 hover:border-gray-400 hover:blur-sm "
                                />

                                <input
                                    type="file"
                                    id="profilePictureInput"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleProfilePictureChange}
                                />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={logout}
                            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-500 transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ProfilePage;
