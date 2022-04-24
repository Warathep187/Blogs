import React from "react";
import { ListGroup } from "react-bootstrap";

const AutoCompletion = ({ blogs, onSelectItemHandler, onSetBlogs }) => {
    return (
        <div>
            <ListGroup>
                {blogs.map((blog, index) => (
                    <ListGroup.Item
                        key={index}
                        variant="light"
                        action
                        onClick={() => {
                            onSelectItemHandler(blog._source.title);
                            onSetBlogs([]);
                        }}
                    >
                        {blog._source.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default AutoCompletion;
