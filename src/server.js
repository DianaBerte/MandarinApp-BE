import express from "express";
import cors from "cors";
import passport from "passport";

const expressServer = express();

//MIDDLEWARES
expressServer.use(cors());
expressServer.use(express.json());

expressServer.use(passport.initialize());

//ENDPOINTS

//ERROR HANDLERS


export { expressServer }