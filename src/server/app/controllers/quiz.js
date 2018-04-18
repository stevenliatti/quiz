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

exports.getNotParticipated = function(req, res ) {
    let idUser = req.params.idUser;
    let ObjectID = require('mongodb').ObjectID;

    Users.findById(idUser)
    .then(user => {
        let participedQuizzes_list = [];
        user.participedQuizzes.forEach(participedQuiz => {
            participedQuizzes_list.push(participedQuiz.id);
        });

        Quiz.find()
        .then(quizzes => {
            let 
            data = [];
            quizzes.forEach(quiz => {
                if (participedQuizzes_list.indexOf(quiz._id.toString()) < 0) {
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
    let ObjectID = require('mongodb').ObjectID;
    let data = [];

    Users.findById(idUser)
    .then(user => {
        let quizzesIds = user.participedQuizzes.map(quiz => quiz.id);
        let quizzesScores = user.participedQuizzes.map(quiz => quiz.score);
        // for (let i = 0; i < quizzes.length; i++) {
        //     quizzes[i].score = quizzesScores[i];
        // }
        return {
            quizContents : Quiz.find({'_id': {$in: quizzesIds}}),
            scores : quizzesScores
        };
    })
    .then(quizzes => {
        log.debug(quizzes.scores.length);
        for (let i = 0; i < quizzes.scores.length; i++) {
            // log.debug(quizzes.quizzesScores);
            quizzes.quizContents[i].score = quizzes.scores[i];
        }
        // log.debug(quizzes);
        return quizzes.quizContents;
    })
    .then(quizzes => {
        quizzes.forEach(quiz => {
            data.push({ id: quiz._id, name: quiz.name, description: quiz.description, owner: quiz.owner, nbQuestions: quiz.nbQuestions, score : quiz.score })
        })
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
