import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getUsers } from '../Api/Data/UsersData';
import UserForm from '../Components/UserForm';

export default function UpdateUser() {
    const [editProfile, setEditProfile] = useState({});
    const { firebaseUserId } = useParams();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUsers(firebaseUserId).then(setEditProfile);
        }
        return () => {
            isMounted = false;
        };
    }, [firebaseUserId])

    return (
        <div className="user-form-container">
            <h1 className="edit-user-header">Edit {editProfile.userName}'s Profile</h1>
            <UserForm user={editProfile} />
        </div>
    );
}