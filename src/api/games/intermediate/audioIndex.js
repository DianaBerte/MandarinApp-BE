// import express from "express"
// import AudioModel from "./audioModel.js"

// const interAudioRouter = express.Router()

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

// interAudioRouter.get("/", async (req, res, next) => {
//     try {
//         const games = await AudioModel.find()
//         res.send(games)
//     } catch (error) {
//         next(error)
//     }
// })

// export default interAudioRouter