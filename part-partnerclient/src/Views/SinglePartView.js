import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SinglePart from '../Components/SinglePart';
import { getSinglePart } from '../Api/Data/PartsData';

export default function SinglePartView() {
    const [editItem, setEditItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getSinglePart(id).then(setEditItem)
    }, []);
    return (
        <>
            <div className="back-button">
                <Link to={`/parts`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
            <div className="part-container">
                <h1>{editItem.name}</h1>
                <div className="single-part-body">
                    <SinglePart part={editItem} />
                </div>
                </div>
                </div>
        </>
    );
}