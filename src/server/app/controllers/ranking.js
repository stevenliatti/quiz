const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Quiz = require('../models/quiz');
const User = require('../models/user');

exports.quiz = function(req, res) {
    log.debug(req.params.id);
    Quiz.findById(req.params.id)
    .then(quiz => {
        quiz.questions = undefined;
        quiz.__v = undefined;
        res.status(200).json(quiz);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.quizzes = function(req, res) {
    Quiz.find()
    .then(quizzes => {
        quizzes.forEach(quiz => {
            quiz.questions = undefined;
            quiz.__v = undefined;
        });
        quizzes.sort((a, b) => {
            return b.participations - a.participations;
        });
        res.status(200).json(quizzes);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.players = function(req, res) {
    User.find()
    .then(users => {
        let data = [];
        users.forEach(user => {
            log.debug(user);
            let entry = {
                id: user._id,
                name: user.email, // TODO: change with name
                points:
                    user.participedQuizzes.length !== 0 ?
                    user.participedQuizzes.reduce((pre, curr) => ({score: pre.score + curr.score})).score : 0
            };
            data.push(entry);
        });
        data.sort((a, b) => {
            return b.points - a.points;
        });
        res.status(200).json(data);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}
