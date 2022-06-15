import { React } from 'react';
import { Link } from 'react-router-dom';
import PartForm from '../Components/PartForm'

export default function NewCars() {
    return (
        <div className="new-part-form">
            <div className="back-button">
                <Link to={`/parts`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
                <h1 className="page-header text-center">Add Part</h1>
            <PartForm />
            </div>
            </div>
    );
};
