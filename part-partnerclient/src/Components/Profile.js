/// <reference path="carscards.js" />
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteUserSql } from '../Api/Data/UsersData';
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import firebase from 'firebase/compat/app';
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

export default function Profile({ profile, setProfile, isLoggedIn }) {

    const handleDelete = () => {
        deleteUserSql(profile.id).then((profile) => setProfile(profile));
        const user = auth.currentUser;
        deleteUser(user);
    };

    return (
        <div className="card" id="profile-cards">
            <div className="profile-body">
                <h5 className="card-title">{profile.userName}</h5>
                {
                    profile.firebaseUserId === uid || isLoggedIn ? (
                        <div>
                            <Link to={`/users-single/${profile.firebaseUserId}`} className="btn btn-success">
                                View
                            </Link>         
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
}

Profile.propTypes = {
    profile: PropTypes.shape(PropTypes.obj).isRequired,
};


// <Link to={`/users-edit/${profile.firebaseUserId}`} className="btn btn-warning">Edit</Link>