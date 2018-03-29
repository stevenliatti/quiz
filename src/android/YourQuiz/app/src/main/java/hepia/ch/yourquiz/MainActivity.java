package hepia.ch.yourquiz;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Button btnListQuiz = findViewById(R.id.btnListQuiz);
        btnListQuiz.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), ListQuizActivity.class);
                startActivity(intent);
            }
        });

        final Button btnParticipateQuiz = findViewById(R.id.btnParticipateQuiz);
        btnParticipateQuiz.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(v.getContext(), ParticipateActivity.class);
                startActivity(intent);
            }
        });
    }
}
