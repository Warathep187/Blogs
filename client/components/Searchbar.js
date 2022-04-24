import { Form } from "react-bootstrap";
import { useState } from "react";
import AutoCompletion from "./AutoCompletion";
import axios from "axios";
import { useRouter } from "next/router";

const Searchbar = () => {
    const router = useRouter();

    const [blogs, setBlogs] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [isShow, setIsShow] = useState(false);

    const typingHandler = async (e) => {
        setKeyword(e.target.value);
        if (e.target.value.trim() !== "") {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/blogs/search?key=${e.target.value}`);
                setBlogs(data.blogs);
                setIsShow(true);
            } catch (e) {
                alert(e.response.data.message);
            }
        } else {
            setBlogs([]);
        }
    };

    const selectItemHandler = (selectedBlogTitle) => {
        setKeyword(selectedBlogTitle);
    };

    const searchHandler = (e) => {
        e.preventDefault();
        router.push(`/blogs/search?key=${keyword.trim()}`)
    };

    return (
        <div className="w-50 mx-auto mt-3">
            <Form onSubmit={searchHandler}>
                <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Let's search!!"
                    onChange={typingHandler}
                    value={keyword}
                />
            </Form>
            {isShow && <AutoCompletion blogs={blogs} onSelectItemHandler={selectItemHandler} onSetBlogs={setBlogs} />}
        </div>
    );
};

export default Searchbar;
