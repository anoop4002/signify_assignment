/* eslint-disable no-undef */

import request from "supertest";
import { app } from "../server.js";
// import testConfig from "../../jest.config.js";

beforeAll(async () => {

})
describe("review service", () => {
    it('should add a review', async () => {
        let httpRequest = request(app).put('/api/review/add');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");
        httpRequest.set(`Accept`, `application/json`);

        const res = await httpRequest.send({
            "review": "Me and my kids love this app!! We play games and sing songs its great.",
            "author": "Toni O'Brien",
            "review_source": "GooglePlayStore",
            "rating": 5,
            "title": "",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2017-10-09T00:00:00.000Z"
        })
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Review Added Successfully");
    })

    it('should fetch all the reviews', async () => {
        let httpRequest = request(app).post('/api/review/search');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");
        httpRequest.set(`Accept`, `application/json`);

        const res = await httpRequest.send({})
        expect(res.statusCode).toEqual(200);
    })

    it('should filter review by store type', async () => {
        let httpRequest = request(app).post('/api/review/search');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");
        httpRequest.set(`Accept`, `application/json`);

        const res = await httpRequest.send({
            review: {
                "review_source": "GooglePlayStore"
            }

        })
        expect(res.statusCode).toEqual(200);
    })

    it('should filter review by date range', async () => {
        let httpRequest = request(app).post('/api/review/search');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");
        httpRequest.set(`Accept`, `application/json`);

        const res = await httpRequest.send({
            review: {
                "reviewed_date": { min: "2017-09-04T00:00:00.000Z", max: "2018-02-24T00:00:00.000Z" }
            }
        })
        expect(res.statusCode).toEqual(200);
    })

    it('should filter review by store, rating, date, and can also provide source field,sort field, page, pageSize', async () => {
        let httpRequest = request(app).post('/api/review/search');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");
        httpRequest.set(`Accept`, `application/json`);

        const res = await httpRequest.send({
            review: {
                "rating": [1, 2, 3],
                "date": { min: "2017-09-04T00:00:00.000Z", max: "2018-02-24T00:00:00.000Z" },
                "review_source": ["iTunes"]
            },
            pageSize: 100,
            page: 1,
            source: ["reviewed_date", "author", "rating", "review", "product_name", "review_source"],
            sort: { fieldName: "reviewed_date", order: "desc" }

        })
        expect(res.statusCode).toEqual(200);
    })

    it('should get average monthly rating', async () => {
        let httpRequest = request(app).get('/api/review/monthly-avg');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");

        const res = await httpRequest.send();
        expect(res.statusCode).toEqual(200);
    })

    it('should get total ratings for each category', async () => {
        let httpRequest = request(app).get('/api/review/total-rating-by-category');
        httpRequest.set(`username`, "admin");
        httpRequest.set(`password`, "admin");

        const res = await httpRequest.send();
        expect(res.statusCode).toEqual(200);
    })
})