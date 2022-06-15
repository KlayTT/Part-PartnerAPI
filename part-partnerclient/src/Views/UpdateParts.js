import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSinglePart } from '../Api/Data/PartsData';
import PartForm from '../Components/PartForm';

export default function UpdateParts() {
    const { id } = useParams();
    const [updatePart, setUpdatePart] = useState();

    useEffect(() => {
        getSinglePart(id).then(setUpdatePart);
    }, []);

    return (
        <>
            <div className="back-button">
                <Link to={`/parts`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
            <h1 className="page-header text-center">Update Part</h1>
            <div className="update-form-container">
                <PartForm obj={updatePart} />
                </div>
                </div>
        </>

    );
}