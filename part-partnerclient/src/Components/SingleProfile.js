import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { deleteUserSql } from '../Api/Data/UsersData';
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

export default function SingleProfile({ profile, setProfile, isLoggedIn }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteUserSql(profile.id).then((profile) => setProfile(profile));
        const user = auth.currentUser;
        deleteUser(user);
        navigate('/users');
    };

    return (
        <div className="card profile-cards" id="single-profile-cards">
            <div className="card-body">
                <h5 className="card-title">{profile.userName}</h5>
                <div className="button-row">
                    {
                        profile.firebaseUserId === uid || isLoggedIn ? (
                            <div>
                                <p className="card-text">User Id : {profile.firebaseUserId}</p>
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

SingleProfile.propTypes = {
    profile: PropTypes.shape({
        firebaseUserId: PropTypes.string,
        userName: PropTypes.string,
        email: PropTypes.string,
    }).isRequired
};