package hepia.ch.yourquiz.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by raed on 23.03.18.
 */

public class QuestionModel {
    private String idQuestion;
    private String nameQuestion;
    private ArrayList<String> answers = new ArrayList<>();
    private int time;
    private int questionIndex;
    private int questionCount;

    public QuestionModel() {

    }

    public QuestionModel(String idQuestion, String nameQuestion, ArrayList<String> answers, int time, int questionIndex, int questionCount) {

        this.idQuestion = idQuestion;
        this.nameQuestion = nameQuestion;
        this.answers = answers;
        this.time = time;
        this.questionIndex = questionIndex;
        this.questionCount = questionCount;
    }

    public QuestionModel(JSONObject data) throws JSONException {
        setNameQuestion(data.getString("nameQuestion"));
        setAnswers(data.getJSONArray("answers"));
        setTime(data.getInt("time")); // TODO: time not received!!!
        setQuestionIndex(data.getInt("questionIndex"));
        setQuestionCount(data.getInt("questionCount"));
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

    public int getTime() {
        return time;
    }

    public int getQuestionIndex() {
        return questionIndex;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

    public void setNameQuestion(String nameQuestion) {
        this.nameQuestion = nameQuestion;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public void setQuestionIndex(int questionIndex) {
        this.questionIndex = questionIndex;
    }

    public void setQuestionCount(int questionCount) {
        this.questionCount = questionCount;
    }

    public void setAnswers(JSONArray JSONanswers) throws JSONException {
        for (int i = 0; i < JSONanswers.length(); i++) {
            answers.add(JSONanswers.getJSONObject(i).getString("content"));
        }
    }
}
