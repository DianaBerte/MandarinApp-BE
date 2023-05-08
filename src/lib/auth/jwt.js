import createHttpError from "http-errors";
import { verifyAccessToken } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
    //1. Check: is auth header in the request? If not, throw 401
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide Bearer token in auth header."))
    } else {
        //2. If auth header is there, I extract the token out of it
    }
}