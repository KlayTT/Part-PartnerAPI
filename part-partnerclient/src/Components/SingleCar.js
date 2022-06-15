import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteCars } from '../Api/Data/CarsData';
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

export default function SingleCar({ car, isLoggedIn }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteCars(car.id).then(() => {
            navigate('/cars')
        });
    };

    return (
        <div className="car-cardss">
            <img src={car.imageUrl} className="card-img-top" alt="Car" />
            <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">{car.year}</p>
                <p className="card-text">{car.color}</p>
                <div className="button-row">
                    {
                        car.uid === uid || isLoggedIn ? (
                            <div>
                                <Link to={`/cars-edit/${car.id}`} className="btn btn-warning">Edit</Link>
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
                </div>
            </div>
        </div>
    );
};

SingleCar.propTypes = {
    car: PropTypes.shape(PropTypes.obj).isRequired,
};