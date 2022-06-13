import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createParts, updateParts } from '../Api/Data/PartsData';

const initialState = {
    name: "",
    price: "",
    imageUrl: "",
    miles: "",
    datePurchased: "",
    nextMatnience: "",
    uid: "",
}

export default function PartForm({ obj }) {
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
            updateParts(formInput).then(() => {
                resetForm();
                navigate('/parts')
            });
        } else {
            createParts({ ...formInput }).then(() => {
                resetForm();
                navigate('/parts')
            });
        }
    };

    return (
        <>
            <div
                className="card text-center"
            >
                <h2
                    className="card-header"
                >
                    New Stuff
                </h2>
                <div
                    className="card-body" id="parts-form"
                >
                    <h5 className="card-title">Enter new Car Stock</h5>
                    <form onSubmit={handleSubmit}>
                        <input
                            id="name"
                            name="name"
                            value={formInput.name}
                            onChange={handleChange}
                            required
                            placeholder="Item Name"
                        />
                        <p />
                        <input
                            id="price"
                            name="price"
                            value={formInput.price}
                            onChange={handleChange}
                            required
                            placeholder="Item Price"
                        />
                        <p />
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            value={formInput.imageUrl}
                            onChange={handleChange}
                            required
                            placeholder="Item ImageUrl"
                        />
                        <p />
                        <input
                            id="miles"
                            name="miles"
                            value={formInput.miles}
                            onChange={handleChange}
                            required
                            placeholder="Item Miles"
                        />
                        <p />
                        <input
                            id="datePurchased"
                            name="datePurchased"
                            value={formInput.datePurchased}
                            onChange={handleChange}
                            required
                            placeholder="Item Date Purchased"
                        />
                        <p />
                        <input
                            id="nextMatnience"
                            name="nextMatnience"
                            value={formInput.nextMatnience}
                            onChange={handleChange}
                            required
                            placeholder="Item Next Matnience"
                        />
                        <p />
                        <input
                            id="uid"
                            name="uid"
                            value={formInput.uid}
                            onChange={handleChange}
                            required
                            placeholder="User id"
                        />
                        <p />
                        <button
                            type="submit"
                            className="btn btn-info"
                        >
                            {obj.id ? 'Edit' : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

PartForm.propTypes = {
    obj: PropTypes.shape(PropTypes.obj),
};

PartForm.defaultProps = {
    obj: {},
};
