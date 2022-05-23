
const checkIfAutheticated = function (req, res, next) {
    if (req.headers?.username === "admin" && req.headers?.password === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not Authorised" })
    }
}

export { checkIfAutheticated }