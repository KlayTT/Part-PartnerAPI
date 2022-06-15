import { React } from 'react';
import { Link } from 'react-router-dom';
import CarForm from '../Components/CarForm'

export default function NewCars() {
    return (
        <div className="forms">
            <div className="back-button">
                <Link to={`/cars`}>
                    <button type="button" className="btn btn-danger back-btn">Back</button>
                </Link>
                <h1 className="page-header text-center">Add Car</h1>
            <CarForm />
            </div>
            </div>
    );
};
