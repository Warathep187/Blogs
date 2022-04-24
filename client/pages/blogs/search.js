import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Card } from "react-bootstrap";
import axios from "axios";

const search = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);

    const searchHandler = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/blogs/search/${router.query.key}`);
            setBlogs(data.blogs);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    useEffect(() => {
        if (router.query.key) {
            searchHandler();
        }
    }, [router.query.key]);

    return (
        <Container className="mt-3">
            <p className="display-4">
                Result for <b>{router.query.key}</b>
            </p>
            <div className="mt-2 px-5">
                {blogs.map((blog, index) => (
                    <Card className="w-100 mb-2" key={index}>
                        <Card.Body>
                            <Card.Title>{blog._source.title.substring(0, 64)}</Card.Title>
                            <Card.Text>{blog._source.description.substring(0, 256)}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default search;
