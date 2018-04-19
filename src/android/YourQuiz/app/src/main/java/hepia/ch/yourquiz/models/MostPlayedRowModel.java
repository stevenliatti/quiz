package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

public class MostPlayedRowModel {
    private int ranking;
    private String quizName;
    private int participationsNb;

    public MostPlayedRowModel(JSONObject jsonObject, int ranking) throws JSONException {
        this.ranking = ranking;
        this.quizName = jsonObject.getString("name");
        this.participationsNb = jsonObject.getInt("participations");
    }

    public int getRanking() {
        return ranking;
    }

    public String getQuizName() {
        return quizName;
    }

    public int getParticipationsNb() {
        return participationsNb;
    }
}
