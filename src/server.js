import express from "express";
import cors from "cors";
import passport from "passport";
import gamesRouter from "./api/games/beginner/gameOne/index.js";
import { badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js";

const expressServer = express();

//MIDDLEWARES
expressServer.use(cors());
expressServer.use(express.json());

expressServer.use(passport.initialize());

//ENDPOINTS
expressServer.use("/games", gamesRouter)

//ERROR HANDLERS
expressServer.use(badRequestHandler)
expressServer.use(notFoundHandler)
expressServer.use(genericErrorHandler)

export { expressServer }