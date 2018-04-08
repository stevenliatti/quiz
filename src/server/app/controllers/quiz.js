const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Quiz = require('../models/quiz');
const Participation = require('../models/participation');

exports.getAll = function(req, res) {
    // TODO: filter quizzes by date available
    Quiz.find()
    .then(quizzes => {
        let data = [];
        quizzes.forEach(quiz => {
            data.push({ id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner });
        });
        res.status(200).json(data);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.createQuiz = function(req, res) {
    const quiz = req.body;
    log.debug(quiz);
    Quiz.create(quiz)
    .then(quiz => {
        res.status(200).json({
            error: false,
            date: new Date(),
            message: 'Quiz saved !'
        });        
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.createParticipation = function(req, res) {
    const commit = req.body;
    log.debug(commit);
    Participation.create(commit)
    .then(commit => {
        res.status(200).json({
            error: false,
            date: new Date(),
            message: 'Quiz ended !'
        });        
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}
