import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Api/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            alert("Passwords do not match, try again.");
        } else {
            const user = { userName, email };
            register(user, password)
                .then(() => navigate("/"));
        }
    };

    return (
        <div className="register-container">
            <Form onSubmit={registerClick} className="register-form">
                <FormGroup>
                    <Label for="userName">User Name</Label>
                    <Input id="userName" type="text" autoFocus onChange={e => setUserName(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" id="register-btn">Register</Button>
                </FormGroup>
            </Form>
        </div>
        );

}