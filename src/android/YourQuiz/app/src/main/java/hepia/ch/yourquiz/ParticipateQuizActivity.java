package hepia.ch.yourquiz;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;

import hepia.ch.yourquiz.customUI.QuizFinishDialog;
import hepia.ch.yourquiz.fragments.QuizElementFragment;
import hepia.ch.yourquiz.manager.CurrentUser;
import hepia.ch.yourquiz.models.AnswerModel;
import hepia.ch.yourquiz.models.JoinModel;
import hepia.ch.yourquiz.models.QuestionModel;
import hepia.ch.yourquiz.threads.UpdateTime;

import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_IP;
import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_PORT;

public class ParticipateQuizActivity extends AppCompatActivity {
    public static final String QUIZ_EXTRA = "quiz_extra";

    private TextView txtQuestionNumber;
    private TextView txtScore;
    private TextView txtCoeff;
    private TextView txtQuestion;
    private TextView txtViewTimeLeft;
    private ArrayList<Button> buttonsAnswerList;
    private String selectedAnswer;
    private UpdateTime updateTime;

    ProgressBar progressBarTimeLeft;
    LinearLayout answersLayout;
    Bundle extras;

    private Socket socket;
    {
        try {
            socket = IO.socket(SERVER_IP + ":" + SERVER_PORT);
        } catch (URISyntaxException ignored) {
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_participate_quiz);

        txtQuestionNumber = findViewById(R.id.txtQuestionNumber);
        txtScore = findViewById(R.id.txtScore);
        txtCoeff = findViewById(R.id.txtCoeff);
        txtQuestion = findViewById(R.id.txtQuestion);
        txtViewTimeLeft = findViewById(R.id.textViewTimeLeft);

        progressBarTimeLeft = findViewById(R.id.progressBarTimeLeft);
        answersLayout = findViewById(R.id.layoutAnswers);

        socket.on("NEW_QUESTION", onNewQuestion);
        socket.on("ANSWER_CONFIRM", onAnswerConfirm);
        socket.on("QUIZ_FINISH", onQuizFinish);

        socket.connect();

        extras = getIntent().getBundleExtra(QUIZ_EXTRA);
        if (extras != null) {
            JoinModel joinModel = new JoinModel(
                    CurrentUser.getUser().getId(),
                    extras.getString(QuizElementFragment.ID),
                    CurrentUser.getUser().getToken());
            socket.emit("JOIN", joinModel.getJsonObject());

            socket.emit("NEXT_QUESTION");
        }
    }

    private Emitter.Listener onNewQuestion = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {
            Log.e("listener", "ho");
            JSONObject data = (JSONObject) args[0];
            Log.println(Log.ASSERT, "MSG :", data.toString());
            final QuestionModel newQuestion;

            try {
                newQuestion = new QuestionModel(data);
                Log.e("answers", String.valueOf(data.getJSONArray("answers")));

                ParticipateQuizActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        setQuestionNumber(newQuestion.getQuestionIndex(), newQuestion.getQuestionCount());
                        setQuestion(newQuestion.getNameQuestion());
                        setTimeLeftMax(newQuestion.getTime());

                        answersLayout.removeAllViews();
                        buttonsAnswerList = new ArrayList<>();
                        for (String s : newQuestion.getAnswers()) {
                            final Button buttonAnswer = new Button(ParticipateQuizActivity.this);
                            buttonAnswer.setText(s);
                            buttonsAnswerList.add(buttonAnswer);
                            answersLayout.addView(buttonAnswer);
                            buttonAnswer.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    AnswerModel answerModel = new AnswerModel(
                                            newQuestion.getIdQuestion(),
                                            ((Button) v).getText().toString()
                                    );
                                    selectedAnswer = ((Button) v).getText().toString();
                                    Log.e("answerObject", String.valueOf(answerModel.getAnswerJsonObject()));
                                    socket.emit("ANSWER", answerModel.getAnswerJsonObject());
                                    //updateTime.setStopped(true);
                                    updateTime.interrupt();
                                    // TODO: listen on ANSWER_CONFIRM
                                    for (Button b : buttonsAnswerList) {
                                        b.setOnClickListener(null);
                                    }
                                }
                            });
                        }

                        updateTime = new UpdateTime(newQuestion.getTime(), ParticipateQuizActivity.this);
                        updateTime.start();
                    }
                });
            } catch (JSONException e) {
                Log.e("Error", String.valueOf(data.toString()));
//                Toast.makeText(ParticipateQuizActivity.this, "Error in parsing JSON", Toast.LENGTH_LONG).show();
                return;
            }
        }
    };

    private Emitter.Listener onAnswerConfirm = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            Log.e("answerConfirm", String.valueOf(args[0]));
            JSONObject data = (JSONObject) args[0];
            try {
                final AnswerModel answerModel = new AnswerModel(data);

                ParticipateQuizActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        setCoeff(answerModel.getCoefficient());
                        setScore(answerModel.getScore());

                        if (answerModel.getStatus().equals(AnswerModel.TIMEOUT)) {
                            synchronized (buttonsAnswerList) {
                                for (Button answer : buttonsAnswerList) {
                                    if (answer.getText().toString().equals(answerModel.getAnswer())) {
                                        answer.setBackgroundColor(Color.argb(255, 6, 192, 64));
                                    }
                                }
                            }
                        }

                        if (answerModel.getStatus().equals(AnswerModel.CHECK)) {
                            synchronized (buttonsAnswerList) {
                                for (Button answer : buttonsAnswerList) {
                                    Log.e("selectedAnswer", selectedAnswer);
                                    Log.e("answerServer", answerModel.getAnswer());

                                    if (answer.getText().toString().equals(selectedAnswer) || answer.getText().toString().equals(answerModel.getAnswer())) {
                                        answer.setBackgroundColor(Color.argb(255, 6, 192, 64));
                                    }

                                    if (answer.getText().toString().equals(selectedAnswer) && !selectedAnswer.equals(answerModel.getAnswer())) {
                                        answer.setBackgroundColor(Color.RED);
                                    }
                                }
                            }
                        }
                    }
                });
                Thread.sleep(1000);
                socket.emit("NEXT_QUESTION");
            } catch (JSONException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    };

    private Emitter.Listener onQuizFinish = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {
            JSONObject data = (JSONObject) args[0];
            Log.println(Log.ASSERT, "QUIZ_FINISH", data.toString());
            String quizName = extras.getString(QuizElementFragment.NAME);
            int score = 0;
            try {
                score = data.getInt("score");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            QuizFinishDialog.newInstance(quizName, score).show(getFragmentManager(), "");
        }
    };

    public void exitClick() {
        socket.off("NEW_QUESTION", onNewQuestion);
        socket.off("ANSWER_CONFIRM", onAnswerConfirm);
        socket.off("QUIZ_FINISH", onQuizFinish);
        socket.disconnect();
        finish();
    }

    @Override
    protected void onDestroy() {
        socket.off("NEW_QUESTION", onNewQuestion);
        socket.off("ANSWER_CONFIRM", onAnswerConfirm);
        socket.off("QUIZ_FINISH", onQuizFinish);
        socket.disconnect();
        super.onDestroy();
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
