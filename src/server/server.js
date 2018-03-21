// NPM modules
 
const Log = require('log');
const log = new Log('debug');
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const shortid = require('shortid');

const mongoose = require('mongoose');
const morgan = require('morgan');                   // log requests to the console (express4)
const bodyParser = require('body-parser');         // pull information from HTML POST (express4)
// const method_override = require('method-override'); // simulate DELETE and PUT (express4)

// My modules and const
const router = require('./app/routes');
const config = require('./config/config');

// Config
mongoose.connect(config.dbUrl);
app.use(morgan('dev'));                                          // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(cors());

router(app);

server.listen(config.serverPort);
log.info('server listen on port', config.serverPort)

// Global
const clients = [];

const StatusGame = Object.freeze({
    START:        Symbol("start"),
    IN_PROGRESS:  Symbol("in_progress"),
    END:          Symbol("end")
});

const StatusQuestion = Object.freeze({
    TIMEOUT:      Symbol("timeout"),
    CHECK:        Symbol("check")
});

const currentTime = () => Math.round(new Date().getTime() / 1000);
const getChain = (correctAw) => 

// status {START, IN_PROGRESS, END}

io.on('connection', function (socket) {

	// get socket id
	console.log("connection");
	socket.on('JOIN', function (data) {
		console.log("JOIN id " + socket.id);
		clients[socket.id] = {};
		clients[socket.id].score = 0;
		clients[socket.id].coeff = 0;
		clients[socket.id].data = data;
		clients[socket.id].questioncount = 0;
		clients[socket.id].statusgame = StatusGame.START;
		console.log(data);
		console.log(clients[socket.id]);
	});

	socket.on('NEXT_QUESTION', function (data) {
		
		clients[socket.id].statusgame = StatusGame.IN_PROGRESS;

		//clients[socket.id].StatusQuestion = StatusQuestion.CHECK;
		//Quiz.find({"name": }); 

		var obj = { 
			idQuestion: "0",
		    question: "Une question envoyé par le serveur ?",
		    answers: [
		    	{
		    		id: "0", 
		    		content: "une fois"
		    	}, 
		    	{
		    		id: "1",
		    		content: "deux fois"
		    	}, 
		    	{
		    		id: "2",
		    		content: "trois fois"
		    	}, 
		    	{
		    		id: "3",
		    		content: "quatre fois"
		    	}
		    ],
		    time: "time from",

		    // status {START, IN_PROGRESS, END},
		    // questionCount,
		    // questionIndex

		    /* verifier si necessaire */
		    // idUser,
		    // idQuiz
		    };

		socket.emit('NEW_QUESTION', obj);
		clients[socket.id].questioncount++;
		clients[socket.id].time = currentTime();
	});

	socket.on('ANSWER', function (data) {
		
		let elapsed = currentTime() - clients[socket.id].time;
		clients[socket.id].statusquestion = 
				(elapsed > data.answerTime) ? StatusQuestion.TIMEOUT : StatusQuestion.CHECK;

		//test question time

		socket.emit('ANSWER_CONFIRM', {
		    idQuestion: "0",
		    idAnswer: "1",
		    // status { TIMEOUT, CHECK }
		    // score,
		    // coefficient,

		    // /* verifier si necessaire */
		    // idUser,
		    // idQuiz
		});
	});

	socket.on('disconnect', function () { 
		//Clear client
		clients[socket.id] = {};
		console.log("disconnect id " + socket.id);
	});
});