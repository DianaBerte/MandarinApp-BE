import express from "express";
import createHttpError from "http-errors";
import UsersModel from "./model.js"
import { createAccessToken } from "../../lib/auth/tools.js";

const usersRouter = express.Router()

usersRouter.post("/login", async (req, res, next) => {
    try {
        //1. get user's credentials
        const { email, password } = req.body

        //2. verify user's credentials with my own custom method
        const user = await UsersModel.checkCredentials(email, password)

        if (user) {
            //3.A: if credentials are okay, create an access token (JWT) and send it back as res
            const payload = { _id: user._id, role: user.role }
            const accessToken = await createAccessToken(payload)
            res.send({ accessToken })
        } else {
            //3.B: otherwise, trigger 401 error
            next(createHttpError(401, "Credentials are incorrect."))
        }
    } catch (error) {
        next(error)
    }
})

export default usersRouter