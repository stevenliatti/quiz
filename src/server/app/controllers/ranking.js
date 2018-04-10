const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Quiz = require('../models/quiz');
const Participation = require('../models/participation');

exports.quiz = function(req, res) {
    log.debug(req.params.id);
    // Participation.findById()
    res.status(200).json({n:42});
}

exports.quizzes = function(req, res) {
    let data = [];
    Quiz.find()
    .then(quizzes => {
        let promises = [];
        quizzes.forEach(quiz => {
            let entry = {
                id: quiz._id,
                name: quiz.name,
                participations: 0
            };
            promises.push(Participation.count({ idQuiz: quiz._id }));
            data.push(entry);
        });
        return Promise.all(promises);
    })
    .then(counts => {
        for (let i = 0; i < data.length; i++) {
            data[i].participations = counts[i];
        }
        data.sort((a, b) => {
            return b.participations - a.participations;
        });
        res.status(200).json(data);
    })
    .catch(error => { use.sendError(error, res, 500, error); });
}

exports.players = function(req, res) {
    
}
