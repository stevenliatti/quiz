package hepia.ch.yourquiz.models;

/**
 * Created by raed on 23.03.18.
 */

public class QuestionModel {
    private String idQuestion;
    private String nameQuestion;
    private String answers;
    private String time;
    private String questionIndex;
    private String questionCount;

    public QuestionModel() {

    }

    public QuestionModel(String idQuestion, String nameQuestion, String answers, String time, String questionIndex, String questionCount) {

        this.idQuestion = idQuestion;
        this.nameQuestion = nameQuestion;
        this.answers = answers;
        this.time = time;
        this.questionIndex = questionIndex;
        this.questionCount = questionCount;
    }

    public String getIdQuestion() {
        return idQuestion;
    }

    public String getNameQuestion() {
        return nameQuestion;
    }

    public String getAnswers() {
        return answers;
    }

    public String getTime() {
        return time;
    }

    public String getQuestionIndex() {
        return questionIndex;
    }

    public String getQuestionCount() {
        return questionCount;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

    public void setNameQuestion(String nameQuestion) {
        this.nameQuestion = nameQuestion;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setQuestionIndex(String questionIndex) {
        this.questionIndex = questionIndex;
    }

    public void setQuestionCount(String questionCount) {
        this.questionCount = questionCount;
    }
}
