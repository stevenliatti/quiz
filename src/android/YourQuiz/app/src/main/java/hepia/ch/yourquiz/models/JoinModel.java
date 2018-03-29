package hepia.ch.yourquiz.models;

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
}
