import React, { useEffect, useState } from 'react';
import { getParts } from '../Api/Data/PartsData';
import { Link } from 'react-router-dom';
import PartsCards from '../Components/PartsCards';

export default function PartsView({ isLoggedIn }) {
    const [parts, setParts] = useState([]);


    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getParts().then(setParts);
        }
        return () => { isMounted = false; }
    }, []);

    return (
        <div className="part-container">
            <>
                <Link to={`/parts-form`}>
                    <button type="button" className="btn btn-success edit-btn">Add</button>
                </Link>
            </>
            {parts.map((part) => (
                <PartsCards
                    key={part.id}
                    part={part}
                    setParts={setParts}
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </div>
    );
}
