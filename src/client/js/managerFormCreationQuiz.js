var id = (function () {
    var i = 0;
    return function () {
        return i++;
    };
})();

var responseId = null;

function addQuestion(target) {
    let questionId = id();
    
    responseId = (function () {
        var i = 0;
        return function () {
            return i++;
        };
    })();
    
    let questionTarget = "#q" + questionId;
    let responseTarget = "#rq" + questionId;
    $(target).append("<div id=\"q" + questionId + "\"></div>");
    $(questionTarget).append("<label>Question " + questionId + "</label>");
    $(questionTarget).append("<input type=\"text\">");
    $(questionTarget).append("<button onclick=\"addResponse('" + target + "','" + responseTarget + "'," + questionId + ")\">Ajouter une réponse</button>");
    $(questionTarget).append("<div id=\"rq" + questionId + "\"></div>");
}

function addResponse(target, responseTarget, questionId) {

    $(responseTarget).append("<div id=\"q" + questionId + "_r" + responseId() + "\">r</div>");
}