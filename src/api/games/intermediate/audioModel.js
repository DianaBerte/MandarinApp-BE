import mongoose from "mongoose";

const { Schema, model } = mongoose;

const audioQuestionSchema = new Schema({
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

const audioGameSchema = new Schema({
    question: [String],
    answers: [audioQuestionSchema]
})

export default model("AudioModel", audioGameSchema)