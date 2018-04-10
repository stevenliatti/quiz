package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by raed on 29.03.18.
 */

public class AnswerModel {
    private String idQuestion;
    private String answer;
    private String status;
    private int coefficient;
    private int score;
    public static final String CHECK = "check";
    public static final String TIMEOUT = "timeout";

    public AnswerModel(String idQuestion, String answer) {
        this.idQuestion = idQuestion;
        this.answer = answer;
    }

    public AnswerModel(JSONObject data) throws JSONException {
        setIdQuestion(data.getString("idQuestion"));
        setAnswer(data.getJSONObject("rightAnswer"));
        setStatus(data.getString("status"));
        setCoefficient(data.getInt("coefficient"));
        setScore(data.getInt("score"));
    }

    public JSONObject getAnswerJsonObject() {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("idQuestion", idQuestion);
            jsonObject.put("rightAnswer", new JSONObject().put("content", answer));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject;
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

    public void setAnswer(JSONObject answer) {
        try {
            this.answer = answer.getString("content");
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(int coefficient) {
        this.coefficient = coefficient;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
