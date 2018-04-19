package hepia.ch.yourquiz.customUI;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.models.GeneralRankingRowModel;

public class GeneralRankingAdapter extends RecyclerView.Adapter<GeneralRankingAdapter.ViewHolder> {
    private List<GeneralRankingRowModel> generalRankingList;

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView rankingTextView, pseudoTextView, pointsTextView;

        ViewHolder(View view) {
            super(view);
            rankingTextView = view.findViewById(R.id.ranking_textView);
            pseudoTextView = view.findViewById(R.id.pseudo_textView);
            pointsTextView = view.findViewById(R.id.points_textView);
        }
    }

    public GeneralRankingAdapter(List<GeneralRankingRowModel> generalRankingList) {
        this.generalRankingList = generalRankingList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.row_general_ranking, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        GeneralRankingRowModel generalRanking = generalRankingList.get(position);
        holder.rankingTextView.setText(String.valueOf(generalRanking.getRanking()));
        holder.pseudoTextView.setText(generalRanking.getPseudo());
        holder.pointsTextView.setText(String.valueOf(generalRanking.getPoints()));
    }

    @Override
    public int getItemCount() {
        return generalRankingList.size();
    }
}
