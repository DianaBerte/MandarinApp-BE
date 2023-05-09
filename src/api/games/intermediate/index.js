import express from "express";
import createHttpError from "http-errors";
import InterGamesModel from "./model.js"

const interGamesRouter = express.Router()

interGamesRouter.post("/intermediate", async (req, res, next) => {
    try {
        const newGame = new InterGamesModel(req.body)
        const { _id } = await newGame.save()
        res.status(201).send({ _id })
        console.log("_id: ", _id)
    } catch (error) {
        next(error)
    }
})

interGamesRouter.get("/intermediate", async (req, res, next) => {
    try {
        const games = await InterGamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

export default interGamesRouter