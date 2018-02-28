var responseId = null;
var id = null;

/***
 * Constructor of manager of creation form quiz
 * @returns {ManagerFormCreationQuiz}
 */
function ManagerFormCreationQuiz()
{
    id = (function () {
        this.i = 0;
        return function () {
            return this.i++;
        };
    })();

    this.selectorQuestions = "";
    /***
     * Add a bloc of question in target, and allow to add some responses
     * @param {type} target
     * @param {type} selectorQuestions
     * @returns {undefined}
     */
    this.addQuestion = function (target, selectorQuestions = null) {

        let questionId = id();
        let questionName = $("#questionName");

        responseId = (function () {
            let i = 0;
            return function () {
                return i++;
            };
        })();

        if (questionName.val() !== "") {

            let questionTarget = "#q" + questionId;
            let responseTarget = "#rq" + questionId;
            let modifyTarget = "#m" + questionId;

            /* QUESTION */
            //
            $(target).append("<div class=\"w3-center w3-large w3-margin\" id=\"q" + questionId + "\">");
            $(questionTarget).append("<label class=\"w3-text-teal w3-xlarge w3-margin\">Question " + questionId + " :" + "</label><br>");
            $(questionTarget).append(questionName.val() + "<br>");

            if (selectorQuestions !== null) {
                $(selectorQuestions).append("<option class=\"w3-center w3-text-teal w3-xlarge w3-margin\" value=\"" + questionName.val() + "\">" + questionName.val() + "</option>");
            }

            let rId = responseId();

            /* RESPONSES */

            $(questionTarget).append("<button class=\"w3-button w3-round-large w3-teal w3-margin\" type=\"button\"  onclick=\"addResponse('" + target + "','" + responseTarget + "'," + questionId + ")\">Ajouter une réponse</button>");
            $(questionTarget).append('<input id="rq' + questionId + 'Name" type="text">');
            $(questionTarget).append("<div class=\"w3-row-padding w3-center\" id=\"rq" + questionId + "\"></div>");
            $(questionTarget).append("<button class=\"w3-button w3-round-large w3-red w3-margin\" type=\"button\"  onclick=\"deleteQuestion('" + "#q" + questionId + "','" + target + "')\">Supprimer la question</button>");
            $(questionTarget).append("<button class=\"w3-button w3-round-large w3-red w3-margin\" type=\"button\"  onclick=\"deleteResponses('" + "#rq" + questionId + "')\">Supprimer les réponses</button></div>");
            
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
    let currentId = responseId();
    //let responseName = $("#rq" + questionId + "Name").val();
    let idBlock = "q" + questionId + "_r" + currentId;
    let responseBlock = "#" + idBlock;

    $(responseTarget).append("<div class=\"w3-left\" id=\"q" + questionId + "_r" + currentId + "\"></div>");
    $(responseBlock).append("<button class=\"w3-button w3-small w3-round-large w3-red w3-margin\" type=\"button\" onclick=\"deleteResponse('" + responseBlock + "','" + responseTarget + "','" + questionId + "')\"> Supprimer </button>");
    $(responseBlock).append($("#rq" + questionId + "Name").val());
    $("#rq" + questionId + "Name").val("");
}

/***
 * 
 * @param {type} target
 * @param {type} questionsTarget
 * @returns {undefined}
 */
function deleteQuestion(target, questionsTarget)
{
    $(target).remove();

    id = (function () {
        this.i = 0;
        return function () {
            return this.i++;
        };
    })();

    $(questionsTarget).children().each(function () {
        let questionId = id();
        let newId = "q" + questionId;
        let newQuestionTarget = "#" + newId;
        let responseTarget = "#rq" + questionId;

        /* MODIFICATION QUESTION TOOLS*/
        $(this).attr("id", newId);
        $(this).children('label').text("Question " + questionId + ":");
        $(this).find("button:eq(0)").attr("onclick", "addResponse('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
        $(this).find("button:eq(1)").attr("onclick", "deleteQuestion('" + "#q" + questionId + "','" + "#questions" + "')");
        $(this).find("button:eq(2)").attr("onclick", "deleteResponses('" + responseTarget + "')");
        $(this).find("input:eq(0)").attr("id", "rq" + questionId + "Name");
        $(this).find("div:eq(0)").attr("id", "rq" + questionId);


        /* MODIFICATION RESPONSES*/
        responseId = (function () {
            let i = 0;
            return function () {
                return i++;
            };
        })();

        $(this).find("div:eq(0)").children().each(function () {
            let idResponse = responseId();
            let newId = "q" + questionId + "_r" + idResponse;
            $(this).attr("id", newId);
            $(this).children().each(function () {
                $(this).attr("onclick", "deleteResponse('#" + newId + "','#rq" + questionId + "','" + questionId + "')");
            });
        });
    });
}

/***
 * 
 * @param {type} target
 * @returns {undefined}
 */
function deleteResponses(target)
{
    responseId = (function () {
        let i = 0;
        return function () {
            return i++;
        };
    })();
    $(target).empty();
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
        let i = 0;
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
}