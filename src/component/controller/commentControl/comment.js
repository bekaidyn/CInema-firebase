import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react'
const CommentDashboard = ({ onCloseComment }) => {
    const [controlComment, setControlComment] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment`)
            .then((res) => {
                setControlComment(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment/${commentId}`);
            // After successful deletion, update the state to remove the deleted comment
            setControlComment((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className='mx-8 my-4 p-6 rounded-lg'>
            <h1 className='text-3xl font-bold mb-5 text-indigo-700'>Comment Dashboard</h1>
            {controlComment && controlComment.map((comment) => (
                <div key={comment._id} className='mb-6 p-4 bg-gray-100 rounded-lg shadow-md'>
                    <p className='text-lg font-semibold text-gray-700'>Name: {comment.name}</p>
                    <p className='text-sm text-gray-600'>Email: {comment.email}</p>
                    <p className='text-sm text-gray-600'>Movie ID: {comment.movieId}</p>
                    <p className='text-gray-800'>{comment.comment}</p>
                    <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mt-2'
                    >
                        <Trash2 />
                    </button>
                </div>
            ))}
            <button
                onClick={onCloseComment}
                className='bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300'
            >
                Back
            </button>
        </div>
    );
};

export default CommentDashboard;
