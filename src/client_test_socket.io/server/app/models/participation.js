const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema({
    idUser: {
        type: String,
        validate: {
            validator: function(v) { return v.length > 0 && v.length < 51; },
            message: 'user id must be between 0 and 50'
        },
        required: true
    },
    idQuiz: {
        type: String,
        validate: {
            validator: function(v) { return v.length > 0 && v.length < 51; },
            message: 'quiz id must be between 0 and 50'
        },
        required: true
    },
    nbPoints: {
        type: Number,
        validate: {
            validator: function(v) { return v >= 0 },
            message: 'nbPoints must be greater or equal to 0'
        },
        required: true
    },
    questions: [{
        idQuestion: {
            type: Number,
            validate: {
                validator: function(v) { return v >= 0; },
                message: 'Question id must be greater or equal to 0'
            },
            required: true
        },
        answerTime: {
            type: Number,
            validate: {
                validator: function(v) { return v > 0 && v < 31; },
                message: 'Answer time must be between 1 and 30'
            },
            required: true
        },
        choosedAnswer: {
            type: String,
            validate: {
                validator: function(v) { return v.length > 0 && v.length < 51; },
                message: 'choosed answer length must be between 1 and 50'
            },
            required: true
        }
    }]
}, { timestamps: true });

ParticipationSchema.path('questions').validate(function(questions) {
    return questions && questions.length > 0;
}, 'Questions can\'t be empty');

ParticipationSchema.path('questions').schema.path('answerTime').validate(function(answerTime) {
    return answerTime > 0;
}, 'Answer time must be superior to 0');

module.exports = mongoose.model('Participation', ParticipationSchema);
