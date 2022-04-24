import { useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";

const create = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        author: ""
    })
    const [isCreating, setIsCreating] = useState(false);

    const {title, description, author} = data;

    const dataChangeHandler = e => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }
 
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsCreating(true)
            await axios.post("http://localhost:8000/api/blogs/create", {data})
            alert("Created");
            setData({
                title: "",
                description: "",
                author: ""
            })
        }catch(e) {
            alert(e.response.data.message);
        }
        setIsCreating(false);                                                                                                                                   
    }

    return (
        <Container className="mt-3">

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={dataChangeHandler} name="title" value={title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" row="3" onChange={dataChangeHandler} name="description" value={description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" onChange={dataChangeHandler} name="author" value={author} />
                </Form.Group>
                <Button disabled={isCreating} variant="outline-primary" type="submit">
                    {isCreating ? <>Creating <Spinner animation="border" size="sm" variant="primary" /></>: "Create"}
                </Button>
            </Form>
        </Container>
    );
};

export default create;
