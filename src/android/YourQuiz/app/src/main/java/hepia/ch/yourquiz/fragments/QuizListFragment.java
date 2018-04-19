package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
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

import org.apmem.tools.layouts.FlowLayout;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;
import java.util.Map;

import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.manager.CurrentUser;

import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_IP;
import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_PORT;

public class QuizListFragment extends Fragment {
    private ViewGroup container;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        this.container = container;
        getAllQuizList();

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_quiz_list, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
    }

    private void getAllQuizList() {
        RequestQueue queue = Volley.newRequestQueue(this.getContext());

        String url;
        if (CurrentUser.isConnected()) {
            url = SERVER_IP + ":" + SERVER_PORT + "/quiz/getNotParticipated";
        } else {
            url = SERVER_IP + ":" + SERVER_PORT + "/quiz/getAll";
        }

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                Log.e("allquiz", String.valueOf(response));
                FlowLayout quizListFlowLayout = container.findViewById(R.id.quiz_list);
                quizListFlowLayout.removeAllViews();
                for (int i = 0; i < response.length(); i++) {
                    FragmentManager fragmentManager = getFragmentManager();
                    QuizElementFragment quizElementFragment = new QuizElementFragment();
                    Bundle bundle = new Bundle();
                    try {
                        bundle.putString(QuizElementFragment.ID, response.getJSONObject(i).getString(QuizElementFragment.ID));
                        bundle.putString(QuizElementFragment.NAME, response.getJSONObject(i).getString(QuizElementFragment.NAME));
                        bundle.putString(QuizElementFragment.DESCRIPTION, response.getJSONObject(i).getString(QuizElementFragment.DESCRIPTION));
                        bundle.putString(QuizElementFragment.OWNER, response.getJSONObject(i).getString(QuizElementFragment.OWNER));
                        bundle.putString(QuizElementFragment.NBQUESTION, response.getJSONObject(i).getString(QuizElementFragment.NBQUESTION));
                        quizElementFragment.setArguments(bundle);
                        fragmentManager.beginTransaction().add(R.id.quiz_list, quizElementFragment).commit();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
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
