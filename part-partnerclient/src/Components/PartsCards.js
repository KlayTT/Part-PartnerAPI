import React from 'react';
import PropTypes from 'prop-types';
//import { deleteCar, getSingleCar, updateCar } from '../Api/Data/CarsData';
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

export default function PartsCards({ part, isLoggedIn }) {


    return (

        <div className="card" id="part-cards">
            <img className="card-img-top" src={part.imageUrl} alt="Part" />
            <div className="part-body">
                <h5 className="card-title">{part.name}</h5>
                <p className="card-text">{part.price}</p>
                <p className="card-text">{part.Miles}</p>
                <p className="card-text">{part.datePurchased}</p>
                <p className="card-text">{part.nextMatnience}</p>
                <Button className="btn btn-primary">View</Button>
                {
                    part.uid === uid || isLoggedIn ? (
                        <div>
                            <Button className="btn btn-primary">Edit</Button>
                            <Button className="btn btn-primary">Delete</Button>
                        </div>
                    ) : (
                        ""
                    )
                }
            </div >
        </div >
    );

};

PartsCards.propTypes = {
    part: PropTypes.shape(PropTypes.obj).isRequired,
};