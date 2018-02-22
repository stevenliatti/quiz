const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    // TODO: use UserSchema here instead of String
    owner: String,
    questions: [{
        question: {
            type: String,
            required: true
        },
        answerTime: {
            type: Number,
            required: true
        },
        answers: [{
            content: {
                type: String,
                required: true
            },
        }],
        rightAnswer: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
