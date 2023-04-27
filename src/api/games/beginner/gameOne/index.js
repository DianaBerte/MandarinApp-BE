import express from "express";
import createHttpError from "http-errors";
import GamesModel from "./model.js";


const gamesRouter = express.Router()

gamesRouter.post("/", async (req, res, next) => {
    try {
        const newGame = new GamesModel(req.body)
        const { _id } = await newGame.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

export default gamesRouter