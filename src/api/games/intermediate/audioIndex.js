import express from "express"
// import AudioModel from "./audioModel.js"

// const interAudioGamesRouter = express.Router()

// interAudioRouter.post("/", async (req, res, next) => {
//     try {
//         const newGame = new AudioModel(req.body)
//         const { _id } = await newGame.save()
//         res.status(201).send({ _id })
//         console.log("_id: ", _id)
//     } catch (error) {
//         next(error)
//     }
// })

// interAudioGamesRouter.get("/intermediateAudio/second", async (req, res, next) => {
//     try {
//         const audioGames = await AudioModel.find()
//         res.send(audioGames)
//     } catch (error) {
//         next(error)
//     }
// })

// export default interAudioGamesRouter