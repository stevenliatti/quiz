const Log = require('log');
const log = new Log('debug');
const use = require('./use');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/config');

const Quiz = require('../models/quiz');
const Users = require('../models/user');
const mongoose = require('mongoose');

exports.getAll = function(req, res) {
    Quiz.find()
    .then(quizzes => {
        let data = [];
        quizzes.forEach(quiz => {
            data.push({ id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner, nbQuestions: quiz.nbQuestions });
        });
        res.status(200).json(data);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getQuiz = function(req, res) {
    const token = req.header('Authorization').split(' ')[1];
    const user = jwt.verify(token, authConfig.secret);
    log.debug(user);
    
    Quiz.findById(req.params.id)
    .then(quiz => {
        if (quiz.idUser === user._id) {
        res.status(200).json(quiz);
        }
        else {
            res.status(401).json({ message: 'You can\'t access to this quiz'});
        }
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getMyQuizzes = function(req, res ) {
    const token = req.header('Authorization').split(' ')[1];
    const user = jwt.verify(token, authConfig.secret);
    log.debug(user);

    Users.findById(user._id)
    .then(_ => {
        return Quiz.find({ idUser : user._id });
    }).then(quizzes => {
        res.status(200).json(quizzes);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getNotParticipated = function(req, res ) {
    const token = req.header('Authorization').split(' ')[1];
    const user = jwt.verify(token, authConfig.secret);
    log.debug(user);

    Users.findById(user._id)
    .then(user_mongo => {
        let participedQuizzes_list = [];
        user_mongo.participedQuizzes.forEach(participedQuiz => {
            participedQuizzes_list.push(participedQuiz.id);
        });

        Quiz.find()
        .then(quizzes => {
            let data = [];
            log.debug(quizzes);
            quizzes.forEach(quiz => {
                if (participedQuizzes_list.indexOf(quiz._id.toString()) < 0 && user._id != quiz.idUser) {
                    data.push({ id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner, nbQuestions: quiz.nbQuestions });
                }
            });

            res.status(200).json(data);
        })
        .catch(error => { use.sendError(error, res, 500, error); });

    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getParticipated = function(req, res ) {
    const token = req.header('Authorization').split(' ')[1];
    const user = jwt.verify(token, authConfig.secret);
    log.debug(user);

    Users.findById(user._id)
    .then(user_mongo => {
        let quizzesIds = user_mongo.participedQuizzes.map(quiz => quiz.id);
        Quiz.find({'_id': { $in: quizzesIds }})
        .then(quizzes => {
            return quizzes.map(quiz => {
                let score = user_mongo.participedQuizzes.filter(p => p.id == quiz.id).map(p => p.score)[0];
                return {id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner, nbQuestions: quiz.nbQuestions, score : score};
            });
        })
        .then(data => res.status(200).json(data))
        .catch(error => { use.sendError(error, res, 500, error); });
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

exports.updateQuiz = function(req, res) {
    const quiz = req.body;
    const idQuiz = req.params.id === '' ? quiz.id : req.params.id;
    Quiz.findByIdAndUpdate(quiz.id, req.body, {
        new: true,
        upsert: true
    })
    .then(quiz => {
        res.status(200).json({
            error: false,
            date: new Date(),
            message: 'Quiz saved !'
        });
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.deleteQuiz = function(req, res) {
    const token = req.header('Authorization').split(' ')[1];
    const user = jwt.verify(token, authConfig.secret);
    log.debug(user);

    Quiz.findOneAndRemove({ _id: req.params.id, idUser: user._id })
    .then(quiz => {
        log.debug('quiz', quiz);
        res.status(200).json(quiz);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}
