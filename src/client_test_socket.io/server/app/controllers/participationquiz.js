const Log = require('log');
const log = new Log('debug');
const use = require('./use');

const Participation = require('../models/participation');

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
    .catch(error => { use.send_error(error, res, 500, error); });
}

exports.start = function(req, res) {
    // var msg = require('../../server');

    // console.log(msg.SimpleMessage);
    // const commit = req.body;
    // log.debug(commit);
    // Participation.create(commit)
    // .then(commit => {
    //     res.status(200).json({
    //         error: false,
    //         date: new Date(),
    //         message: 'Quiz ended !'
    //     });        
    // })
    // .catch(error => { use.send_error(error, res, 500, error); });
    // io.on('connection', function (socket) {
    //     // socket.emit('news', { hello: 'world' });
    //     // socket.on('my other event', function (data) {
    //     //     console.log(data);
    //     // });
    //     console.log(__dirname);
    // }); 

    // res.status(200).json({
    //         error: false,
    //         date: new Date(),
    //         message: __dirname
    //     });

    // res.sendfile(__dirname + '/index.html');
}