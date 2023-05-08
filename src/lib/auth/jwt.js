import createHttpError from "http-errors";
import { verifyAccessToken } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
    //1. Check: is auth header in the request? If not, throw 401
    if (!req.headers.authorization) {
        next(createHttpError(401, "Please provide Bearer token in auth header."))
    } else {
        //2. If auth header is there, I extract the token out of it
        //Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU4YzgwYjU5NzQxZDI5NTczZjQ0YzAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4MzU0MDEyNiwiZXhwIjoxNjg0MTQ0OTI2fQ.fYjKzAwYHW_DvIyFHg6_2t-6dpdsmgKlxrEy_1o4HCc"
        const accessToken = req.headers.authorization.replace("Bearer ", "")
        try {
            //3. Verify token's integrity and check expir date
            const payload = await verifyAccessToken(accessToken)
            //4. If all right, I get back the payload
            req.user = { _id: payload._id, role: payload.role }
            next()

            //5. If token not ok or for any other reasons, throw 401
        } catch (error) {
            console.log(error)
            next(createHttpError(401, "Token not valid. Please log in again."))
        }
    }
}