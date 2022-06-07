import React, { useEffect, useState } from 'react';
import getCars from '../Api/Data/CarsData';
import CarsCards from '../Components/CarsCards';

export default function CarsView() {
    const [cars, setCars] = useState([]);


    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getCars().then(setCars);
        }
        return () => { isMounted = false; }
    }, []);

    return (
        <div id="car-container">
            {cars.map((car) => (
                <CarsCards
                    key={car.id}
                    car={car}
                    setCars={setCars}
                />
            ))}
        </div>
    );
}