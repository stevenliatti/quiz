package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

public class GeneralRankingRowModel {
    private int ranking;
    private String pseudo;
    private int points;

    public GeneralRankingRowModel(JSONObject jsonObject, int ranking) throws JSONException {
        this.ranking = ranking;
        this.pseudo = jsonObject.getString("name");
        this.points = jsonObject.getInt("points");
    }

    public int getRanking() {
        return ranking;
    }

    public String getPseudo() {
        return pseudo;
    }

    public int getPoints() {
        return points;
    }
}
