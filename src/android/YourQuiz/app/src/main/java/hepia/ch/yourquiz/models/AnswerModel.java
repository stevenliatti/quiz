package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

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

    public JSONObject getJsonObject() {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("idQuestion", idQuestion);
            jsonObject.put("rightAnswer", answer);
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

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
