import express from "express";
import cors from "cors";
import passport from "passport";
import gamesRouter from "./api/games/beginner/gameOne/index.js";
import interGamesRouter from "./api/games/intermediate/index.js";
import advGamesRouter from "./api/games/advanced/index.js";
import usersRouter from "./api/users/index.js";
import { forbiddenErrorHandler, unauthorizedErrorHandler, badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js";
import googleStrategy from "./lib/auth/googleOauth.js";

const expressServer = express();

passport.use("google", googleStrategy)

//MIDDLEWARES
expressServer.use(cors());
expressServer.use(express.json());
expressServer.use(passport.initialize())

//ENDPOINTS
expressServer.use("/games", gamesRouter, interGamesRouter, advGamesRouter)
expressServer.use("/users", usersRouter)

//ERROR HANDLERS
expressServer.use(badRequestHandler)
expressServer.use(unauthorizedErrorHandler)
expressServer.use(forbiddenErrorHandler)
expressServer.use(notFoundHandler)
expressServer.use(genericErrorHandler)

export { expressServer }