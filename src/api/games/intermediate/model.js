import mongoose from "mongoose";

// To shuffle games, this should be the model for intermediate text games; we're missing the model for the intermediate audio games.

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String || Number,
        required: true,
    },
    answers: [{
        type: String || Number,
        required: true,
    }],
    correctAnswer: {
        type: String,
        required: true,
    }
}, { timestamps: true }
);

const gameSchema = new Schema({
    question: [String],
    answers: [questionSchema]
})

export default model("InterGame", gameSchema)