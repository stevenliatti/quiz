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
var id = 0;

$('#answerQuestion').click(function () {

    answerQuestion("q" + id, {"content" : "Yes"} );
    id++;
});

function join() {
    var myJoin = {
        idUser : "EL BAGNADOR",
        idQuiz : "5abcceb9cfcbc30e8fe2eae3",
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
    console.log('EMIT ANSWER');
    console.log(myAnswer);
    socket.emit(PROTOCOL_ANSWER, myAnswer);
}
