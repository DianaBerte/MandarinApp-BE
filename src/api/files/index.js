import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const filesRouter = express.Router()

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "games/audio",
    },
})
const cloudMulter = multer({ storage: cloudStorage })

export default filesRouter