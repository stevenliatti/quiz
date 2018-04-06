package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by raed on 23.03.18.
 */

public class JoinModel {
    private String idUser;
    private String idQuiz;
    private String token;

    public JoinModel(String idUser, String idQuiz, String token) {
        this.idUser = idUser;
        this.idQuiz = idQuiz;
        this.token = token;
    }

    public JSONObject getJsonObject() {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("idUser", idUser);
            jsonObject.put("idQuiz", idQuiz);
            jsonObject.put("token", token);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
