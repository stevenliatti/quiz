package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.customUI.MyQuizzesAdapter;
import hepia.ch.yourquiz.manager.CurrentUser;
import hepia.ch.yourquiz.models.MyQuizzesModel;

import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_IP;
import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_PORT;

public class MyQuizzesFragment extends Fragment {
    private List<MyQuizzesModel> myQuizzesList = new ArrayList<>();
    private MyQuizzesAdapter adapter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_my_quizzes, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        adapter = new MyQuizzesAdapter(myQuizzesList);
        RecyclerView recyclerView = getActivity().findViewById(R.id.my_quizzes_RecyclerView);

        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getActivity().getApplicationContext());
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.addItemDecoration(new DividerItemDecoration(getContext(), LinearLayoutManager.VERTICAL));
        recyclerView.setAdapter(adapter);

        prepareMyParticipations();
    }

    private void prepareMyParticipations() {
        if (CurrentUser.isConnected()) {
            String url = SERVER_IP + ":" + SERVER_PORT + "/quiz/getMyQuizzes";

            RequestQueue queue = Volley.newRequestQueue(this.getContext());

            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    Log.e("myQuizzes", String.valueOf(response));
                    for (int i = 0; i < response.length(); i++) {
                        try {
                            myQuizzesList.add(new MyQuizzesModel(response.getJSONObject(i)));
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
            }){
                @Override
                public Map<String, String> getHeaders() {
                    HashMap<String, String> headers = new HashMap<>();
                    headers.put("Authorization", CurrentUser.getUser().getToken());
                    return headers;
                }
            };

            queue.add(jsonArrayRequest);
        }
    }
}
