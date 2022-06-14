import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteCars } from '../Api/Data/CarsData';
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
    
        <div className="car-cards">
            <img className="card-img-top" src={car.imageUrl} alt="Car" />
            <div className="car-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">{car.year}</p>
                <p className="card-text">{car.color}</p>
                <Link to={`/cars-single/${car.id}`} className="btn btn-success">
                    View
                </Link>
        {
        car.uid === uid || isLoggedIn ? (
                        <>
                            <Link to={`/cars-edit/${car.id}`} className="btn btn-warning">Edit</Link><Button
                            onClick={() => handleDelete('delete')}
                            className="btn btn-danger"
                            type="button"
                        >
                            Delete
                        </Button>
                        </>
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