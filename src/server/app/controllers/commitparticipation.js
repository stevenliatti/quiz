const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Participation = require('../models/participation');

exports.ParticipationSchema = function(req, res) {
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
    .catch(error => { use.send_error(error, res, 500, error); });
}
