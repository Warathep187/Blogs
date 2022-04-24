import { Request, Response } from "express";
import { CreateBlogInput, UpdateBlogInput } from "../types/blog";
import { addBlogToElasticsearch, getBlogsFromSearchbarText, getRelatedBlogsFromKeyword, updateBlogToElasticsearch, deleteBlogFromElasticsearch } from "../services/elasticsearchActions";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const data = <CreateBlogInput>req.body.data;
        const newBlog = await addBlogToElasticsearch(data);
        res.status(201).send({
            newBlog,
        });
    } catch (e) {
        res.status(500).send({
            message: "Something went wrong",
        });
    }
};

export const searchBlogs = async (req: Request, res: Response) => {
    try {
        const {key} = req.query as {key: string;};
        const blogs = await getBlogsFromSearchbarText(key.trim());
        const newBlogFormat = blogs.map(blog => ({
            ...blog,
            _source: {
                title: blog._source?.title,
                description: blog._source?.description
            }
        }))
        res.status(200).send({
            blogs: newBlogFormat
        })
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}

export const getRelatedBlogs = async (req: Request, res: Response) => {
    try {
        const {key} = req.params as {key: string;};
        const blogs = await getRelatedBlogsFromKeyword(key.trim());
        res.status(200).send({
            blogs
        })
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}

export const updateBlogInfo = async (req: Request, res: Response) => {
    try {
        await updateBlogToElasticsearch(<UpdateBlogInput>req.body.data);
        res.status(204).send();
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        await deleteBlogFromElasticsearch(req.params.id);
        res.status(204).send();
    }catch(e) {
        res.status(500).send({
            message: "Something went wrong"
        })
    }
}