import { Router } from "express";
const router = Router();
import { createBlog, searchBlogs, getRelatedBlogs, updateBlogInfo, deleteBlog } from "../controller/blogs";

router.post("/create", createBlog);

router.get("/search", searchBlogs);

router.get("/search/:key", getRelatedBlogs);

router.put("/update", updateBlogInfo);

router.delete("/:id", deleteBlog);

export default router;
