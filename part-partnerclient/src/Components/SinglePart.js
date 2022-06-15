import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteParts } from '../Api/Data/PartsData';
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

export default function SinglePart({ part, isLoggedIn }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteParts(part.id).then(() => {
            navigate('/parts')
        });
    };

    return (
        <div className="part-cardss">
            <img src={part.imageUrl} className="card-img-top" alt="Part" />
            <div className="card-body">
                <h5 className="card-title">{part.name}</h5>
                <p className="card-text">{part.price}</p>
                <p className="card-text">{part.Miles}</p>
                <p className="card-text">{part.datePurchased}</p>
                <p className="card-text">{part.nextMatnience}</p>
                <div className="button-row">
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
                </div>
            </div>
        </div>
    );
};

SinglePart.propTypes = {
    part: PropTypes.shape(PropTypes.obj).isRequired,
};