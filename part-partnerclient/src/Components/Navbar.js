import React from 'react';
import signOutUser from '../Api/auth';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavbarComponent({ isLoggedIn }) {
    return (
        <Navbar variant="dark" expand="lg" id="nav-bar">
            <Container>
                <Navbar.Brand href="/">Part Partner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/cars">Cars</Nav.Link>
                        <Nav.Link href="/parts">Parts</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        {isLoggedIn
                            ? <Nav.Link href="/login" onClick={signOutUser}>Logout</Nav.Link>
                            : <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}