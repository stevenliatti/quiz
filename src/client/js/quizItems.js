
function Quiz(owner, name, startDateTime, endDateTime)
{
    this.name = name;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.owner = owner;
    this.questions = [];
    this.addQuestions = function(questions)
    {
      this.questions = questions;  
    };
}

/***
 * Constructor of question
 * @param {type} name
 * @returns {Question}
 */
function Question(name) 
{    
    this.name = name;
    this.answers = [];
    this.rightAnswer = null;
    this.answerTime = "10";
    
    /***
     * Adding a new answer
     * @param {type} content
     * @returns {undefined}
     */
    this.addAnswer = function(content)
    {
        this.answers.push(new Answer(content));
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
 * @param {type} content
 * @returns {Answer}
 */
function Answer(content){

    this.content = content;
}