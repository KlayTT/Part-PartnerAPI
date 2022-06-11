import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateUser } from '../Api/Data/UsersData';

 const initialState = {
    userName: '',
    email: ''
};

export default function UserForm({ user = {} }) {
    const [formInput, setFormInput] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (user.id) {
                setFormInput({
                    id: user.id,
                    firebaseUserId: user.firebaseUserId,
                    userName: user.userName,
                    email: user.email,
                })
            }
        }
        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleChange = (e) => {
        setFormInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const resetForm = () => {
        setFormInput(initialState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.id) {
            updateUser(formInput).then(() => {
                resetForm();
                navigate('/users')
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
                        className="card-body" id="cars-form"
                    >
                        <h5 className="card-title">Enter new Car Stock</h5>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="userName"
                                name="userName"
                                value={formInput.userName || ''}
                                onChange={handleChange}
                                required
                                placeholder="User Name"
                            />
                            <p />
                            <input
                                id="email"
                                name="email"
                                value={formInput.email || ''}
                                onChange={handleChange}
                                required
                                placeholder="User Email"
                            />
                            <button
                                type="submit"
                                className="btn btn-info"
                            >
                                Edit
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
}

UserForm.propTypes = {
    user: PropTypes.shape({}).isRequired
};
