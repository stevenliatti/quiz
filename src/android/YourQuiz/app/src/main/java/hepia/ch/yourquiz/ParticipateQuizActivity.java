package hepia.ch.yourquiz;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import hepia.ch.yourquiz.models.AnswerModel;
import hepia.ch.yourquiz.models.JoinModel;
import hepia.ch.yourquiz.models.QuestionModel;
import hepia.ch.yourquiz.threads.UpdateTime;

public class ParticipateQuizActivity extends AppCompatActivity {
    TextView txtQuestionNumber;
    TextView txtScore;
    TextView txtCoeff;
    TextView txtQuestion;
    TextView txtViewTimeLeft;

    ProgressBar progressBarTimeLeft;
    LinearLayout answersLayout;

    private final static String SERVER_IP = "raed.eracnos.ch";
    private final static String SERVER_PORT = "443";

    private Socket socket;
    {
        try {
            socket = IO.socket("https://" + SERVER_IP + ":" + SERVER_PORT);
        } catch (URISyntaxException ignored) {}
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_participate_quiz);

        txtQuestionNumber = findViewById(R.id.txtQuestionNumber);
        txtScore = findViewById(R.id.txtScore);
        txtCoeff = findViewById(R.id.txtCoeff);
        txtQuestion = findViewById(R.id.txtQuestion);
        txtViewTimeLeft = findViewById(R.id.textViewTimeLeft);

        progressBarTimeLeft = findViewById(R.id.progressBarTimeLeft);
        answersLayout = findViewById(R.id.layoutAnswers);

        Button nextQuestionButton = findViewById(R.id.next_question_button);
        nextQuestionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                socket.emit("NEXT_QUESTION");
            }
        });

        socket.on("NEW_QUESTION", onNewQuestion);

        socket.connect();

        JoinModel joinModel = new JoinModel(
                "android client",
                "5ac42114e114b4243a98724a",
                "LA CHANCLA"
        );
        socket.emit("JOIN", joinModel.getJsonObject());

        socket.emit("NEXT_QUESTION");
    }

    private Emitter.Listener onNewQuestion = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {
            Log.e("listener", "ho");
            JSONObject data = (JSONObject) args[0];
            Log.println(Log.ASSERT , "MSG :", data.toString());
            final QuestionModel newQuestion;

            try {
                newQuestion = new QuestionModel(data);
                Log.e("answers", String.valueOf(data.getJSONArray("answers")));
            } catch (JSONException e) {
                Log.e("Error", String.valueOf(data.toString()));
//                Toast.makeText(ParticipateQuizActivity.this, "Error in parsing JSON", Toast.LENGTH_LONG).show();
                return;
            }
            ParticipateQuizActivity.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {

                    setQuestionNumber(newQuestion.getQuestionIndex(), newQuestion.getQuestionCount());
                    setQuestion(newQuestion.getNameQuestion());
                    setTimeLeftMax(newQuestion.getTime());

                    answersLayout.removeAllViews();
                    for (String s : newQuestion.getAnswers()) {
                        Button button = new Button(ParticipateQuizActivity.this);
                        button.setText(s);
                        answersLayout.addView(button);
                        button.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                AnswerModel answerModel = new AnswerModel(
                                        newQuestion.getIdQuestion(),
                                        ((Button)v).getText().toString()
                                );
                                socket.emit("ANSWER", answerModel.getJsonObject());
                                // TODO: listen on ANSWER_CONFIRM
                            }
                        });
                    }

                    new UpdateTime(newQuestion.getTime(), ParticipateQuizActivity.this).start();
                }
            });
        }
    };

    @Override
    protected void onDestroy() {
        socket.disconnect();
        socket.off("NEW_QUESTION", onNewQuestion);
        super.onDestroy();
    }

    public Socket getSocket() {
        return socket;
    }

    private void setQuestionNumber(int current, int total) {
        txtQuestionNumber.setText("Question " + (current + 1) + "/" + total);
    }

    private void setScore(float score) {
        txtScore.setText("Score : " + score);
    }

    private void setCoeff(float coeff) {
        txtCoeff.setText("Coeff : " + coeff);
    }

    private void setQuestion(String question) {
        txtQuestion.setText(question);
    }

    private void setTimeLeftMax(int max) {
        progressBarTimeLeft.setMax(max);
    }

    public void setTimeLeft(int left) {
        if (left == 1 || left == 0) {
            txtViewTimeLeft.setText(left + " seconde restante");
        } else {
            txtViewTimeLeft.setText(left + " secondes restantes");
        }

        progressBarTimeLeft.setProgress(left);
    }
}
