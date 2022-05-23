import sqlite3 from "sqlite3";
import { readFileSync } from "fs";
import path from "path";
import { __dirname } from "../../config/config.js";

let db;
const monthArr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const createAndPopulateInMemoryDb = function () {
    db = new sqlite3.Database(':memory:');
    let reviewData = readFileSync(path.join(__dirname, 'server/handlers/db/reviews.json'));
    let reviewJson = JSON.parse(reviewData);
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, review_source TEXT NOT NULL, title TEXT, product_name TEXT, author TEXT NOT NULL, review TEXT, rating INTEGER NOT NULL,reviewed_date INTEGER NOT NULL, month_year TEXT )");
        const stmt = db.prepare("INSERT INTO reviews (review_source, title, product_name, author, review, rating, reviewed_date,month_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        for (let i = 0; i < reviewJson.length; i++) {
            let review = reviewJson[i];
            let date = new Date(review.reviewed_date);
            let month_year = monthArr[date.getUTCMonth()] + " " + date.getUTCFullYear();
            stmt.run([review.review_source, review.title, review.product_name, review.author, review.review, review.rating, date.getTime(), month_year]);
        }
        stmt.finalize();
    });
}

export { db, createAndPopulateInMemoryDb, monthArr }