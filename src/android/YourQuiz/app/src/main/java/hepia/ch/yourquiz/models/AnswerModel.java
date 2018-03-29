package hepia.ch.yourquiz.models;

/**
 * Created by raed on 29.03.18.
 */

public class AnswerModel {
    private String idQuestion;
    private String answer;

    public AnswerModel(String idQuestion, String answer) {
        this.idQuestion = idQuestion;
        this.answer = answer;
    }

    public String getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
