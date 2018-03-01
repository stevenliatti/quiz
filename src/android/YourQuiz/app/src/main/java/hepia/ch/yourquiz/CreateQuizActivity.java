package hepia.ch.yourquiz;

import android.app.DatePickerDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.DatePicker;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class CreateQuizActivity extends AppCompatActivity {
    private Button quizBeginDateButton;
    private TextView quizBeginDate;
    private Button quizEndDateButton;
    private TextView quizEndDate;
    private Calendar myCalendar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_quiz);

        myCalendar = Calendar.getInstance();

        quizBeginDateButton = findViewById(R.id.begin_date_button);
        quizBeginDate = findViewById(R.id.begin_date_textview);

        quizEndDateButton = findViewById(R.id.end_date_button);
        quizEndDate = findViewById(R.id.end_date_textview);

        CheckBox participantsNbrCheckBox = findViewById(R.id.enter_participants_nbr);
        final TextView participantsNbrTextView = findViewById(R.id.participant_nbr);
        participantsNbrCheckBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    participantsNbrTextView.setVisibility(View.VISIBLE);
                } else {
                    participantsNbrTextView.setText("");
                    participantsNbrTextView.setVisibility(View.GONE);
                }
            }
        });

        final DatePickerDialog.OnDateSetListener dateBegin = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                // TODO Auto-generated method stub
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateLabelBeginDate();
            }

        };

        final DatePickerDialog.OnDateSetListener dateEnd = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                // TODO Auto-generated method stub
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateLabelEndDate();
            }

        };

        quizBeginDateButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                new DatePickerDialog(CreateQuizActivity.this, dateBegin, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });

        quizEndDateButton.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                new DatePickerDialog(CreateQuizActivity.this, dateEnd, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });
    }
    private void updateLabelBeginDate() {
        String myFormat = "E, dd MMM yyyy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.FRANCE);

        quizBeginDate.setText(sdf.format(myCalendar.getTime()));
    }
    private void updateLabelEndDate() {
        String myFormat = "E, dd MMM yyyy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.FRANCE);

        quizEndDate.setText(sdf.format(myCalendar.getTime()));
    }
}
