import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Register from './component/components/Register'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for the login state on component mount
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    console.log('Login token:', token);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Save login state to localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {/* <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login2 onLogin={handleLogin} />} /> */}
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
        {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} /> */}
        <Route path="/movie/detail/:id" element={<MovieDetails />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/create/movie" /> : <LoginAdmin onLogin={handleLogin} />} />
        <Route path="/create/movie" element={isLoggedIn ? <Dashboard onLogin={handleLogin} handleLogout={handleLogout} isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/update/movie/:id" element={isLoggedIn ? <MovieUpdate /> : <Navigate to="/login" />} />
        <Route path="/update/user/:id" element={isLoggedIn ? <UserDetails /> : <Navigate to="/login" />} />
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
    </Router>
  );
}

export default App;
