var responseId = null;
var id = null;
var allQuestions = [];

/***
 * Constructor of manager of creation form quiz
 * @returns {ManagerFormCreationQuiz}
 */
function ManagerFormCreationQuiz()
{
    //id = (function () {
    //    this.i = 0;
    //    return function () {
    //        return this.i++;
    //    };
    //})();

    this.selectorQuestions = "";
    /***
     * Add a bloc of question in target, and allow to add some responses
     * @param {type} target
     * @param {type} selectorQuestions
     * @returns {undefined}
     */
    this.addQuestion = function (target, selectorQuestions = null) {

        let questionName = $("#questionName");

        if (questionName.val() !== "") {
            var questionId = allQuestions.length;
            
            allQuestions.push(new Question(questionName.val()));

            let questionTarget = "#q" + questionId;
            let responseTarget = "#rq" + questionId;
            let modifyTarget = "#m" + questionId;

            /* QUESTION */

            $(target).append("<div class=\"w3-center w3-large w3-margin\" id=\"q" + questionId + "\"><hr></div>");
            $(questionTarget).append("<label class=\"w3-text-teal w3-xlarge w3-margin\" >Question " + questionId + "</label><br>");
            $(questionTarget).append("<div id =\"q" + questionId + "\">" + questionName.val() + "<button class=\"w3-button w3-round-large w3-red w3-margin fa fa-close\" type=\"button\"  onclick=\"deleteQuestion('" + "#q" + questionId + "','" + target + "'," + questionId +")\"></button></div>");

            if (selectorQuestions !== null) {
                $(selectorQuestions).append("<option class=\"w3-center w3-text-teal w3-xlarge w3-margin\" value=\"" + questionName.val() + "\">" + questionName.val() + "</option>");
            }

            /* RESPONSES */

            $(questionTarget).append("<div class=\"w3-row-padding w3-center\" id=\"rq" + questionId + "\"> ");
            $(questionTarget).append('<input id="rq' + questionId + 'content" placeholder="Réponse" type="text">');
            $(questionTarget).append("<button class=\"w3-button w3-round-large w3-teal w3-margin-left\" type=\"button\" onclick=\"addResponse('" + target + "','" + responseTarget + "'," + questionId + ")\">Ajouter une réponse</button>");
            $(questionTarget).append("</div>");

            $(questionTarget).append("<div class=\"w3-row-padding w3-center\">");
            $(questionTarget).append("<button class=\"w3-button w3-round-large w3-red w3-margin\" type=\"button\"  onclick=\"deleteResponses('" + "#rq" + questionId + "')\">Supprimer les réponses</button>");
            $(questionTarget).append("</div>");

            /* CLEAR FORM */
            $(questionName).val("");
            $(modifyTarget).hide();
    }
    };
}

/***
 * Add a response in a question bloc
 * @param {type} target
 * @param {type} responseTarget
 * @param {type} questionId
 * @returns {undefined}
 */
function addResponse(target, responseTarget, questionId) {

    // Check for maximum four possible answers
    let name = $("#rq" + questionId + "content");
    let val = name.val();
    if (val !== "")
    {
        var currentId = $("#rq"+ questionId).children('div').length;

        //$("#q" + questionId + "_r3").length === 0
        if (currentId >=0 && currentId < 4) {
            let idBlock = "q" + questionId + "_r" + currentId;
            let responseBlock = "#" + idBlock;

            $(responseTarget).append("<div class=\"w3-left\" id=\"q" + questionId + "_r" + currentId + "\"></div>");
            $(responseBlock).append("<input class=\"w3-radio\" onclick=\"updateRightAnwser('" + responseBlock + "','" + questionId + "')\" type=\"radio\" value=\"" + val + "\" name=\"" + questionId + "\">" + val + "</div>");

            /////////////////////
            /// manage
            /////////////////////
            allQuestions[questionId].addAnswer(val);
            /////////////////////

            $(responseBlock).append("<button class=\"w3-button w3-small w3-round-large w3-red w3-margin fa fa-close\" type=\"button\" onclick=\"deleteResponse('" + responseBlock + "','" + responseTarget + "','" + questionId + "')\"></button>");
            $("#rq" + questionId + "content").val("");
        }
    }
}

/**
 * 
 * @param {type} target
 * @param {type} questionsTarget
 * @param {type} deletedQuestionId
 * @returns {undefined}
 */
function deleteQuestion(target, questionsTarget, deletedQuestionId)
{
    $(target).children('hr').first().remove();
    $(target).remove();
    allQuestions.splice(deletedQuestionId, 1);
    let questionId = deletedQuestionId;
    
    $(questionsTarget).children().slice(deletedQuestionId).each(function () {
        console.debug($(questionsTarget).children().slice(deletedQuestionId));
        let newId = "q" + questionId;
        let responseTarget = "#rq" + questionId;

        /* MODIFICATION QUESTION TOOLS*/
        
        $(this).attr("id", newId);
        $(this).children('label').text("Question " + questionId); //label of the question
        $(this).find("div:eq(0)").attr("id", "q" + questionId);
        $(this).find("button:eq(0)").attr("onclick", "deleteQuestion('" + "#q" + questionId + "','" + "#questions" + "','" + questionId +"')");
        $(this).find("div:eq(1)").attr("id", "rq" + questionId);
        
        $(this).find("div:eq(1)").children().each(function (index) {
            let newId = "q" + questionId + "_r" + index;
            $(this).attr("id", newId);
            $(this).find("input:eq(0)").attr("onclick", "updateRightAnwser('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
            $(this).find("button:eq(0)").attr("onclick", "deleteResponse('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
        });
        $(this).children().eq(5).attr("id", "rq" + questionId + "content");
        $(this).children().eq(6).attr("onclick", "addResponse('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
        $(this).children().eq(8).attr("onclick", "deleteResponses('" + responseTarget + "')");
        questionId++;
    });

    createQuizJSON();
}

/***
 * 
 * @param {type} target
 * @returns {undefined}
 */
function deleteResponses(target)
{
    responseId = (function () {
        let i = -1;
        return function () {
            return i++;
        };
    })();
    $(target).empty();

    createQuizJSON();
}

/***
 * 
 * @param {type} target
 * @param {type} responseTarget
 * @param {type} questionId
 * @returns {undefined}
 */
function deleteResponse(target, responseTarget, questionId)
{
    $(target).remove();
    responseId = (function () {
        let i = -1;
        return function () {
            return i++;
        };
    })();

    $(responseTarget).children().each(function () {
        let idResponse = responseId();
        let newId = "q" + questionId + "_r" + idResponse;
        $(this).attr("id", newId);
        $(this).children().each(function () {
            $(this).attr("onclick", "deleteResponse('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
        });
    });

    createQuizJSON();
}

function updateRightAnwser(responseBlock, radioName)
{
    let right = $('input[name=' + radioName + ']:checked', responseBlock).val();
    allQuestions[radioName].setRightAnswer(new Answer(right));

    //console.log(allQuestions);
}


function createQuizJSON()
{
    allQuestions = [];
    let questionId = 0;
    $('#questions').children().each(function () {
        let questionName = $(this).find("div:eq(0)").html();

        allQuestions.push(new Question(questionName));

        let responses = $(this).find("div:eq(1)");

        responses.children().each(function () {
            let response = $(this).find("div:eq(0)").html();
            allQuestions[questionId].addAnswer(response);
        });

        questionId++;
    });

    console.log(allQuestions);
}