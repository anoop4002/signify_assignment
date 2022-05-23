import { db, monthArr } from "../../handlers/db/sqlite.js";

const searchReview = function (filter, pageSize, page, sort, source) {
    let query = ``;
    if (source && source instanceof Array && source.length > 0) {
        query += `SELECT ${source.join(",")} FROM reviews`
    } else {
        query += `SELECT * FROM reviews`;
    }
    let andClauses = [];
    if (filter && filter?.review_source) {
        if (typeof filter.review_source === "string") {
            andClauses.push(`review_source='${filter.review_source}'`);
        } else {
            andClauses.push(`review_source IN (${filter.review_source.map(function (m) { return `'${m}'` }).join(',')})`);
        }
    }
    if (filter && filter?.rating) {
        if (typeof filter.rating === "number") {
            andClauses.push(`rating=${filter.rating}`);
        } else {
            andClauses.push(`rating IN (${filter.rating})`);
        }
    }
    if (filter && filter?.date && (filter?.date.min || filter?.date.max)) {
        if (filter.date.min) {
            andClauses.push(`reviewed_date >= ${new Date(filter.date.min).getTime()}`);
        }
        if (filter.date.max) {
            andClauses.push(`reviewed_date <= ${new Date(filter.date.max).getTime()}`);
        }
    }

    if (andClauses.length > 0) {
        query += ` WHERE ${andClauses.join(" AND ")}`;
    }
    if (sort && sort.fieldName) {
        query += ` ORDER BY ${sort.fieldName} ${sort.order}`
    } else {
        query += ` ORDER BY reviewed_date desc`
    }
    if (pageSize && pageSize > 0) {
        query += ` LIMIT(${pageSize})`;
    }
    if (page && page > 0) {
        query += ` OFFSET(${(page - 1) * pageSize})`;
    }
    return new Promise((resolve, reject) => {
        db.all(query, (err, row) => {
            if (!err) {
                row = row.map((r) => {
                    if (r.reviewed_date) {
                        r.reviewed_date = new Date(r.reviewed_date).toISOString();
                    }
                    return r;
                })
                resolve(row);
            } else {
                reject({ message: "error", error: err?.message })
            }
        });
    });
}

//accepts Review and store it
const addReview = function (review) {
    const stmt = db.prepare("INSERT INTO reviews (review_source, title, product_name, author, review, rating, reviewed_date, month_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    let date = new Date(review.reviewed_date);
    let mon_year = monthArr[date.getUTCMonth()] + " " + date.getUTCFullYear();
    stmt.run([review.review_source ? review.review_source : null, review.title, review.product_name, review.author ? review.author : null, review.review ? review.review:null, review.rating ? review.rating:null, review.reviewed_date?new Date(review.reviewed_date).getTime():null, mon_year]);
    stmt.finalize();
    return { message: "Review Added Successfully" };
}

//Allows to get average monthly ratings per store. /
const getAverageMonthlyRating = function () {
    const query = "SELECT review_source,month_year, AVG(rating) as avg_rating from reviews group by review_source, month_year order by review_source, reviewed_date asc";
    return new Promise((resolve, reject) => {
        db.all(query, (err, row) => {
            if (!err) {
                resolve(row);
            } else {
                reject({ message: "error", error: err?.message })
            }
        });
    });
}

//Allows to get total ratings for each category. Meaning, how many 5*, 4*, 3* and so on 
const getTotalRatingByCategory = function () {
    const query = "SELECT rating, COUNT(rating) as count from reviews group by rating";
    return new Promise((resolve, reject) => {
        db.all(query, (err, row) => {
            if (!err) {
                resolve(row);
            } else {
                reject({ message: "error", error: err?.message })
            }
        });
    });
}

export { searchReview, addReview, getAverageMonthlyRating, getTotalRatingByCategory }