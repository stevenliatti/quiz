package hepia.ch.yourquiz;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import hepia.ch.yourquiz.models.AnswerModel;
import hepia.ch.yourquiz.models.JoinModel;
import hepia.ch.yourquiz.models.QuestionModel;
import hepia.ch.yourquiz.threads.UpdateTime;

/**
 * Created by raed on 22.03.18.
 */

public class ParticipateFragment extends Fragment {
    View view;
    TextView txtQuestionNumber;
    TextView txtScore;
    TextView txtCoeff;
    TextView txtQuestion;
    TextView txtViewTimeLeft;

    ProgressBar progressBarTimeLeft;
    LinearLayout answersLayout;

    private UpdateTime updateTime;

    private final static String SERVER_IP = "raed.eracnos.ch";
    private final static String SERVER_PORT = "443";

    final Gson gson = new Gson();

    private Socket socket;
    {
        try {
            socket = IO.socket("https://" + SERVER_IP + ":" + SERVER_PORT);
        } catch (URISyntaxException ignored) {}
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.activity_participate_quiz, container, false);

        txtQuestionNumber = view.findViewById(R.id.txtQuestionNumber);
        txtScore = view.findViewById(R.id.txtScore);
        txtCoeff = view.findViewById(R.id.txtCoeff);
        txtQuestion = view.findViewById(R.id.txtQuestion);
        txtViewTimeLeft = view.findViewById(R.id.textViewTimeLeft);

        progressBarTimeLeft = view.findViewById(R.id.progressBarTimeLeft);
        answersLayout = view.findViewById(R.id.layoutAnswers);

        socket.on("NEW_QUESTION", onNewQuestion);

        socket.connect();

        JoinModel joinModel = new JoinModel(
                "android client",
                "5abcb8af18c9b407baf340d4",
                "LA CHANCLA"
        );
        socket.emit("JOIN", gson.toJson(joinModel));

        socket.emit("NEXT_QUESTION");

        return view;
    }

    private Emitter.Listener onNewQuestion = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {
            Log.e("listener", "ho");
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    Log.println(Log.ASSERT , "MSG :", data.toString());
                    final QuestionModel newQuestion;

                    try {
                        newQuestion = new QuestionModel(data);
                        Log.e("answers", String.valueOf(data.getJSONArray("answers")));
                    } catch (JSONException e) {
                        Log.e("Error", String.valueOf(data.toString()));
                        Toast.makeText(getActivity(), "Error in parsing JSON", Toast.LENGTH_LONG).show();
                        return;
                    }

                    setQuestionNumber(newQuestion.getQuestionIndex(), newQuestion.getQuestionCount());
                    setQuestion(newQuestion.getNameQuestion());
                    setTimeLeftMax(newQuestion.getTime());

                    answersLayout.removeAllViews();
                    for (String s : newQuestion.getAnswers()) {
                        Button button = new Button(view.getContext());
                        button.setText(s);
                        answersLayout.addView(button);
                        button.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                AnswerModel answerModel = new AnswerModel(
                                        newQuestion.getIdQuestion(),
                                        ((Button)v).getText().toString()
                                );
                                socket.emit("ANSWER", gson.toJson(answerModel));
                                // TODO: listen on ANSWER_CONFIRM
                            }
                        });
                    }

                    updateTime = new UpdateTime(newQuestion.getTime(), getActivity(), ParticipateFragment.this);
                    updateTime.start();
                }
            });
        }
    };

    @Override
    public void onDestroyView() {
        socket.disconnect();
        socket.off("NEW_QUESTION", onNewQuestion);
        updateTime.setStop(true);
        super.onDestroyView();
    }

    public Socket getSocket() {
        return socket;
    }

    private void setQuestionNumber(int current, int total) {
        txtQuestionNumber.setText("Question : "+current+"/"+total);
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
