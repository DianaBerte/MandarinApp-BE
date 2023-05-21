import mongoose from "mongoose";

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

export default model("AdvGame", gameSchema)