export interface Blog {
    id: string;
    title: string;
    description: string;
    author: string
    createdAt: Date
}

export interface CreateBlogInput {
    title: string;
    description: string;
    author: string;
}

export interface UpdateBlogInput {
    id: string;
    title: string;
    description: string;
    author: string
}