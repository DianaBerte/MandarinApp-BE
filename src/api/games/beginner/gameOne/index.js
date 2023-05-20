import express from "express";
import createHttpError from "http-errors";
import GamesModel from "./model.js";

const gamesRouter = express.Router()

gamesRouter.post("/beginner", async (req, res, next) => {
    try {
        const newGame = new GamesModel(req.body)
        const { _id } = await newGame.save()
        res.status(201).send({ _id })
        console.log("_id: ", _id)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get("/beginner", async (req, res, next) => {
    try {
        const games = await GamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get("/beginner/second", async (req, res, next) => {
    try {
        const games = await GamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get("/beginner/third", async (req, res, next) => {
    try {
        const games = await GamesModel.find()
        res.send(games)
    } catch (error) {
        next(error)
    }
})

gamesRouter.get("/beginner/:id", async (req, res, next) => {
    try {
        const game = await GamesModel.findById(req.params.id);
        if (game) {
            res.send(game)
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

gamesRouter.put("/beginner/:id", async (req, res, next) => {
    try {
        const updatedGame = await GamesModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (updatedGame) {
            res.send(updatedGame)
        } else {
            next(createHttpError(404, `Game with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

gamesRouter.delete("/beginner/:id", async (req, res, next) => {
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