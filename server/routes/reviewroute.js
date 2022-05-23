import { search, add, averageMonthlyRating, totalRatingByCategory } from "../modules/review/reviewController.js";
import { checkIfAutheticated } from "../middleware/auth.js";

import express from "express";
const router = express.Router({});
const reviewRouter = express.Router({});
router.use("/review", reviewRouter);
reviewRouter.use(checkIfAutheticated);
reviewRouter.post("/search", search);
reviewRouter.put("/add", add);
reviewRouter.get("/monthly-avg", averageMonthlyRating);
reviewRouter.get("/total-rating-by-category", totalRatingByCategory);

export { router }