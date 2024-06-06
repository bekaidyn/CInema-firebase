import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/navbar/navbar';
import Dashboard from './component/Admin/dashboart';
import LoginAdmin from './component/login/login';
import Home from './component/home';
import MovieDetails from "./component/movieDetail/movieDetail";
import MovieUpdate from "./component/controller/movieControl/movieUpdate";
import ProfilePage from "./component/Admin/Profile";
import Footer from "./component/footer/footer";
import UserDetails from "./component/controller/userControl/updateUser";
import BadRequest from "./component/badRequest/404-badRequest";
import BadRequest400 from "./component/badRequest/400-badRequest";
import KinoView from "./component/movieDetail/kinoView";
import Movies from "./component/comingSoon/movies";
import Coming from './component/comingSoon/coming';
import Series from "./component/comingSoon/series";
import NewAndLast from "./component/comingSoon/new&last";
import SchedulePage from "./component/comingSoon/schedul";
import Login2 from './component/components/Logins'
import Register from './component/components/Register'
import Homes from './component/components/Homes'
const App = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user._json);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };
    console.log("Logged in... Token: " + token);


    const handleLogOut = () => {
        localStorage.removeItem('token')
        setToken({ token: null })
        console.log('logout..')
    };
    return (
        <BrowserRouter>
            <Navbar user={user} onLogOut={handleLogOut} onLogin={handleLogin} />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/movie/detail/:id" element={<MovieDetails />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/create/movie" /> : <LoginAdmin onLogin={handleLogin} />}
                />

                <Route
                    path="/create/movie"
                    element={user ? <Dashboard user={user} onLogin={handleLogin} /> : <Navigate to="/login" />}
                />

                <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/profile" />} />
                <Route path="/update/movie/:id" element={user ? <MovieUpdate user={user} /> : <Navigate to="/login" />} />
                <Route path="/update/user/:id" element={<UserDetails />} />
                <Route path="/movie/detail/kino/:id" element={<KinoView />} />
                <Route path="*" element={<BadRequest />} />
                <Route path="/400" element={<BadRequest400 />} />
                <Route path="/comingsoon" element={<Coming />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/new&last" element={<NewAndLast />} />
                <Route path="/schedule" element={<SchedulePage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;