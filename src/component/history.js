import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login2 from './component/components/Logins'
import Register from './component/components/Register'
import Homes from './component/components/Homes'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = (token) => {
        console.log('ffffff')
        console.log(token)
        console.log('ffffff')
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login2 onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={isLoggedIn ? <Homes /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;