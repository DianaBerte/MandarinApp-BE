import createHttpError from "http-errors";

export const adminsOnlyMiddleware = (req, res, next) => {
    //Checking user's role (Authorization) after they're authenticated
    if (req.user.role === "Admin") {
        next()
    } else {
        next(createHttpError(403, "Forbidden entry, Admins only."))
    }
}