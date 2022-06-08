import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
            <h1 className="page-header">Update Cars</h1>
            <div className="update-form-container">
                <CarForm obj={updateCar} />
            </div>
        </>
        
        );
}