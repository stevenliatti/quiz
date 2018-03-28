package hepia.ch.yourquiz.models;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

/**
 * Created by raed on 23.03.18.
 */

public class QuestionModel {
    private String idQuestion;
    private String nameQuestion;
    private ArrayList<String> answers = new ArrayList<>();
    private String time;
    private String questionIndex;
    private String questionCount;

    public QuestionModel() {

    }

    public QuestionModel(String idQuestion, String nameQuestion, ArrayList answers, String time, String questionIndex, String questionCount) {

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

    public ArrayList<String> getAnswers() {
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

    public void setTime(String time) {
        this.time = time;
    }

    public void setQuestionIndex(String questionIndex) {
        this.questionIndex = questionIndex;
    }

    public void setQuestionCount(String questionCount) {
        this.questionCount = questionCount;
    }

    public void setAnswers(JSONArray JSONanswers) throws JSONException {
        for (int i = 0; i < JSONanswers.length(); i++) {
            answers.add(JSONanswers.getJSONObject(i).getString("content"));
        }
    }
}
