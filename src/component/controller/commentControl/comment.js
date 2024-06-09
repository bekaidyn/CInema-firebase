import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const CommentDashboard = ({ onCloseComment }) => {
    const [controlComment, setControlComment] = useState([]);
    const [unreadComments, setUnreadComments] = useState(0); // State for tracking unread comments
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [newComment, setNewComment] = useState('')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment`)
            .then((res) => {
                setControlComment(res.data);
                // Calculate the number of unread comments when comments are loaded
                const newUnread = res.data.filter(comment => comment.isNew).length;
                setUnreadComments(newUnread);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment/${commentId}`);
            // After successful deletion, update the state to remove the deleted comment
            setControlComment((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Error deleting comment');
        }
    };

    const markAsRead = async (commentId) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/movie/comment/${commentId}`, { isNew: false });
            // Update unreadComments state after marking the comment as read
            setUnreadComments((prevUnread) => prevUnread - 1);
            // Update the isNew flag locally to hide the button
            setControlComment(prevComments => prevComments.map(comment => {
                if (comment._id === commentId) {
                    return { ...comment, isNew: false };
                }
                return comment;
            }));
        } catch (error) {
            console.error('Error marking comment as read:', error);
            setError('Error marking comment as read');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='mx-8 my-4 p-6 rounded-lg'>
            <h1 className='text-3xl font-bold mb-5 text-indigo-700'>Comment Dashboard</h1>
            <div className="pl-2 ml-3 my-5 w-6 bg-red-500 text-white rounded-full">{unreadComments}</div>
            {controlComment.length === 0 ? (
                <p>No comments available</p>
            ) : (
                controlComment.map((comment) => (
                    <div key={comment._id} className={`mb-6 p-4 bg-gray-100 rounded-lg shadow-md ${comment.isNew ? 'border border-blue-500' : ''}`}>
                        <p className='text-lg font-semibold text-gray-700'>Name: {comment.name}</p>
                        <p className='text-sm text-gray-600'>Email: {comment.email}</p>
                        <p className='text-sm text-gray-600'>Movie ID: {comment.movieId}</p>
                        <p className='text-gray-800'>{comment.comment}</p>
                        <p className='text-gray-800'>{comment.isNew}</p>
                        <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mt-2'
                        >
                            <Trash2 />
                        </button>
                        {/* Dynamically render the "Mark as Read" button based on isNew */}
                        {comment.isNew && (
                            <button
                                onClick={() => markAsRead(comment._id)}
                                className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mt-2 ml-2'
                            >
                                Mark as Read
                            </button>
                        )}
                    </div>
                ))
            )}
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
