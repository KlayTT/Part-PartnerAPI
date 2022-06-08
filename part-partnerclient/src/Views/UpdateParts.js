import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
            <h1 className="page-header">Update Parts</h1>
            <div className="update-form-container">
                <PartForm obj={updatePart} />
            </div>
        </>

    );
}