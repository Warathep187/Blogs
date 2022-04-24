import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link href="/">
                    <Navbar.Brand style={{cursor: "pointer"}}>Blogs</Navbar.Brand>
                </Link>
                <Nav className="ms-auto">
                    <Link href="/blogs/create">
                        <p className="text-light" style={{cursor: "pointer"}}>Create new blog</p>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
