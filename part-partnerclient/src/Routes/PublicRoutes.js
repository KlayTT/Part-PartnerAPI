import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';

export default function PublicRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
        </Routes>
  );
}
