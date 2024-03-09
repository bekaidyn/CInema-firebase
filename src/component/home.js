import React, { useState } from 'react';
import Background from './background/background';
import MovieCards from './carts/carts';
import Spinner from './spinner/spinner';

export default function Home() {
    const [loading, setLoading] = useState(true);

    // Simulating an asynchronous operation with setTimeout
    setTimeout(() => {
        setLoading(false);
    }, 1000);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <Background />
                    <MovieCards />
                </div>
            )}
        </div>
    );
}
