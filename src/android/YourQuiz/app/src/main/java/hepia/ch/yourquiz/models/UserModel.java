package hepia.ch.yourquiz.models;

import org.json.JSONException;
import org.json.JSONObject;

public class UserModel {
    private String id;
    private String email;
    private String pseudo;
    private String role;
    private String token;

    public UserModel() {
    }

    public UserModel(JSONObject data) throws JSONException {
        setId(data.getString("_id"));
        setEmail(data.getString("email"));
        setPseudo(data.getString("pseudo"));
        setRole(data.getString("role"));
        setToken(data.getString("token"));
    }

    public void setId(String id) {
        this.id = id;
    }

    private void setEmail(String email) {
        this.email = email;
    }

    private void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    private void setRole(String role) {
        this.role = role;
    }

    private void setToken(String token) {
        this.token = token;
    }

    public String getId() {
        return id;
    }
}
