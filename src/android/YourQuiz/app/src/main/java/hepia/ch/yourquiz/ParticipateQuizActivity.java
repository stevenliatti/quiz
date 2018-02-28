package hepia.ch.yourquiz;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

public class ParticipateQuizActivity extends AppCompatActivity {

    TextView txtQuestionNumber = (TextView)findViewById(R.id.txtQuestionNumber);
    TextView txtScore = (TextView)findViewById(R.id.txtScore);
    TextView txtCoeff = (TextView)findViewById(R.id.txtCoeff);
    TextView txtQuestion = (TextView)findViewById(R.id.txtQuestion);
    TextView txtViewTimeLeft = findViewById(R.id.textViewTimeLeft);

    Button btnAnswerA = findViewById(R.id.buttonAnswerA);
    Button btnAnswerB = findViewById(R.id.buttonAnswerB);
    Button btnAnswerC = findViewById(R.id.buttonAnswerC);
    Button btnAnswerD = findViewById(R.id.buttonAnswerD);

    ProgressBar progressBarTimeLeft = findViewById(R.id.progressBarTimeLeft);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_participate_quiz);
    }

    private void setQuestionNumber(int current, int total) {
        txtQuestionNumber.setText("Question : "+current+"/"+total);
    }

    private void setScore(float score) {
        txtScore.setText("Score : " + score);
    }

    private void setCoeff(float coeff) {
        txtCoeff.setText("Xcoeff : " + coeff);
    }

    private void setQuestion(String question) {
        txtQuestion.setText(question);
    }

    private void setAnswerA(String answer) {
        btnAnswerA.setText(answer);
    }

    private void setAnswerB(String answer) {
        btnAnswerB.setText(answer);
    }

    private void setAnswerC(String answer) {
        btnAnswerC.setText(answer);
    }

    private void setAnswerD(String answer) {
        btnAnswerD.setText(answer);
    }

    private void setTimeLeftMax(int max) {
        progressBarTimeLeft.setMax(max);
    }

    private void setTimeLeft(int left) {
        if (left == 1 || left == 0) {
            txtViewTimeLeft.setText(left + "seconde restante");
        } else {
            txtViewTimeLeft.setText(left + " secondes restantes");
        }

        progressBarTimeLeft.setProgress(left);
    }
}
