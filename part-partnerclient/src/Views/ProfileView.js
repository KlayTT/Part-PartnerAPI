import React, { useState, useEffect } from 'react';
import { getUsers } from '../Api/Data/UsersData';
import Profile from '../Components/Profile';

export default function ProfilesView({ isLoggedIn }) {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUsers().then(setProfiles);
        }
        return () => { isMounted = false; }
    }, []);

    return (
        <div id="profile-container">
            {profiles.map((profile) => (
                <Profile
                    key={profile.id}
                    profile={profile}
                    setProfiles={setProfiles}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
}
