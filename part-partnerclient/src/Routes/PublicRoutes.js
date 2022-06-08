import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';
import Register from '../Views/Register';
import CarsView from '../Views/CarsView';
import PartsView from '../Views/PartsView';
import NewCars from '../Views/NewCars';
import UpdateCars from '../Views/UpdateCars';
import SingleCarView from '../Views/SingleCarView';

export default function PublicRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route exact path="/register" element={isLoggedIn ? <Home /> : <Register />} />
            <Route exact path="/cars" element={isLoggedIn ? <CarsView /> : <Login />} />
            <Route exact path="/parts" element={isLoggedIn ? <PartsView /> : <Login />} />
            <Route exact path="/cars-form" element={isLoggedIn ? <NewCars /> : <Login />} />
            <Route exact path="/cars-edit/:id" element={isLoggedIn ? <UpdateCars /> : <Login />} />
            <Route exact path="/cars-single/:id" element={isLoggedIn ? <SingleCarView /> : <Login />} />
        </Routes>
  );
}