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

interGamesRouter.get("/intermediate/second", async (req, res, next) => {
    try {
        const games = await InterGamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

interGamesRouter.get("/intermediate/:id", async (req, res, next) => {
    try {
        const game = await InterGamesModel.findById(req.params.id);
        if (game) {
            res.send(game)
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

interGamesRouter.put("/intermediate/:id", async (req, res, next) => {
    try {
        const updatedGame = await InterGamesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (updatedGame) {
            res.send(updatedGame)
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

interGamesRouter.delete("/intermediate/:id", async (req, res, next) => {
    try {
        const deletedGame = await InterGamesModel.findByIdAndDelete(req.params.id)
        if (deletedGame) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

export default interGamesRouter