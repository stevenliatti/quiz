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
// const createQuestionId = (client) => "q" + client.questionIndex;
const getCurrentQuestionId = (client) => client.questionIndex;
// const getStatusQuestion = (client,answerTime) => ((currentTime() - client.time) > answerTime) ? StatusQuestion.TIMEOUT : StatusQuestion.CHECK;
const getCurrentQuestion = (client) => getQuestion(client,getCurrentQuestionId(client));

const answerTimeout = (socket, client) =>
{
	let idCurrentQuestion = getCurrentQuestionId(client);
	let question = getQuestion(client,idCurrentQuestion-1);

	console.log("answerTimeout");
	console.log(idCurrentQuestion);
	console.log(question);

	let answerConfirm = {
		'idQuestion'  : question.id,
		'rightAnswer' : question.rightAnswer,
		'status'      : StatusQuestion.TIMEOUT, 
		'score'       : (++clients[socket.id].score),
		'coefficient' : clients[socket.id].coeff
		// /* verifier si necessaire */
		// idUser,
		// idQuiz
		};
	socket.emit('ANSWER_CONFIRM', answerConfirm);
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
	// get socket id
	let timeoutController;

	socket.on('JOIN', function (data) {

		clients[socket.id] = data; //idUser, idQuiz, token
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
			//Check if quiz exist
			if (quiz === null) {
				//TODO: test
				io.sockets.sockets[socket.id].disconnect();
			}
			clients[socket.id].allowed = true;
			clients[socket.id].quiz = quiz;
		});
	});

	socket.on('NEXT_QUESTION', function (data) {
		if (clients[socket.id].allowed) {

			let status = getStatusGame(clients[socket.id]);
			clearTimeout(timeoutController);
			
			if(status === StatusGame.IN_PROGRESS) {

				let idx = getCurrentQuestionId(clients[socket.id]);
				let question = getQuestion(clients[socket.id],idx);

				let newQuestion = 
				{
					'idQuestion'    : question.id,
					'nameQuestion'  : question.name,
					'answers'       : question.answers,
					'time'          : question.answersTime,
					'questionIndex' : idx,
					'questionCount' : clients[socket.id].quiz.nbQuestions
				}

				socket.emit('NEW_QUESTION', newQuestion);

				timeoutController = setTimeout(function(){
					answerTimeout(socket, clients[socket.id]);
				},question.answerTime*MS);

				//TODO: Remove when answer timeout is fixe 
				clients[socket.id].time = currentTime();

			}else if(status === StatusGame.END){
				socket.emit('QUIZ_FINISH', {"status" : StatusGame.END});
			}
		}
	});

	socket.on('ANSWER', function (data) {
		if (clients[socket.id].allowed) {

			clearTimeout(timeoutController);

			let idCurrentQuestion = getCurrentQuestionId(clients[socket.id]);
			let question = getQuestion(clients[socket.id], idCurrentQuestion);
		
			if (data.rightAnswer.content === question.rightAnswer.content) {
				console.log("Reponse correcte");
				 clients[socket.id].results.rightAnswers.push(data.rightAnswer.content);
				 clients[socket.id].results.correctAnswers++;
			}else{
				console.log("Reponse incorrecte");
				clients[socket.id].results.wrongAnswers.push(data.rightAnswer.content);
			}
			
			let answerConfirm = {
				'idQuestion'  : idCurrentQuestion,
				'rightAnswer' : question.rightAnswer,
				'status'      : StatusQuestion.CHECK, 
				'score'       : (++clients[socket.id].score),
				'coefficient' : clients[socket.id].coeff
				// /* verifier si necessaire */
				// idUser,
				// idQuiz
			};
			socket.emit('ANSWER_CONFIRM', answerConfirm);
			clients[socket.id].questionIndex++;
		}
	});

	socket.on('disconnect', function () { 
		//Clear client
		clients[socket.id] = {};
	});
});