import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/spinner';
const UserManagement = ({ onCloseAdmin }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [userData, setUserData] = useState({
        username: '',
        lastname: '',
        date: '',
        number: '',
        email: '',
        role: '',
    });



    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        setUserData({ ...userData, role: e.target.value });
    };

    const handleAddUser = async () => {
        try {
            // Make a POST request to the specified API endpoint
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user`, userData);

            // Handle the response as needed
            console.log('User added successfully:', response.data);

            // Optionally, you can reset the form or take other actions
            setUserData({
                username: '',
                lastname: '',
                date: '',
                number: '',
                email: '',
                role: '',
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user`)
            .then((res) => {
                setUsers(res.data.data);
            })
            .catch((err) => { console.log(err) })
    }, []);

    const handleDeleteUser = async (userId, username) => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm(`Are you sure you want to delete ${username}?`);
        if (confirmDelete) {
            try {
                // Make a DELETE request to the specified API endpoint
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/${userId}`);

                // Handle the response as needed
                console.log('User deleted successfully:', response.data);

                // Show an alert with the deleted user's information
                window.alert(`User ${username} (${userId}) has been deleted successfully.`);

                // Optionally, you can update the users state to reflect the deletion
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        } else {
            // The user clicked "No" in the confirmation dialog
            window.alert('Deletion canceled.');
        }
    };

    setTimeout(() => {
        setLoading(false);
    }, 200);

    return (<div>
        {loading ? (
            <Spinner />
        ) : (
            <div className='container'>
                <div className='lg:flex justify-between w-[90%] '>
                    <div className='lg:w-[300px]'>
                        {/* Username */}
                        <div className="mb-4 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    name='username'
                                    type="text"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='Enter Username'
                                />
                            </div>
                        </div>
                        {/* lastname */}
                        <div className="mb-4 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                lastname
                            </label>
                            <div className="mt-2">
                                <input
                                    name='lastname'
                                    type="text"
                                    value={userData.lastname}
                                    onChange={handleInputChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='Enter Lastname'
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="mb-4 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Birthday
                            </label>
                            <div className="mt-2">
                                <input
                                    name='date'
                                    type="date"
                                    value={userData.date}
                                    onChange={handleInputChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>

                        {/* number */}
                        <div className="mb-4 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Number
                            </label>
                            <div className="mt-2">
                                <input
                                    name='number'
                                    type="text"
                                    value={userData.number}
                                    onChange={handleInputChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='+7(000)000 00 00'

                                />
                            </div>
                        </div>

                        {/* User email */}
                        <div className="mb-4 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    name='email'
                                    type="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='Enter email'
                                />
                            </div>
                        </div>
                        {/* Role */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Role
                            </label>
                            <div className="mt-2">
                                <select
                                    value={userData.role}
                                    onChange={handleRoleChange}
                                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="User">User</option>
                                    <option value="Operator">Operator</option>
                                </select>
                            </div>
                        </div>
                        <button className='mx-[20%] px-[20%] bg-gray-100 hover:border' onClick={handleAddUser}>
                            Add
                        </button>
                    </div>
                    <div>
                        <table className="my-5  border table-responsive">
                            <thead className='text-center'>
                                <tr >
                                    <th className='border-r'>Username</th>
                                    <th className='border-r'>Email</th>
                                    <th className='border-r'>Role</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody className='text-center border   '>
                                {users.map(user => (
                                    user.role === 'Operator' ? (
                                        <tr key={user._id} className='border '>
                                            <td className='font-thin border-r '>{user.username}</td>
                                            <td className='font-thin px-2 border-r  '>{user.email}</td>
                                            <td className='px-2  border-r'>{user.role}</td>
                                            <td className='py-2 '>
                                                <button className='p-1 rounded-md mx-2    hover:bg-gray-100 hover:text-blue-400 text-black shadow-lg bg-blue-400'
                                                >
                                                    <Link to={`/update/user/${user._id}`}>
                                                        <Pencil className='' />
                                                    </Link>
                                                </button>
                                                <button onClick={() => handleDeleteUser(user._id, user.username)} className='p-1 rounded-md mx-2    hover:bg-gray-100 hover:text-red-400 text-black shadow-lg bg-red-400'
                                                >
                                                    <Trash2 className='' />
                                                </button>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                            <tbody className='text-center '>
                                {users.map(user => (
                                    user.role === 'User' ? (
                                        <tr key={user._id} className='border '>
                                            <td className='font-thin border-r'>{user.username}</td>
                                            <td className='font-thin px-2  border-r'>{user.email}</td>
                                            <td className='mx-1  border-r'>{user.role}</td>
                                            <td className='py-2 '>
                                                <button className='p-1 rounded-md mx-2    hover:bg-gray-100 hover:text-blue-400 text-black shadow-lg bg-blue-400'
                                                >
                                                    <Link to={`/update/user/${user._id}`}>
                                                        <Pencil className='' />
                                                    </Link>
                                                </button>
                                                <button onClick={() => handleDeleteUser(user._id)} className='p-1 rounded-md mx-2    hover:bg-gray-100 hover:text-red-400 text-black shadow-lg bg-red-400'
                                                >
                                                    <Trash2 className='' />
                                                </button>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                {/* Buttons */}
                <div className='flex flex-col'>
                    <button onClick={onCloseAdmin}>
                        Back
                    </button>
                </div>
            </div>
        )}
    </div>
    );
};

export default UserManagement;
