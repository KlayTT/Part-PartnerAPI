import React from 'react';
import PropTypes from 'prop-types';
import { deleteCars, getSingleCar, updateCar } from '../Api/Data/CarsData';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button } from 'reactstrap';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

var uid;
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
    }
});

export default function CarsCards({ car, setCars, isLoggedIn }) {

    const handleDelete = () => {
        deleteCars(car.id).then((car) => setCars(car));
    };

    return (
    
        <div className="card" id="car-cards">
            <img className="card-img-top" src={car.imageUrl} alt="Car" />
            <div className="car-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">{car.year}</p>
                <p className="card-text">{car.color}</p>
                <Button className="btn btn-primary">View</Button>
        {
        car.uid === uid || isLoggedIn ? (
            <div>
                <Button className="btn btn-primary">Edit</Button>
                <Button
                    onClick={() => handleDelete('delete')}
                    className="btn btn-danger"
                    type="button"
                >
                    Delete
                </Button>
            </div>
        ) : (
            ""
        )
    }
            </div >
        </div >
        );

};

CarsCards.propTypes = {
    car: PropTypes.shape(PropTypes.obj).isRequired,
};