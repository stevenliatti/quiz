package hepia.ch.yourquiz.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import hepia.ch.yourquiz.MainActivity;
import hepia.ch.yourquiz.R;
import hepia.ch.yourquiz.manager.CurrentUser;
import hepia.ch.yourquiz.models.UserModel;

import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_IP;
import static hepia.ch.yourquiz.manager.ServerConfig.SERVER_PORT;

public class LoginFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_login, container, false);
    }

    @Override
    public void onViewCreated(final View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        Button loginButton = view.findViewById(R.id.login_button);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RequestQueue queue = Volley.newRequestQueue(getContext());

                Map<String, String> jsonParams = new HashMap<>();
                EditText email = view.findViewById(R.id.email_edit_text);
                EditText password = view.findViewById(R.id.password_edit_text);
                jsonParams.put("email", email.getText().toString());
                jsonParams.put("password", password.getText().toString());

                String url = SERVER_IP + ":" + SERVER_PORT + "/auth/login";

                JsonObjectRequest loginRequest = new JsonObjectRequest(
                        Request.Method.POST,
                        url,
                        new JSONObject(jsonParams),

                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
//                                Toast.makeText(getContext(), response.toString(), Toast.LENGTH_LONG).show();
                                Log.e("response", response.toString());
                                try {
                                    CurrentUser.setUser(new UserModel(response));
                                    FragmentManager fragmentManager = getActivity().getFragmentManager();
                                    fragmentManager
                                            .beginTransaction()
                                            .replace(R.id.content_frame, new QuizListFragment())
                                            .commit();
                                    NavigationView navigationView = getActivity().findViewById(R.id.app_nav_view);
                                    navigationView.setCheckedItem(R.id.nav_home);
                                    navigationView.getMenu().findItem(R.id.nav_login).setTitle("Se déconnecter");
                                    ((MainActivity)getActivity()).changeNavMenuState();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Toast.makeText(getContext(), error.toString(), Toast.LENGTH_LONG).show();
                                CurrentUser.setIsConnected(false);
                            }
                        }) {

                    @Override
                    public Map<String, String> getHeaders() {
                        HashMap<String, String> headers = new HashMap<>();
                        headers.put("Content-Type", "application/json; charset=utf-8");
                        return headers;
                    }
                };

                queue.add(loginRequest);
            }
        });
    }
}
