package hepia.ch.yourquiz;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

public class ParticipateQuizActivity extends AppCompatActivity {

    TextView txtQuestionNumber;
    TextView txtScore;
    TextView txtCoeff;
    TextView txtQuestion;
    TextView txtViewTimeLeft;

    ProgressBar progressBarTimeLeft;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_participate_quiz);

        txtQuestionNumber = findViewById(R.id.txtQuestionNumber);
        txtScore = findViewById(R.id.txtScore);
        txtCoeff = findViewById(R.id.txtCoeff);
        txtQuestion = findViewById(R.id.txtQuestion);
        txtViewTimeLeft =  findViewById(R.id.textViewTimeLeft);

        progressBarTimeLeft = findViewById(R.id.progressBarTimeLeft);
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
