import express from "express";
import createHttpError from "http-errors";
import AdvGamesModel from "./model.js"

const advGamesRouter = express.Router()

advGamesRouter.post("/advanced", async (req, res, next) => {
    try {
        const newGame = new AdvGamesModel(req.body)
        const { _id } = await newGame.save()
        res.status(201).send({ _id })
        console.log("_id: ", _id)
    } catch (error) {
        next(error)
    }
})

advGamesRouter.get("/advanced", async (req, res, next) => {
    try {
        const games = await AdvGamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

export default advGamesRouter