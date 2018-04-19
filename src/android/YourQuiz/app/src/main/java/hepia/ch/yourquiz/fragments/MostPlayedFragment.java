package hepia.ch.yourquiz.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.customUI.GeneralRankingAdapter;
import hepia.ch.yourquiz.customUI.MostPlayedAdapter;
import hepia.ch.yourquiz.models.GeneralRankingRowModel;
import hepia.ch.yourquiz.models.MostPlayedRowModel;

import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_IP;
import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_PORT;

public class MostPlayedFragment extends Fragment{
    private List<MostPlayedRowModel> mostPlayedList = new ArrayList<>();
    private MostPlayedAdapter adapter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        adapter = new MostPlayedAdapter(mostPlayedList);
        RecyclerView recyclerView = getActivity().findViewById(R.id.most_played_recyclerView);

        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getActivity().getApplicationContext());
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.addItemDecoration(new DividerItemDecoration(getContext(), LinearLayoutManager.VERTICAL));
        recyclerView.setAdapter(adapter);

        prepareGeneralRanking();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_most_played, container, false);
    }

    private void prepareGeneralRanking() {
        String url = SERVER_IP + ":" + SERVER_PORT + "/ranking/quizzes";

        RequestQueue queue = Volley.newRequestQueue(this.getContext());

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        Log.e("ranking", String.valueOf(response));
                        for (int i = 0; i < response.length(); i++) {
                            try {
                                mostPlayedList.add(new MostPlayedRowModel(response.getJSONObject(i), i+1));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                        adapter.notifyDataSetChanged();
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("ERROR", error.getMessage());
            }
        });

        queue.add(jsonArrayRequest);

    }
}
