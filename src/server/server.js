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
var clients = [];

io.on('connection', function (socket) {
	// get socket id
	console.log("connection");
	socket.on('JOIN', function (data) {
		console.log("JOIN id " + socket.id);
		console.log(data);
	});

	socket.on('NEXT_QUESTION', function (data) {
		console.log(data);

		var obj = { 
			idQuestion: "0",
		    question: "Combien de fois t-as niqué ta mère?",
		    answers: [
		    	{
		    		id: "0", 
		    		content: "une fois"
		    	}, {
		    		id: "1",
		    		content: "deux fois"
		    	} 
		    ],
		    time: "",
		    // status {START, IN_PROGRESS, END},
		    // questionCount,
		    // questionIndex

		    /* verifier si necessaire */
		    // idUser,
		    // idQuiz
		    };
		socket.emit('NEW_QUESTION', obj);
	});

	socket.on('ANSWER', function (data) {
		console.log(data);

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
		console.log("disconnect id " + socket.id);
	});
});
