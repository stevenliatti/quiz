"use strict";

const SERVER_PORT = '443';

const PROTOCOL_NEXT_QUESTION = 'NEXT_QUESTION';
const PROTOCOL_ANSWER = 'ANSWER';

const PROTOCOL_ANSER_STATUS_TIMEOUT = 'TIMEOUT';
const PROTOCOL_ANSER_STATUS_CHECK = 'CHECK';

var socket;
var current_question;

initParticipation("EL BAGNADOR", "5ab3cc080f6b306b124db61e_", "LA CHANCLA");

function initParticipation(idUser, idQuiz, token) {
    socket = io.connect('https://'+SERVER_IP+':'+SERVER_PORT);

    // SEND JOIN
    join(idUser, idQuiz, token)

    // SEND NEXT_QUESTION
    nextQuestion();
}

// ############################################################################
// SOCKET.IO SEND
// ############################################################################

function join(idUser, idQuiz, token) {
    // SEND JOIN MESSAGE
    var dataJoin = {
        idUser : idUser,
        idQuiz : idQuiz,
        token : token
    };

    console.log(dataJoin);
    socket.emit('JOIN', dataJoin);
};
function nextQuestion() {
    console.log('EMIT NEXT_QUESTION');
    socket.emit('NEXT_QUESTION', '');
}

function answerQuestion(pIdQuestion, pRightAnswer) {
    var myAnswer = {
        idQuestion : pIdQuestion,
        rightAnswer : pRightAnswer
    };

    console.log(myAnswer);
    socket.emit(PROTOCOL_ANSWER, myAnswer);
}

// ############################################################################
// SOCKET.IO LISTEN
// ############################################################################
socket.on('NEW_QUESTION', function(message) {
    console.log('NEW_QUESTION : ');
    console.log(message);

    current_question = message;

    setNumeroQuestion(message.questionIndex, message.questionCount);
    setQuestion(message.nameQuestion);
    setNombreReponses(message.answers.length);

    if (message.answers.length >= 1) {
        setReponse1(message.answers[0].content);
    }

    if (message.answers.length >= 2) {
        setReponse2(message.answers[1].content);
    }

    if (message.answers.length >= 3) {
        setReponse3(message.answers[2].content);
    }

    if (message.answers.length >= 4) {
        setReponse4(message.answers[3].content);
    }

});

socket.on('ANSWER_CONFIRM', function(message) {
    console.log('ANSWER_CONFIRM : ');
    console.log(message);
});

socket.on('QUIZ_FINISH', function(message) {
    console.log('QUIZ_FINISH : ');
    console.log(message);
});

// ############################################################################
// AFFICHAGE
// ############################################################################

function setNomQuiz(nom) {
    $('#quiz').text(nom);
}

function setNumeroQuestion(current, total) {
    $('#quest').text(current+'/'+total);
}

function setMultiplicateur(multiplicateur) {
    $('#mult').text(multiplicateur);
}

function setQuestion(question) {
    $('#question').text(question);
}

function setNombreReponses(nombre) {
    switch(nombre) {
    case 2:
        $('#rep3').css('display', 'none');
        $('#rep4').css('display', 'none');
        break;
    case 3:
        $('#rep3').css('display', 'inline-block');
        $('#rep4').css('display', 'none');
        break;
    case 4:
    default:
        $('#rep3').css('display', 'inline-block');
        $('#rep4').css('display', 'inline-block');
        break;
    }
}

function setReponse1(reponse) {
    $('#rep1').val(reponse);
}

function setReponse2(reponse) {
    $('#rep2').val(reponse);
}

function setReponse3(reponse) {
    $('#rep3').val(reponse);
}

function setReponse4(reponse) {
    $('#rep4').val(reponse);
}

$('#rep1').click(function () {
    answerQuestion(current_question.idQuestion, current_question.answers[0].content)
});

$('#rep2').click(function () {
    answerQuestion(current_question.idQuestion, current_question.answers[1].content)
});

$('#rep3').click(function () {
    answerQuestion(current_question.idQuestion, current_question.answers[2].content)
});

$('#rep4').click(function () {
    answerQuestion(current_question.idQuestion, current_question.answers[3].content)
});

$('#test').click(function () {

});

$('#btn2').click(function () {

});

$('#btn3').click(function () {

});

$('#btn4').click(function () {

});
