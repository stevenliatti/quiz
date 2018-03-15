"use strict";

const SERVER_IP = '172.20.0.130';
const SERVER_PORT = '12345';

const PROTOCOL_NEXT_QUESTION = 'NEXT_QUESTION';
const PROTOCOL_ANSWER = 'ANSWER';

const PROTOCOL_ANSER_STATUS_TIMEOUT = 'TIMEOUT';
const PROTOCOL_ANSER_STATUS_CHECK = 'CHECK';


var socket = io.connect('http://'+SERVER_IP+':'+SERVER_PORT);

socket.on('newQuestion', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
});

socket.on('answerConfirm', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
});

socket.on('news', function(message) {
        console.log('NEWS : ' + message.hello);
});

$('#join').click(function () {
    join();
});

$('#nextQuestion').click(function () {
    nextQuestion();
});

function join() {
    var myJoin = {
        idUser : "EL BAGNADOR",
        idQuiz : "ISSOU",
        token : "LA CHANCLA"
    };
    console.log(myJoin);

    socket.emit('JOIN', myJoin);
}


function nextQuestion() {
    socket.emit('NEXT_QUESTION', '');
}

function answerQuestion(pIdQuestion, pIdAnswer, ) {
    var myAnswer = {
        idQuestion : pIdQuestion ,
        idAnswer : pIdAnswer
    };

    socket.emit(PROTOCOL_ANSWER, myAnswer);
}
