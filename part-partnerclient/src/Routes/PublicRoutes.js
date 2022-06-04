import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';
import Register from '../Views/Register';

export default function PublicRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route exact path="/register" element={isLoggedIn ? <Home /> : <Register />} />
        </Routes>
  );
}
