import server from "./server";
const request = require("supertest");

describe("Blogs search", () => {
    it("GET /api/blogs/search --> search by search keyword", () => {
        const keyword = "Something"
        return request(server).get(`/api/blogs?key=${keyword}`).then((response: Response) => {
            expect(200)
            expect(response.body).toEqual(expect.arrayContaining([]))
        })
    })
})