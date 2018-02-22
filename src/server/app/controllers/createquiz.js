const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Quiz = require('../models/quiz');

exports.createQuiz = function(req, res) {
    const quiz = req.body;
    log.debug(quiz);
    Quiz.create(quiz)
    .then(quiz => {
        res.status(200).json(quiz);        
    })
    .catch(error => { use.send_error(error, res, 500, false); });
}
