import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { getUsersByFuid } from '../Api/Data/UsersData';
import UserForm from '../Components/UserForm';


export default function UpdateUser() {
    const [editProfile, setEditProfile] = useState({});
    const { firebaseUserId } = useParams();

    useEffect(() => {
        let isMounted = true;
        console.log(firebaseUserId)
        if (isMounted) {
            getUsersByFuid(firebaseUserId).then(setEditProfile);
        }
        return () => {
            isMounted = false;
        };
    }, [firebaseUserId])

    return (
        <div className="back-button">
            <Link to={`/users`}>
                <button type="button" className="btn btn-danger back-btn">Back</button>
            </Link>
        <div className="user-form-container">
            <h1 className="edit-user-header text-center">Edit {editProfile.userName}'s Profile</h1>
            <UserForm profile={editProfile} />
            </div>
            </div>
    );
}