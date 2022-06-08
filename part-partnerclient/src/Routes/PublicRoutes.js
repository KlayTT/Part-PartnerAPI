import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';
import Register from '../Views/Register';
import CarsView from '../Views/CarsView';
import SingleCarView from '../Views/SingleCarView';
import NewCars from '../Views/NewCars';
import UpdateCars from '../Views/UpdateCars';
import PartsView from '../Views/PartsView';
import SinglePartView from '../Views/SinglePartView';
import NewParts from '../Views/NewParts';
import UpdateParts from '../Views/UpdateParts';

export default function PublicRoutes({ isLoggedIn }) {
    return (
        <Routes>
            <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
            <Route exact path="/register" element={isLoggedIn ? <Home /> : <Register />} />
            <Route exact path="/cars" element={isLoggedIn ? <CarsView /> : <Login />} />
            <Route exact path="/cars-single/:id" element={isLoggedIn ? <SingleCarView /> : <Login />} />
            <Route exact path="/cars-form" element={isLoggedIn ? <NewCars /> : <Login />} />
            <Route exact path="/cars-edit/:id" element={isLoggedIn ? <UpdateCars /> : <Login />} />
            <Route exact path="/parts" element={isLoggedIn ? <PartsView /> : <Login />} />
            <Route exact path="/parts-single/:id" element={isLoggedIn ? <SinglePartView /> : <Login />} />
            <Route exact path="/parts-form" element={isLoggedIn ? <NewParts /> : <Login />} />
            <Route exact path="/parts-edit/:id" element={isLoggedIn ? <UpdateParts /> : <Login />} />
        </Routes>
  );
}