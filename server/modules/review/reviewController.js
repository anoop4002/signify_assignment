import { searchReview, addReview, getAverageMonthlyRating, getTotalRatingByCategory } from "./reviewService.js";

//Allows to fetch/filter Reviews/List of reviews  //review_soure, reviewed_date, rating
const search = async function (req, res) {
    if (req.body) {
        try {
            let body = req.body;
            const reviews = await searchReview(body?.review, body?.pageSize, body?.page, body?.sort, body?.source);
            if (!(reviews instanceof Array) && reviews.message === "error") {
                res.status(422).json({ message: "Internal Server Error", exception: reviews.error });
                return;
            }
            res.status(200).json({ reviews: reviews });
        }
        catch (exception) {
            res.status(422).json({ message: "Internal Server Error", exception: exception?.message });
        }
    } else {
        res.status(400).json({ message: "Invalid Request" });
    }
}

//accept Review and store it
const add = function (req, res) {
    if (req.body) {
        try {
            let body = req.body;
            const response = addReview(body);
            if (response?.message === "error") {
                res.status(422).json({ message: "Internal Server Error", exception: response.error });
                return;
            }
            res.status(200).json(response);
        }
        catch (exception) {
            res.status(422).json({ message: "Internal Server Error", exception: exception?.message });
        }

    } else {
        res.status(400).json({ message: "Invalid Request" });
    }
}

//Allows to get average monthly ratings per store. /
const averageMonthlyRating = async function (req, res) {
    try {
        const response = await getAverageMonthlyRating();
        if (!(response instanceof Array) && response.message === "error") {
            res.status(422).json({ message: "Internal Server Error", exception: response.error });
            return;
        }
        res.status(200).json({ average_monthly_rating_per_store: response });
    }
    catch (exception) {
        res.status(422).json({ message: "Internal Server Error", exception: exception?.message });
    }
}

//Allows to get total ratings for each category. Meaning, how many 5*, 4*, 3* and so on 
const totalRatingByCategory = async function (req, res) {
    try {
        const response = await getTotalRatingByCategory();
        if (!(response instanceof Array) && response.message === "error") {
            res.status(422).json({ message: "Internal Server Error", exception: response.error });
            return;
        }
        res.status(200).json({ rating_by_category: response });
    }
    catch (exception) {
        res.status(422).json({ message: "Internal Server Error", exception: exception?.message });
    }
}

export { search, add, averageMonthlyRating, totalRatingByCategory }