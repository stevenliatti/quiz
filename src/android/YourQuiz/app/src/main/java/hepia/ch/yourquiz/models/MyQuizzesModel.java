package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

public class MyQuizzesModel {
    private String quizName;
    private String quizDecr;
    private String quizParticipations;

    public MyQuizzesModel(JSONObject jsonObject) throws JSONException {
        this.quizName = jsonObject.getString("name");
        this.quizDecr = jsonObject.getString("description");
        this.quizParticipations = jsonObject.getString("participations");
    }

    public String getQuizName() {
        return quizName;
    }

    public String getQuizDecr() {
        return quizDecr;
    }

    public String getQuizParticipations() {
        return quizParticipations;
    }
}
