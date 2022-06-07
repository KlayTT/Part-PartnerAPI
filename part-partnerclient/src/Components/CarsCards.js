import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { deleteCar, getSingleCar, updateCar } from '../api/data/CarsData';
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

export default function CarsCards({ car }) {

    return (
        <div className="card">
            <img className="card-img-top" src={car.imageUrl} alt="Car" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Button className="btn btn-primary">Go somewhere</Button>
                </div>
        </div>
        );

};

CarsCards.propTypes = {
    car: PropTypes.shape(PropTypes.obj).isRequired,
};