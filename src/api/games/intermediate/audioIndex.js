import express from "express";
import createHttpError from "http-errors";
import AudioModel from "./audioModel.js";

const interAudioGamesRouter = express.Router()

interAudioGamesRouter.post("/intermediateAudio", async (req, res, next) => {
    try {
        const newAudioGame = new AudioModel(req.body)
        const { _id } = await newAudioGame.save()
        res.status(201).send({ _id })
        console.log("_id: ", _id)
    } catch (error) {
        next(error)
    }
})

interAudioGamesRouter.get("/intermediateAudio/second", async (req, res, next) => {
    try {
        const audioGames = await AudioModel.find()
        res.send(audioGames)
    } catch (error) {
        next(error)
    }
})

export default interAudioGamesRouter