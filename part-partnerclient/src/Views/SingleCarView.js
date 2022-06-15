import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SingleCar from '../Components/SingleCar';
import { getSingleCar } from '../Api/Data/CarsData';

export default function SingleCarView({ isLoggedIn }) {
    const [editItem, setEditItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getSingleCar(id).then(setEditItem)
    }, []);
    return (
        <>
            <div className="back-button">
                <Link to={`/cars`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
            <div className="car-container">
                <div className="single-car-body">
                <h1>{editItem.name}</h1>
                    <SingleCar car={editItem} />
                </div>
                </div>
                </div>
        </>
    );
}