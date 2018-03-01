package hepia.ch.yourquiz;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void CreateQuizOnClick(View view) {
        Intent intent = new Intent(MainActivity.this, CreateQuizActivity.class);
        startActivity(intent);
    }

    public void ParticipateQuizOnClick(View view) {
        Intent intent = new Intent(MainActivity.this, ParticipateQuiz.class);
        startActivity(intent);
    }
}
