/***
 * Constructor of question
 * @param {type} name
 * @param {type} startDate
 * @param {type} endDate
 * @param {type} owner
 * @returns {Question}
 */
function Question(name,startDate,endDate, owner) 
{    
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.answers = [];
    this.rightAnswer = null;
    
    /***
     * Adding a new answer
     * @param {type} questionName
     * @param {type} answerTime
     * @param {type} content
     * @returns {undefined}
     */
    this.addAnswer = function(questionName, answerTime, content)
    {
        this.answers.push(new Answer(questionName,answerTime,content));
    };
    
    /***
     * Setter of right answer
     * @param {type} answer
     * @returns {undefined}
     */
    this.setRightAnswer = function(answer){
        this.rightAnswer = answer;
    };   
}

/***
 * Constructor of answer
 * @param {type} questionName
 * @param {type} answerTime
 * @param {type} content
 * @returns {Answer}
 */
function Answer(questionName, answerTime, content)
{
    this.questionName = questionName;
    this.answerTime = answerTime;
    this.content = content;
}