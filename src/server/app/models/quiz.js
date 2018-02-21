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
    owner: String,
    questions: [{
        question: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        answers: [{
            content: {
                type: String,
                required: [true, function() {
                    return this.questions.answers.length === 4;
                }]
            },
        }],
        rightAnswer: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
