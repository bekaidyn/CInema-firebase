// SchedulePage.js
import React from 'react';

const SchedulePage = () => {
    const scheduleData = [
        { time: '12:00 PM', title: 'Movie A', type: 'Movie' },
        { time: '02:30 PM', title: 'Series X', type: 'Series' },
        { time: '04:45 PM', title: 'Movie B', type: 'Movie' },
        // Add more schedule entries as needed
    ];

    return (
        <div className="lg:mx-[7%]">
            <div className="p-6 bg-gray-800 rounded-md">
                <h2 className="text-2xl text-gray-300 font-bold mb-4">Schedule Page</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scheduleData.map((event, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-md">
                            <div className="text-lg text-white font-semibold">{event.title}</div>
                            <div className="text-gray-400">{event.type}</div>
                            <div className="text-gray-400">{event.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
