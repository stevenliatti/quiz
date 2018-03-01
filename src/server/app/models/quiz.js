const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) { return v.length > 1 && v.length < 51; },
            message: 'Question name length must be between 2 and 50'
        },
        required: true
    },
    startDate: {
        type: Date,
        validate: {
            validator: function(v) { return v.getTime() >= new Date().getTime() },
            message: 'Start date must be after now'
        },
        required: true
    },
    endDate: {
        type: Date,
        validate: {
            validator: function(v) { return v.getTime() > this.startDate.getTime() + 3600 * 1000 },
            message: 'End date must be after start date'
        },
        required: true
    },
    // TODO: use UserSchema here instead of String
    owner: {
        type: String,
        required: true
    },
    questions: [{
        name: {
            type: String,
            validate: {
                validator: function(v) { return v.length > 1 && v.length < 51; },
                message: 'Question name length must be between 2 and 50'
            },
            required: true
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
                    validator: function(v) { return v.length > 1 && v.length < 51; },
                    message: 'Answer content length must be between 2 and 50'
                },
                required: true
            }
        }],
        rightAnswer: {
            content: {
                type: String,
                validate: {
                    validator: function(v) { return v.length > 1 && v.length < 51; },
                    message: 'Right answer length must be between 2 and 50'
                },
                required: true
            }
        }
    }]
}, { timestamps: true });

QuizSchema.path('questions').validate(function(questions) {
    return questions && questions.length > 0;
}, 'Questions can\'t be empty');

QuizSchema.path('questions').schema.path('answers').validate(function(answers) {
    return answers && answers.length >= 2;
}, 'Question needs to have at least two answers');

module.exports = mongoose.model('Quiz', QuizSchema);
