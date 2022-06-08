import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteParts } from '../Api/Data/PartsData';
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

export default function PartsCards({ part, setParts, isLoggedIn }) {

    const handleDelete = () => {
        deleteParts(part.id).then((part) => setParts(part));
    };

    return (
        <div className="card" id="part-cards">
            <img className="card-img-top" src={part.imageUrl} alt="Part" />
            <div className="part-body">
                <h5 className="card-title">{part.name}</h5>
                <p className="card-text">{part.price}</p>
                <p className="card-text">{part.Miles}</p>
                <p className="card-text">{part.datePurchased}</p>
                <p className="card-text">{part.nextMatnience}</p>
                <Link to={`/parts-single/${part.id}`} className="btn btn-success">
                    View
                </Link>
                {
                    part.uid === uid || isLoggedIn ? (
                        <div>
                            <Link to={`/parts-edit/${part.id}`} className="btn btn-warning">Edit</Link>
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

PartsCards.propTypes = {
    part: PropTypes.shape(PropTypes.obj).isRequired,
};