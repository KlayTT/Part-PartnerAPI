import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleCar } from '../Api/Data/CarsData';
import CarForm from '../Components/CarForm';

export default function UpdataCars() {
    const { id } = useParams();
    const [updateCar, setUpdateCar] = useState();

    useEffect(() => {
        getSingleCar(id).then(setUpdateCar);
    }, []);

    return (
        <>
            <div className="back-button">
                <Link to={`/cars`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
                <h1 className="page-header text-center">Update Car</h1>
            <div className="update-form-container">
                <CarForm obj={updateCar} />
                </div>
                </div>
        </>
        
        );
}