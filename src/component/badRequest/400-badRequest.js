import React from 'react';
import { Link } from 'react-router-dom';

const BadRequest400 = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white border rounded shadow-md">
            <h1 className="text-2xl font-bold text-red-500 mb-4"> <strong className='text-4xl font-bold'>400</strong> Bad Request</h1>            <p className="text-base text-gray-700 mb-8">Oops! Something went wrong with your request.</p>
            <Link to="/" className="text-blue-500 underline">Back to Home Page</Link>
        </div>
    );
};

export default BadRequest400;
