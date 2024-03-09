import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../spinner/spinner';

const UserDetails = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [editedUserData, setEditedUserData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`);
                setUserData(response.data.data);
                setEditedUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Send a request to update user data on the server
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`, editedUserData);

            // Optionally, you can refetch the updated data
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`);
            setUserData(response.data.data);
            setLoading(false);
            console.log('User data updated successfully');
        } catch (error) {
            console.error('Error updating user data', error);
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {userData && Object.keys(userData).length > 0 ? (
                        <div className='px-[20%]'>
                            <form onSubmit={handleUpdate} className='mt-10 grid grid-cols-1 gap-x-6 lg:gap-y-6 sm:gap-y-1 sm:grid-cols-6 '>
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="movieTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            name='username'
                                            value={editedUserData.username || ''}
                                            onChange={handleInputChange}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter title'
                                        />
                                    </div>
                                </div>
                                {/*lastname*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                        lastname
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            name='lastname'
                                            value={editedUserData.lastname || ''}
                                            onChange={handleInputChange}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter title'
                                        />
                                    </div>
                                </div>
                                {/*Date*/}
                                <div className="sm:col-span-full lg:col-span-2 ">
                                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                        Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='date'
                                            name='date'
                                            value={editedUserData.date || ''}
                                            onChange={handleInputChange}
                                            className="block lg:w-full sm:w-[100%]  pl-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                                {/*Number*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phonenumber
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            name='number'
                                            value={editedUserData.number || ''}
                                            onChange={handleInputChange}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter title'
                                        />
                                    </div>
                                </div>

                                {/*email*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phonenumber
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type='text'
                                            name='email'
                                            value={editedUserData.email || ''}
                                            onChange={handleInputChange}
                                            className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder='Enter title'
                                        />
                                    </div>
                                </div>

                                {/*Role*/}
                                <div className="sm:col-span-full lg:col-span-2">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name='role'
                                            value={editedUserData.role || ''}
                                            onChange={handleInputChange}
                                            className="block w-full  pl-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >

                                            <option value='' disabled>Select Role</option>
                                            <option value='Operator'>Operator</option>
                                            <option value='user'>User</option>

                                        </select>
                                    </div>
                                </div>

                                <button className='px-5 py-2 my-4 hover:border bg-gray-100 ' type='submit'>Update</button>
                            </form>
                        </div>
                    ) : (
                        <p className='text-red-200'>User data not available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
