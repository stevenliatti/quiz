"use strict";

const SERVER_PORT = '443';

const PROTOCOL_JOIN = 'JOIN';
const PROTOCOL_NEXT_QUESTION = 'NEXT_QUESTION';
const PROTOCOL_ANSWER = 'ANSWER';
const PROTOCOL_NEW_QUESTION = 'NEW_QUESTION';
const PROTOCOL_ANSWER_CONFIRM = 'ANSWER_CONFIRM';
const PROTOCOL_QUIZ_FINISH = 'QUIZ_FINISH';

const PROTOCOL_ANSER_STATUS_TIMEOUT = 'timeout';
const PROTOCOL_ANSER_STATUS_CHECK = 'check';

const YOURQUIZ_MAIN_PAGE_URL = "/static/";
const DEFAULT_COEFFICIENT = 0;
const DEFAULT_SCORE = 0;

var socket;
var current_question;
var choosen_answer;
var timer;
var time_left;

function getUrlParams(field, url) {
    let href = url ? url : window.location.href;
    let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    let string = reg.exec(href);
    return string ? string[1].replace('%20', ' ') : null;
}

$(document).ready(function() {
    var idUser = localStorage.getItem('user')._id;
    var token = localStorage.getItem('user').token;
    initParticipation(idUser, getUrlParams('id'), token);
});

// ############################################################################
// Initialisation
// ############################################################################
function initParticipation(idUser, idQuiz, token) {
    $('#rep1').click(function () {
        choosen_answer = current_question.answers[0].content;
        answerQuestion(current_question.idQuestion, current_question.answers[0].content);
    });

    $('#rep2').click(function () {
        choosen_answer = current_question.answers[1].content;
        answerQuestion(current_question.idQuestion, current_question.answers[1].content);
    });

    $('#rep3').click(function () {
        choosen_answer = current_question.answers[2].content;
        answerQuestion(current_question.idQuestion, current_question.answers[2].content);
    });

    $('#rep4').click(function () {
        choosen_answer = current_question.answers[3].content;
        answerQuestion(current_question.idQuestion, current_question.answers[3].content);
    });

    setMultiplicateur(DEFAULT_COEFFICIENT);
    setScore(DEFAULT_SCORE);


    socket = io.connect('https://'+SERVER_IP+':'+SERVER_PORT);
    socket.on(PROTOCOL_NEW_QUESTION, socket_io_receive_new_question);
    socket.on(PROTOCOL_ANSWER_CONFIRM, socket_io_receive_answer_confirm);
    socket.on(PROTOCOL_QUIZ_FINISH, socket_io_receive_quiz_finish);

    // SEND JOIN
    join(idUser, idQuiz, token)

    // SEND NEXT_QUESTION
    nextQuestion();
}

// ############################################################################
// SOCKET.IO SEND
// ############################################################################

// SEND JOIN MESSAGE
function join(idUser, idQuiz, token) {
    var dataJoin = {
        idUser : idUser,
        idQuiz : idQuiz,
        token : token
    };

    socket.emit(PROTOCOL_JOIN, dataJoin);
};

function nextQuestion() {
    socket.emit(PROTOCOL_NEXT_QUESTION, '');
}

function answerQuestion(pIdQuestion, pRightAnswer) {
    var myAnswer = {
        idQuestion : pIdQuestion,
        rightAnswer : {content:pRightAnswer}
    };

    socket.emit(PROTOCOL_ANSWER, myAnswer);
}

// ############################################################################
// SOCKET.IO RECEIVE
// ############################################################################
function socket_io_receive_new_question(message) {
    console.log(message);

    current_question = message;

    setNumeroQuestion(message.questionIndex+1, message.questionCount);
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

    clearTimeout(timer);
    time_left = message.time;
    setTime(time_left);
    updateTime();
}

function socket_io_receive_answer_confirm(message) {

    console.log(message);

    setMultiplicateur(message.coefficient);
    setScore(message.score);

    if (message.status == PROTOCOL_ANSER_STATUS_CHECK) {
        if (choosen_answer == message.rightAnswer.content) {
            var title = 'Bonne réponse !';
            var text = '';
            var icon = 'success';
        } else {
            var title = 'Mauvaise réponse !';
            var text = 'La bonne réponse était : '+message.rightAnswer.content+' et vous avez répondu : '+choosen_answer;
            var icon = 'error';
        }

        swal({
            title: title,
            text: text,
            icon: icon,
            button: "Question suivante",
        }).then((value) => {
            nextQuestion();
        });
    }

    if (message.status == PROTOCOL_ANSER_STATUS_TIMEOUT) {
        swal({
            title: "Timeout !",
            text: "Vous n'avez pas répondu à la question dans le délai imparti",
            icon: "warning",
            button: "Question suivante",
        }).then((value) => {
            nextQuestion();
        });
    }
}

function socket_io_receive_quiz_finish(message) {
    console.log(message);
    swal({
        title: "Fin du quiz !",
        text: "Le quiz est maintenant terminé",
        icon: "info",
        button: "Retour à la liste des quiz",
    }).then((value) => {
        window.location.replace(YOURQUIZ_MAIN_PAGE_URL);
    });
}

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

function setScore(score) {
    $('#score').text(score);
}

function setTime(time) {
    $('#time').text(time + ' s');
}

function setQuestion(question) {
    $('#question').text(question);
}

function updateTime() {
    if(time_left > 0) {
        time_left--;
        setTime(time_left);
        timer = setTimeout(updateTime, 1000);
    }
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
