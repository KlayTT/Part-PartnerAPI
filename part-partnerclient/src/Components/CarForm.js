import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createCars, updateCars } from '../Api/Data/CarsData';

const initialState = {
    name: "",
    year: "",
    color: "",
    imageUrl: "",
    uid: "",
}

export default function CarForm({ obj }) {
    const { id } = useParams();
    const [formInput, setFormInput] = useState(initialState);
    const navigate = useNavigate();


    useEffect(() => {
        if (obj.id) {
            setFormInput(obj);
        } else {
            setFormInput(initialState);
        }
    }, [obj]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormInput(initialState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            updateCars(formInput).then(() => {
                resetForm();
                navigate('/cars')
            });
        } else {
            createCars({ ...formInput }).then(() => {
                resetForm();
                navigate('/cars')
            });
        }
    };

    return (
        <>
            <div
                className="create-forms text-center"
            >
                <div
                    className="card-body" id="cars-form"
                >
                    <Form className="create-form" onSubmit={handleSubmit}>
                        <Input
                            id="name"
                            name="name"
                            value={formInput.name}
                            onChange={handleChange}
                            required
                            placeholder="Item Name"
                        />
                        <p />
                        <Input
                            id="year"
                            name="year"
                            value={formInput.year}
                            onChange={handleChange}
                            required
                            placeholder="Item Year"
                        />
                        <p />
                        <Input
                            id="color"
                            name="color"
                            value={formInput.color}
                            onChange={handleChange}
                            required
                            placeholder="Item Color"
                        />
                        <p />
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            value={formInput.imageUrl}
                            onChange={handleChange}
                            required
                            placeholder="Item Image"
                        />
                        <p />
                        <Input
                            id="uid"
                            name="uid"
                            value={formInput.uid}
                            onChange={handleChange}
                            required
                            placeholder="User id"
                        />
                        <p />
                        <Button
                            type="submit"
                            className="btn btn-info"
                        >
                            {obj.id ? 'Edit' : 'Create'}
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

CarForm.propTypes = {
    obj: PropTypes.shape(PropTypes.obj),
};

CarForm.defaultProps = {
    obj: {},
};
