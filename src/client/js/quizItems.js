
function Quiz(idUser,owner, name, description)
{
    this.name = name;
    this.owner = owner;
    this.description = description;
    this.questions = [];
    this.nbQuestions = 0;
    this.idUser = idUser;
    this.addQuestions = function(questions)
    {
      this.questions = questions;  
      this.nbQuestions = questions.length;
    };
}

/***
 * Constructor of question
 * @param {type} id
 * @param {type} name
 * @returns {Question}
 */
function Question(id,name) 
{   
    this.id = id; 
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