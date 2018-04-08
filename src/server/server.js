// NPM modules
const Log = require('log');
const log = new Log('debug');
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
const MS = 1000;

const StatusGame = Object.freeze({
    START:        "start",
    IN_PROGRESS:  "in_progress",
    END:          "end"
});

const StatusQuestion = Object.freeze({
    TIMEOUT:      "timeout",
    CHECK:        "check"
});

const currentTime = () => Math.round(new Date().getTime() / 1000);
const getQuestion = (client,idx) => client.quiz.questions[idx];
const getCurrentQuestionId = (client) => client.questionIndex;
const getCurrentQuestion = (client) => getQuestion(client,getCurrentQuestionId(client));
const extractId = (idQuestion) => {
	if(idQuestion.charAt(0) === 'q') {
		return idQuestion.slice(1);
	}
	return "error extraction id";
}

const setScore = (client, answerTime) => {

		client.timeEnd = currentTime();
		let elapsed = client.timeEnd - client.timeStart;
		let remainder = Math.abs(elapsed - answerTime);
		let pourcent = remainder / answerTime * 100;
		client.score += pourcent * client.coeff + 10;
}

const checkFormatJoin = (msg) => (msg !== null
	&& msg.hasOwnProperty("idUser")
	&& msg.hasOwnProperty("idQuiz")
	&& msg.hasOwnProperty("token"));

const checkFormatAnswer = (msg) => (msg !== null
	&& msg.hasOwnProperty("idQuestion")
	&& msg.hasOwnProperty("rightAnswer"));

const checkUserAllowed = (client) => (client !== null && client.hasOwnProperty("allowed") && client.allowed);

const answerTimeout = (socket, client) =>
{
	client.coeff = 0;
	let idCurrentQuestion = getCurrentQuestionId(client);
	let question = getQuestion(client,idCurrentQuestion);

	let answerConfirm = {
		'idQuestion'  : question.id,
		'rightAnswer' : question.rightAnswer,
		'status'      : StatusQuestion.TIMEOUT,
		'score'       : client.score,
		'coefficient' : client.coeff
		// /* verifier si necessaire */
		// idUser,
		// idQuiz
		};

	console.log("==> emit ANSWER_CONFIRM");
	console.log(answerConfirm);
	socket.emit('ANSWER_CONFIRM', answerConfirm);
	client.questionIndex++;
}

function getStatusGame(client) {
	if(client.questionIndex > client.quiz.nbQuestions-1){
		client.statusGame = StatusGame.END;
	}else if (client.statusGame === StatusGame.START){
		client.statusGame = StatusGame.IN_PROGRESS;
	}
	return client.statusGame;
}

const Quiz = require("./app/models/quiz");

io.on('connection', function (socket) {
	console.log("==> connection : " + socket.id);

	// get socket id
	let timeoutController;

	socket.on('JOIN', function (data) {
		console.log("==> receive JOIN");
		
		if (checkFormatJoin(data))
		{
			clients[socket.id] = data; //idUser, idQuiz, token

			//clients[socket.id].joined = true;

			clients[socket.id].score = 0;
			clients[socket.id].coeff = 0;
			clients[socket.id].questionIndex = 0;
			clients[socket.id].statusGame = StatusGame.START;
			clients[socket.id].allowed = false;
			clients[socket.id].results = {
				"rightAnswers" : [],
				"wrongAnswers" : [],
				"correctAnswers" : 0
			};
			Quiz.findById(clients[socket.id].idQuiz, function(err, quiz){
				if (quiz === undefined || quiz === null) { 
					console.log("==> quiz not found!");
					return; 
				}
				clients[socket.id].allowed = true;
				clients[socket.id].quiz = quiz;
			});
		}

	});

	socket.on('NEXT_QUESTION', function () {
		console.log("==> receive NEXT_QUESTION");
		if (checkUserAllowed(clients[socket.id])) {

			let status = getStatusGame(clients[socket.id]);
			clearTimeout(timeoutController);

			if(status === StatusGame.IN_PROGRESS) {

				let idx = getCurrentQuestionId(clients[socket.id]);
				let question = getQuestion(clients[socket.id],idx);

				var newQuestion =
				{
					'idQuestion'    : question.id,
					'nameQuestion'  : question.name,
					'answers'       : question.answers,
					'time'          : question.answerTime,
					'questionIndex' : idx,
					'questionCount' : clients[socket.id].quiz.nbQuestions
				}

				console.log("==> emit NEW_QUESTION");
				console.log(newQuestion.idQuestion);
				socket.emit('NEW_QUESTION', newQuestion);

				timeoutController = setTimeout(function(){
					answerTimeout(socket, clients[socket.id]);
				},question.answerTime*MS);

				//Use to bonus time
				clients[socket.id].timeStart = currentTime();
				

			}else if(status === StatusGame.END){
				console.log("==> emit QUIZ_FINISH");
				socket.emit('QUIZ_FINISH', {"status" : StatusGame.END});
			}
		}
	});

	socket.on('ANSWER', function (data) {
		console.log("==> receive ANSWER");

		//TODO: fix multipes requests answers
		if (checkUserAllowed(clients[socket.id]) && checkFormatAnswer(data)) {

			let idCurrentQuestion = getCurrentQuestionId(clients[socket.id]);

			if (idCurrentQuestion == extractId(data.idQuestion))
			{
				clearTimeout(timeoutController);
				let question = getQuestion(clients[socket.id], idCurrentQuestion);
				
				console.log("Reponse user : " + data.rightAnswer);
				console.log("Reponse correcte : " + question.rightAnswer);

				if (data.rightAnswer['content'] === question.rightAnswer['content']) {
					console.log("BONNE REPONSE");

					clients[socket.id].results.rightAnswers.push(data.rightAnswer);
					clients[socket.id].results.correctAnswers++;
					clients[socket.id].coeff++;
					setScore(clients[socket.id], question.answerTime);
				} else {
					console.log("MAUVAISE REPONSE");
					clients[socket.id].results.wrongAnswers.push(data.rightAnswer);
					clients[socket.id].coeff = 0;
				}
				let answerConfirm = {
					'idQuestion'  : question.id,
					'rightAnswer' : question.rightAnswer,
					'status'      : StatusQuestion.CHECK,
					'score'       : clients[socket.id].score,
					'coefficient' : clients[socket.id].coeff
					// /* verifier si necessaire */
					// idUser,
					// idQuiz
				};
				console.log("==> emit ANSWER_CONFIRM");
				console.log(answerConfirm);
				socket.emit('ANSWER_CONFIRM', answerConfirm);
				clients[socket.id].questionIndex++;
			}
		}
	});

	socket.on('disconnect', function () {
		//Clear client
		clearTimeout(timeoutController);
		clients[socket.id] = {};
		console.log("==> disconnect : " + socket.id)
	});
});
