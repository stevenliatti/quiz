"use strict";

const SERVER_PORT = '443';

const PROTOCOL_NEXT_QUESTION = 'NEXT_QUESTION';
const PROTOCOL_ANSWER = 'ANSWER';

const PROTOCOL_ANSER_STATUS_TIMEOUT = 'TIMEOUT';
const PROTOCOL_ANSER_STATUS_CHECK = 'CHECK';

var socket;

initParticipation("EL BAGNADOR", "5ab3cc080f6b306b124db61e", "LA CHANCLA");

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

function answerQuestion(pIdQuestion, pIdAnswer) {
    var myAnswer = {
        idQuestion : pIdQuestion ,
        idAnswer : pIdAnswer
    };
    socket.emit(PROTOCOL_ANSWER, myAnswer);
}

// ############################################################################
// SOCKET.IO LISTEN
// ############################################################################
socket.on('NEW_QUESTION', function(message) {
    console.log('NEW_QUESTION : ');
    console.log(message);
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




$('#test').click(function () {
    setNumeroQuestion(2, 10);
    setMultiplicateur(5.25);
    setNomQuiz("AYAAA");
    setQuestion("LA CHANCLA");
    setReponse1("A")
    setReponse2("B")
    setReponse3("C")
    setReponse4("D")
});

$('#btn2').click(function () {
    setNombreReponses(2)
});

$('#btn3').click(function () {
    setNombreReponses(3)
});

$('#btn4').click(function () {
    setNombreReponses(4)
});
