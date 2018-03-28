"use strict";

const SERVER_PORT = '443';

const PROTOCOL_NEXT_QUESTION = 'NEXT_QUESTION';
const PROTOCOL_ANSWER = 'ANSWER';

const PROTOCOL_ANSER_STATUS_TIMEOUT = 'TIMEOUT';
const PROTOCOL_ANSER_STATUS_CHECK = 'CHECK';

var socket = io.connect('https://'+SERVER_IP+':'+SERVER_PORT);

socket.on('NEW_QUESTION', function(message) {
    console.log('NEW_QUESTION : ');
    console.log(message);
});

socket.on('ANSWER_CONFIRM', function(message) {
    console.log('ANSWER_CONFIRM : ');
    console.log(message);
});

socket.on('news', function(message) {
    console.log('NEWS : ' + message);
});

socket.on('ANSWER', function(message) {
    console.log('ANSWER : ');
    console.log(message);
});

$('#join').click(function () {
    join();
});

$('#nextQuestion').click(function () {
    nextQuestion();
});

$('#answerQuestion').click(function () {
    answerQuestion("q0", {"content" : "Yes"} );
});

function join() {
    var myJoin = {
        idUser : "EL BAGNADOR",
        idQuiz : "5ab3bcbbe0b5556757545f8e",
        token : "LA CHANCLA"
    };
    console.log(myJoin);

    socket.emit('JOIN', myJoin);
}


function nextQuestion() {
    console.log('EMIT NEXT_QUESTION');
    socket.emit('NEXT_QUESTION', '');
}

function answerQuestion(idQuestion, answer) {
    var myAnswer = {
        "idQuestion" : idQuestion,
        "rightAnswer" : answer
    };
    console.log(myAnswer);
    socket.emit(PROTOCOL_ANSWER, myAnswer);
}
