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
const getQuestion = (client,idx) => client.quiz.questions[idx];
const createQuestionId = (client) => "q" + client.questionIndex;
const getCurrentQuestionId = (client) => client.questionIndex;
const getStatusQuestion = (client,answerTime) => ((currentTime() - client.time) > answerTime) ? StatusQuestion.TIMEOUT : StatusQuestion.CHECK;

function getStatusGame(client) {
	if(client.questionIndex > client.nbQuestions){
		client.statusGame = StatusGame.END;
	}else if (client.statusGame === StatusGame.START){
		client.statusGame = StatusGame.IN_PROGRESS;
	}
	return client.statusGame;
}

// const getChain = (correctAw) => 

// status {START, IN_PROGRESS, END}

const Quiz = require("./app/models/quiz");

io.on('connection', function (socket) {

	// get socket id
	console.log("connection");
	socket.on('JOIN', function (data) {

		console.log("JOIN id " + socket.id);
		clients[socket.id] = data;
		clients[socket.id].score = 0;
		clients[socket.id].coeff = 0;
		// clients[socket.id].idUser = data.idUser;
		// clients[socket.id].idQuiz = data.idQuiz;
		// clients[socket.id].token = data.token;
		clients[socket.id].questionIndex = 0;
		clients[socket.id].statusGame = StatusGame.START;

		Quiz.findById(clients[socket.id].idQuiz, function(err, quiz){
			clients[socket.id].quiz = quiz;
		})

		console.log(clients[socket.id]);
	});

	socket.on('NEXT_QUESTION', function (data) {

		//TODO: check if quiz is finised
		if(getStatusGame(clients[socket.id]) === StatusGame.END) { 
			console.log('END GAME');
			socket.emit('NEW_QUESTION', {"status" : StatusGame.END});
		}

		if(getStatusGame(clients[socket.id]) === StatusGame.IN_PROGRESS) {

			let idQuestion = createQuestionId(clients[socket.id]);
			let idx = getCurrentQuestionId(clients[socket.id]);
			
			socket.emit('NEW_QUESTION', getQuestion(clients[socket.id],idx));
			clients[socket.id].questionIndex++;
			clients[socket.id].time = currentTime();
		}
	});

	socket.on('ANSWER', function (data) {
		console.log("ANSWER SERVER");
		clients[socket.id].statusQuestion = getStatusQuestion(clients[socket.id], data.answerTime);
		console.log(clients[socket.id].statusQuestion);
		//test question time ? a un autre endroit

		if (clients[socket.id].statusQuestion === StatusQuestion.CHECK) {
			socket.emit('ANSWER_CONFIRM', {
				idQuestion: "0",
				idAnswer: "1",
				status : StatusQuestion.CHECK, 
				score : (clients[socket.id].score++)
				// coefficient,

				// /* verifier si necessaire */
				// idUser,
				// idQuiz
			});
		}
	});

	socket.on('disconnect', function () { 
		//Clear client
		clients[socket.id] = {};
		console.log("disconnect id " + socket.id);
	});
});