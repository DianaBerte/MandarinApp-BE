import express from "express";
import createHttpError from "http-errors";
import UsersModel from "./model.js"
import { createAccessToken } from "../../lib/auth/tools.js";
import { JWTAuthMiddleware } from "../../lib/auth/jwt.js";
import { adminsOnlyMiddleware } from "../../lib/auth/admin.js";
import passport from "passport";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const usersRouter = express.Router()

usersRouter.get("/googleLogin", passport.authenticate("google", { scope: ["profile", "email"] }))

usersRouter.get("/googleRedirect", passport.authenticate("google", { session: false }), (req, res, next) => {
    try {
        res.redirect(`${process.env.FE_URL}?accessToken=${req.user.accessToken}`)
    } catch (error) {
        next(error)
    }
})

usersRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UsersModel(req.body)
        const { _id } = await newUser.save()
        const payload = { _id: _id };
        const accessToken = await createAccessToken(payload);
        res.status(201).send({ user: newUser, accessToken: accessToken })
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", JWTAuthMiddleware, adminsOnlyMiddleware,
    async (req, res, next) => {
        try {
            const users = await UsersModel.find({})
            res.send(users)
        } catch (error) {
            next(error)
        }
    })

usersRouter.get("/me", JWTAuthMiddleware,
    async (req, res, next) => {
        console.log("req.user: ", req.user)
        try {
            const user = await UsersModel.findById(req.user._id)
            res.send(user)
        } catch (error) {
            next(error)
        }
    })

usersRouter.put("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const updatedUser = await UsersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
        res.send(updatedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/me", JWTAuthMiddleware, async (req, res, next) => {
    try {
        await UsersModel.findOneAndDelete(req.user._id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
    try {
        const user = await UsersModel.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            next(createHttpError(404, `User with id ${req.params.id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.put("/:id", JWTAuthMiddleware, adminsOnlyMiddleware, async (req, res, next) => {
    try {
        const updatedResource = await UsersModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (updatedResource) {
            res.send(updatedResource)
        } else {
            next(createHttpError(404, `User with id ${req.params.id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.delete("/:id", JWTAuthMiddleware, adminsOnlyMiddleware, async (req, res, next) => {
    try {
        const deletedResource = await UsersModel.findByIdAndDelete(req.params.id)
        if (deletedResource) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `User with id ${req.params.id} not found.`))
        }
    } catch (error) {
        next(error)
    }
})

// ************************************************************

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
            res.send({ accessToken, user })
        } else {
            //3.B: otherwise, trigger 401 error
            next(createHttpError(401, "Credentials are incorrect."))
        }
    } catch (error) {
        next(error)
    }
})

// ************************************************************

const cloudinaryUploader = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "capstone/users",
        },
    }),
}).single("image")

usersRouter.post("/me/image", JWTAuthMiddleware, cloudinaryUploader, async (req, res, next) => {
    try {
        if (req.file) {
            console.log("FILE: ", req.file);
            const user = await UsersModel.findByIdAndUpdate(req.user._id, { ...req.body, image: req.file.path }, { new: true, runValidators: true });
            if (user) {
                user.image = req.file.path;
                await user.save();
                res.send("Profile image successfully uploaded.")
            } else {
                next(createHttpError(404, `User with id ${req.user.id} not found.`))
            }
        } else {
            next(createHttpError(400, `Error in uploading the image`))
        }
    } catch (error) {
        next(error)
    }
}
)

export default usersRouter