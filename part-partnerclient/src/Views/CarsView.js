import React, { useEffect, useState } from 'react';
import { getCars } from '../Api/Data/CarsData';
import { Link } from 'react-router-dom';
import CarsCards from '../Components/CarsCards';

export default function CarsView({ isLoggedIn }) {
    const [cars, setCars] = useState([]);


    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getCars().then(setCars);
        }
        return () => { isMounted = false; }
    }, []);

    return (
        <div className="car-container">
                <>
                    <Link to={`/cars-form`}>
                        <button type="button" className="btn btn-success edit-btn">Add</button>
                    </Link>
                </>
            {cars.map((car) => (
                <CarsCards
                    key={car.id}
                    car={car}
                    setCars={setCars}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
}
