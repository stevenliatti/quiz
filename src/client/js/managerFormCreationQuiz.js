
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
            $(target).append("<div id=\"q" + questionId + "\"></div>");
            $(questionTarget).append("<label>Question " + questionId + " : <br>" + questionName.val() + "</label><br>");
            $(questionTarget).append("<input id=\"m" + questionId + "\" type=\"text\">");

            if (selectorQuestions !== null) {
                $(selectorQuestions).append("<option value=\"" + questionName.val() + "\">" + questionName.val() + "</option>");
            }

            let rId = responseId();
            
            /* RESPONSES */
            $(questionTarget).append("<button type=\"button\"  onclick=\"addResponse('" + target + "','" + responseTarget + "'," + questionId + ")\">Ajouter une réponse</button>");
            $(questionTarget).append("<button type=\"button\"  onclick=\"deleteQuestion('" + "#q" + questionId + "')\">Supprimer la question</button>");
            $(questionTarget).append("<button type=\"button\"  onclick=\"deleteResponses('" + "#rq" + questionId + "')\">Supprimer les questions</button>");
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
 * @param {type} responseId
 * @returns {undefined}
 */
function addResponse(target, responseTarget, questionId) {
    let currentId = responseId();
    let responseName = $("#rq" + questionId + "Name").val();
    let responseBloc = "#q" + questionId + "_r" + currentId;
    
    $(responseTarget).append("<div id=\"q" + questionId + "_r" + currentId + "\"></div>");
    
    $(responseBloc).append($("#rq" + questionId + "Name").val());
    $("#rq" + questionId + "Name").val("");
   
}

/***
 * 
 * @param {type} target
 * @returns {undefined}
 */
function deleteQuestion(target)
{
    $(target).empty();
    id.i--;
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