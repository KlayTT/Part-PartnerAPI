import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
            <div className="single-part-view">
                <h1>{editItem.name}</h1>
                <div className="single-part-body">
                    <SinglePart part={editItem} />
                </div>
            </div>
        </>
    );
}