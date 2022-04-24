import React from "react";
import Searchbar from "../components/Searchbar";
import NavbarComponent from "../components/Navbar";
import { Container } from "react-bootstrap";                        

const index = () => {
    return (
        <>
            <Container>
                <Searchbar />
            </Container>
        </>
    );
};

export default index;
