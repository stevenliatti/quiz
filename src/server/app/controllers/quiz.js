const Log = require('log');
const log = new Log('debug');
const use = require('./use');

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
    // TODO: Add check on user (not return quiz from others)
    Quiz.findById(req.params.id)
    .then(quiz => {
        res.status(200).json(quiz);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getMyQuizzes = function(req, res ) {
    let userId = req.params.idUser;
    Users.findById(userId)
    .then(user => {
        return Quiz.find({ idUser : userId });
    }).then(quizzes => {
        res.status(200).json(quizzes);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.getNotParticipated = function(req, res ) {
    let idUser = req.params.idUser;
    let ObjectID = require('mongodb').ObjectID;
    log.debug(idUser);
    Users.findById(idUser)
    .then(user => {
        let participedQuizzes_list = [];
        //log.debug("Controller : " + user);
        user.participedQuizzes.forEach(participedQuiz => {
            participedQuizzes_list.push(participedQuiz.id);
        });

        Quiz.find()
        .then(quizzes => {
            let data = [];
            quizzes.forEach(quiz => {
                if (participedQuizzes_list.indexOf(quiz._id.toString()) < 0 && idUser != quiz.idUser) {
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
    let idUser = req.params.idUser;

    Users.findById(idUser)
    .then(user => {
        let quizzesIds = user.participedQuizzes.map(quiz => quiz.id);
        Quiz.find({'_id': { $in: quizzesIds }})
        .then(quizz => {
            return quizz.map(quiz => {
                let score = user.participedQuizzes.filter(p => p.id == quiz.id).map(p => p.score)[0];
                return {id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner, nbQuestions: quiz.nbQuestions, score : score};
            });
        })
        .then(qq => res.status(200).json(qq))
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

exports.deleteQuiz = function(req, res) {
    // TODO: Add check on user (not return quiz from others)
    Quiz.findByIdAndRemove(req.params.id)
    .then(quiz => { res.status(200).json(quiz); })
    .catch(error => { use.sendError(error, res, 500, error); });
}
