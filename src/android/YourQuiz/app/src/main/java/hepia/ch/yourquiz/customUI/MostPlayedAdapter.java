package hepia.ch.yourquiz.customUI;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.models.MostPlayedRowModel;

public class MostPlayedAdapter extends RecyclerView.Adapter<MostPlayedAdapter.ViewHolder> {
    private List<MostPlayedRowModel> mostPlayedList;

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView rankingTextView, quizNameTextView, participationsTextView;

        ViewHolder(View view) {
            super(view);
            rankingTextView = view.findViewById(R.id.ranking_textView);
            quizNameTextView = view.findViewById(R.id.quiz_name_textView);
            participationsTextView = view.findViewById(R.id.participations_textView);
        }
    }

    public MostPlayedAdapter(List<MostPlayedRowModel> mostPlayedList) {
        this.mostPlayedList = mostPlayedList;
    }

    @Override
    public MostPlayedAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_most_played, parent, false);
        return new MostPlayedAdapter.ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MostPlayedAdapter.ViewHolder holder, int position) {
        MostPlayedRowModel generalRanking = mostPlayedList.get(position);
        holder.rankingTextView.setText(String.valueOf(generalRanking.getRanking()));
        holder.quizNameTextView.setText(generalRanking.getQuizName());
        holder.participationsTextView.setText(String.valueOf(generalRanking.getParticipationsNb()));
    }

    @Override
    public int getItemCount() {
        return mostPlayedList.size();
    }
}
