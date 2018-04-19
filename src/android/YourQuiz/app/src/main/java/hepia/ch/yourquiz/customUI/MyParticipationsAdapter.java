package hepia.ch.yourquiz.customUI;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.models.MyParticipationsModel;

public class MyParticipationsAdapter extends RecyclerView.Adapter<MyParticipationsAdapter.ViewHolder> {
    private List<MyParticipationsModel> myParticipationsList;

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView quizNameTextView, quizDescrTextView, quizOwnerTextView, quizScoreTextView;

        ViewHolder(View view) {
            super(view);
            quizNameTextView = view.findViewById(R.id.my_quiz_name);
            quizDescrTextView = view.findViewById(R.id.my_quiz_decr);
            quizOwnerTextView = view.findViewById(R.id.my_quiz_participations);
            quizScoreTextView = view.findViewById(R.id.quiz_score);
        }
    }

    public MyParticipationsAdapter(List<MyParticipationsModel> myParticipationsList) {
        this.myParticipationsList = myParticipationsList;
    }

    @Override
    public MyParticipationsAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_my_participations, parent, false);
        return new MyParticipationsAdapter.ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyParticipationsAdapter.ViewHolder holder, int position) {
        MyParticipationsModel myParticipations = myParticipationsList.get(position);
        holder.quizNameTextView.setText(myParticipations.getQuizName());
        holder.quizDescrTextView.setText(myParticipations.getQuizDecr());
        holder.quizOwnerTextView.setText(myParticipations.getQuizOwner());
        holder.quizScoreTextView.setText(String.valueOf(myParticipations.getQuizScore()));
    }

    @Override
    public int getItemCount() {
        return myParticipationsList.size();
    }
}
