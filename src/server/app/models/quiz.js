const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) { return v.length > 1 && v.length < 100; },
            message: 'Question name length must be between 2 and 100'
        },
        required: true
    },
    description: {
        type: String,
        validate: {
            validator: function(v) { return v.length > 1 && v.length < 250; },
            message: 'Description length must be between 2 and 250'
        },
        required: true
    },
    startDateTime: {
        type: Date,
        default: Date.now()
    },
    days: {
        type: Number,
        validate: {
            validator: function(v) { return v >= 1 },
            message: 'Minimum 1 day'
        },
        required: true,
        default: 1
    },
    // TODO: use UserSchema here instead of String
    owner: {
        type: String,
        required: true
    },
    nbQuestions : {
        type: Number,
        required: true
    },
    questions: [{
        name: {
            type: String,
            validate: {
                validator: function(v) { return v.length > 1 && v.length < 250; },
                message: 'Question name length must be between 2 and 250'
            },
            required: true
        },
        id: {
            type : String,
            required : true
        },
        answerTime: {
            type: Number,
            validate: {
                validator: function(v) { return v > 2 && v < 31; },
                message: 'Answer time must be between 3 and 30'
            },
            required: true
        },
        answers: [{
            content: {
                type: String,
                validate: {
                    validator: function(v) { return v.length >= 1 && v.length < 251; },
                    message: 'Answer content length must be between 1 and 250'
                },
                required: true
            }
        }],
        rightAnswer: {
            content: {
                type: String,
                validate: {
                    validator: function(v) { return v.length >= 1 && v.length < 251; },
                    message: 'Right answer length must be between 1 and 250'
                },
                required: true
            }
        }
    }],
    participations: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

QuizSchema.path('questions').validate(function(questions) {
    return questions && questions.length > 0;
}, 'Questions can\'t be empty');

QuizSchema.path('questions').schema.path('answers').validate(function(answers) {
    return answers && answers.length >= 2 && answers.length <= 4;
}, 'Question needs to have at least two answers');

module.exports = mongoose.model('Quiz', QuizSchema);
