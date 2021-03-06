import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateUser } from '../Api/Data/UsersData';

 const initialState = {
    userName: '',
    email: ''
};

export default function UserForm({ profile = {} }) {
    const [formInput, setFormInput] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (profile.id) {
                setFormInput({
                    id: profile.id,
                    firebaseUserId: profile.firebaseUserId,
                    userName: profile.userName,
                    email: profile.email,
                })
            }
        }
        return () => {
            isMounted = false;
        };
    }, [profile]);

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

        if (profile.id) {
            updateUser(formInput).then(() => {
                resetForm();
                navigate('/users')
            });
        }
        };

        return (
            <>
                <div
                    className="create-forms"
                >  
                    <div
                        className="card-body" id="cars-form"
                    >
                        <Form className="create-form" onSubmit={handleSubmit}>
                            <FormGroup>
                                <Input
                                id="userName"
                                name="userName"
                                value={formInput.userName || ''}
                                onChange={handleChange}
                                required
                                placeholder="User Name"
                            />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                id="email"
                                name="email"
                                value={formInput.email || ''}
                                onChange={handleChange}
                                required
                                placeholder="User Email"
                            />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                type="submit"
                                className="btn btn-info"
                            >
                                Edit
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </>
        );
}

UserForm.propTypes = {
    profile: PropTypes.shape({}).isRequired
};

UserForm.defaultProps = {
    obj: {},
};