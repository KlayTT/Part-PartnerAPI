import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUsersByFuid } from '../Api/Data/UsersData';
import { getParts } from '../Api/Data/PartsData';
import { getCars } from '../Api/Data/CarsData';
import SingleProfile from '../Components/SingleProfile';
import PartsCards from '../Components/PartsCards';
import CarsCards from '../Components/CarsCards';

export default function SingleProfileView({ isLogged }) {
    const [profile, setProfile] = useState({});
    const [parts, setParts] = useState([]);
    const [cars, setCars] = useState([]);
    const { firebaseUserId } = useParams();

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            getUsersByFuid(firebaseUserId).then(setProfile);
        }

        return () => {
            isMounted = false;
        }
    }, [firebaseUserId]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getParts().then((part) => {
                setParts(part)
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getCars().then((car) => {
                setCars(car)
            })
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const userParts = parts.filter((allParts) => allParts.uid === firebaseUserId)
    const userCars = cars.filter((allCars) => allCars.uid === firebaseUserId)

    return (
        <div className="back-button">
                <Link to={`/users`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
            </Link>
        <div className="profile">   
            <SingleProfile key={profile.id} profile={profile} isLogged={isLogged} />
            <div className="user-collection">
                {parts ? (
                    <div className="user-partss">
                        <div className="d flex flex-wrap user-parts">
                            <h4>{profile.userName}'s Parts</h4>
                            {userParts.map((part) => (
                                <PartsCards part={part} key={part.id} setParts={setParts} />
                            ))}
                        </div>
                    </div>
                ) : (
                    ''
                )}
                {cars ? (
                    <div className="users-cars">
                        <div className="d flex flex-wrap user-cars">
                            <h4>{profile.userName}'s Cars</h4>
                            {userCars.map((car) => (
                                <CarsCards car={car} key={car.id} setCars={setCars} />
                            ))}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            </div>
        </div>
    );

}
