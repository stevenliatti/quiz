package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

public class MyParticipationsModel {
    private String quizName;
    private String quizDecr;
    private String quizOwner;
    private String quizScore;

    public MyParticipationsModel(JSONObject jsonObject) throws JSONException {
        this.quizName = jsonObject.getString("name");
        this.quizDecr = jsonObject.getString("description");
        this.quizOwner = jsonObject.getString("owner");
        this.quizScore = jsonObject.getString("score");
    }

    public String getQuizName() {
        return quizName;
    }

    public String getQuizDecr() {
        return quizDecr;
    }

    public String getQuizOwner() {
        return quizOwner;
    }

    public String getQuizScore() {
        return quizScore;
    }
}
