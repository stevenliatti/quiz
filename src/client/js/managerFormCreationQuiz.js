var responseId = null;
var id = null;
var allQuestions = [];

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

        let questionName = $("#questionName");

        if (questionName.val() !== "") {

            /////////////////////
            /// manage
            /////////////////////
            allQuestions.push(new Question(questionName.val()));
            /////////////////////

            let questionId = id();
            responseId = (function () {
                let i = 0;
                return function () {
                    return i++;
                };
            })();

            let questionTarget = "#q" + questionId;
            let responseTarget = "#rq" + questionId;
            let modifyTarget = "#m" + questionId;

            /* QUESTION */

            $(target).append("<div id=\"q" + questionId + "\"></div>");
            $(questionTarget).append("<label>Question " + questionId + " :" + "</label><br>");
            $(questionTarget).append("<div>" + questionName.val() + "</div>");

            if (selectorQuestions !== null) {
                $(selectorQuestions).append("<option value=\"" + questionName.val() + "\">" + questionName.val() + "</option>");
            }
            let rId = responseId();

            /* RESPONSES */

            $(questionTarget).append("<button type=\"button\"  onclick=\"addResponse('" + target + "','" + responseTarget + "'," + questionId + ")\">Ajouter une réponse</button>");
            $(questionTarget).append("<button type=\"button\"  onclick=\"deleteQuestion('" + "#q" + questionId + "','" + target + "')\">Supprimer la question</button>");
            $(questionTarget).append("<button type=\"button\"  onclick=\"deleteResponses('" + "#rq" + questionId + "')\">Supprimer les réponses</button>");
            $(questionTarget).append('<input id="rq' + questionId + 'Name" type="text">');
            $(questionTarget).append("<div id=\"rq" + questionId + "\"></div>");

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
    let val = $("#rq" + questionId + "Name").val();
    if (val !== "")
    {
        let currentId = responseId();
        let idBlock = "q" + questionId + "_r" + currentId;
        let responseBlock = "#" + idBlock;

        $(responseTarget).append("<div id=\"q" + questionId + "_r" + currentId + "\"></div>");
        $(responseBlock).append("<input onclick=\"updateRightAnwser('" + responseBlock + "','" + questionId + "')\" type=\"radio\" value=\"" + val + "\" name=\"" + questionId + "\">" + val + "</div>");

        /////////////////////
        /// manage
        /////////////////////
        allQuestions[questionId].addAnswer(val);
        /////////////////////

        $(responseBlock).append("<button type=\"button\" onclick=\"deleteResponse('" + responseBlock + "','" + responseTarget + "','" + questionId + "')\"> Supprimer </button>");
        $("#rq" + questionId + "Name").val("");
    }
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
        let i = 0;
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

    createQuizJSON();
}

function updateRightAnwser(responseBlock, radioName)
{
    let right = $('input[name='+ radioName +']:checked', responseBlock).val();
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
        
        responses.children().each(function() {
            let response = $(this).find("div:eq(0)").html();
            allQuestions[questionId].addAnswer(response);
        });
        
        questionId++;
    });
    
    console.log(allQuestions);
}