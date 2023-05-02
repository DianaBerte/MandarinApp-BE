import express from "express";
import createHttpError from "http-errors";
import GamesModel from "./model.js";


const gamesRouter = express.Router()

gamesRouter.post("/", async (req, res, next) => {
    try {
        const newGame = new GamesModel(req.body)
        const { _id } = await newGame.save()
        res.status(201).send({ _id })
        console.log("_id: ", _id)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get("/", async (req, res, next) => {
    try {
        const games = await GamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

gamesRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedGame = await GamesModel.findByIdAndDelete(req.params.id)
        if (deletedGame) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default gamesRouter