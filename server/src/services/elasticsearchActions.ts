import { Client } from "@elastic/elasticsearch";
import { Blog, CreateBlogInput, UpdateBlogInput } from "../types/blog";
import {SearchHit} from "@elastic/elasticsearch/lib/api/types";
import {v4} from "uuid";

export const esClient = new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUD_ID!,
    },
    auth: {
        apiKey: process.env.ELASTIC_API_KEY!,
    },
});

export const connectElasticsearch = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExisting = await esClient.indices.exists({
                index: "blogs"
            })
            if(!isExisting) {
                await esClient.cluster.health();
                await createIndex();
            }
        } catch (e) {
            reject(e);
        }
    });
};

export const createIndex = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await esClient.indices.create({
                index: "blogs",
            });
            await esClient.indices.putMapping({
                index: "blogs",
                body: {
                    properties: {
                        id: {
                            type: "text",
                            enabled: false,
                        },
                        title: {
                            type: "text",
                            fields: {
                                keyword: {
                                    type: "keyword",
                                    ignore_above: 128
                                }
                            }
                        },
                        description: {
                            type: "text",
                            fields: {
                                keyword: {
                                    type: "keyword",
                                    ignore_above: 256
                                }
                            }
                        },
                        author: {
                            type: "text",
                            enabled: false
                        },
                        createdAt: {
                            type: "keyword"
                        }
                    },
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};

export const addBlogToElasticsearch = async (data: CreateBlogInput): Promise<Blog> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { title, description, author } = data;
            const id = v4();
            const newBlog = {
                id,
                title: title.trim(),
                description,
                author: author.trim(),
                createdAt: new Date(),
            };
            await esClient.index({
                index: "blogs",
                id,
                document: newBlog,
            });
            resolve(newBlog);
        } catch (e) {
            reject(e);
        }
    });
};

export const getBlogsFromSearchbarText = async (key: string): Promise<SearchHit<Blog>[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Should fetch from database
            const relatedBlogs = await esClient.search<Blog>({
                index: "blogs",
                size: 10,
                query: {
                    match_phrase: {
                        title: {
                            query: key
                        }
                    }
                }
            })
            const blogs = relatedBlogs.hits.hits
            resolve(blogs);
        }catch(e) {
            reject(e);
        }
    })
}

export const getRelatedBlogsFromKeyword = async (key: string): Promise<SearchHit<Blog>[]> => {
    return new Promise(async(resolve, reject) => {
        try {
            const relatedBlogs = await esClient.search<Blog>({
                index: "blogs",
                size: 15,
                query: {
                    multi_match: {
                        query: key,
                        fields: [
                            "title^2",
                            "description"
                        ]
                    }
                }
            });
            const blogs = relatedBlogs.hits.hits;
            resolve(blogs)
        }catch(e) {
            reject(e);
        }
    })
}

export const updateBlogToElasticsearch = (data: UpdateBlogInput): Promise<void> => {
    return new Promise(async(resolve, reject) => {
        try {
            await esClient.update({
                index: "blogs",
                id: data.id,
                doc: data
            })
            resolve();
        }catch(e) {
            reject(e);
        }
    })
}

export const deleteBlogFromElasticsearch = (id: string): Promise<void> => {
    return new Promise(async(resolve, reject) => {
        try {
            await esClient.delete({
                index: "blogs",
                id: id
            })
            resolve();
        }catch(e) {
            reject(e);
        }
    })
}