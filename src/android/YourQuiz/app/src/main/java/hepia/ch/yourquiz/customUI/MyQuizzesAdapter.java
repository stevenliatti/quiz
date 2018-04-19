package hepia.ch.yourquiz.customUI;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.models.MyQuizzesModel;

public class MyQuizzesAdapter extends RecyclerView.Adapter<MyQuizzesAdapter.ViewHolder> {
    private List<MyQuizzesModel> myQuizzesList;

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView quizNameTextView, quizDescrTextView, quizPartTextView;

        ViewHolder(View view) {
            super(view);
            quizNameTextView = view.findViewById(R.id.my_quiz_name);
            quizDescrTextView = view.findViewById(R.id.my_quiz_decr);
            quizPartTextView = view.findViewById(R.id.my_quiz_participations);
        }
    }

    public MyQuizzesAdapter(List<MyQuizzesModel> myQuizzesList) {
        this.myQuizzesList = myQuizzesList;
    }

    @Override
    public MyQuizzesAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_my_quizzes, parent, false);
        return new MyQuizzesAdapter.ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyQuizzesAdapter.ViewHolder holder, int position) {
        MyQuizzesModel myQuizzes = myQuizzesList.get(position);
        holder.quizNameTextView.setText(myQuizzes.getQuizName());
        holder.quizDescrTextView.setText(myQuizzes.getQuizDecr());
        holder.quizPartTextView.setText(String.valueOf(myQuizzes.getQuizParticipations()));
    }

    @Override
    public int getItemCount() {
        return myQuizzesList.size();
    }
}
