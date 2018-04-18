package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.apmem.tools.layouts.FlowLayout;

import hepia.ch.yourquiz.ParticipateQuizActivity;
import hepia.ch.yourquiz.R;

public class QuizElementFragment extends Fragment {
    public static final String ID = "id";
    public static final String NAME = "name";
    public static final String DESCRIPTION = "description";
    public static final String OWNER = "owner";
    public static final String NBQUESTION = "nbQuestions";

    private String id;
    private String name;
    private String description;
    private String owner;
    private String nbQuestion;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.quiz_element, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        FlowLayout.LayoutParams layoutParams = (FlowLayout.LayoutParams) view.getLayoutParams();
        layoutParams.setMargins(dpToPx(10), dpToPx(10), dpToPx(10), dpToPx(10));

        final Bundle bundle = getArguments();
        if (bundle != null) {
            id = bundle.getString(ID);
            owner = bundle.getString(OWNER);
            ((TextView) view.findViewById(R.id.quiz_name)).setText(bundle.getString(NAME, "Not Found"));
            ((TextView) view.findViewById(R.id.quiz_description)).setText(bundle.getString(DESCRIPTION, "Not Found"));
            ((TextView) view.findViewById(R.id.quiz_nb_question)).setText(bundle.getString(NBQUESTION, "Not Found"));
            ((TextView) view.findViewById(R.id.quiz_nb_question)).setText(bundle.getString(NBQUESTION, "Not Found"));
            view.findViewById(R.id.participate_button).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(v.getContext(), ParticipateQuizActivity.class);
                    intent.putExtra(ParticipateQuizActivity.QUIZ_EXTRA, bundle);
                    startActivity(intent);
                }
            });
        }
    }

    public int dpToPx(int dp) {
        float density = getContext().getResources()
                .getDisplayMetrics()
                .density;
        return Math.round((float) dp * density);
    }
}
