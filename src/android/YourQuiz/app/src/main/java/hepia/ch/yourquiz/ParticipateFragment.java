package hepia.ch.yourquiz;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import hepia.ch.yourquiz.models.JoinModel;
import hepia.ch.yourquiz.models.QuestionModel;

/**
 * Created by raed on 22.03.18.
 */

public class ParticipateFragment extends Fragment {
    View view;

    private final String SERVER_IP = "raed.eracnos.ch";
    private final String SERVER_PORT = "443";

    final Gson gson = new Gson();

    private Socket mSocket;
    {
        try {
            mSocket = IO.socket("https://" + SERVER_IP + ":" + SERVER_PORT);
        } catch (URISyntaxException e) {}
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.activity_participate_quiz, container, false);

        mSocket.on("NEW_QUESTION", onNewQuestion);

        mSocket.connect();

        JoinModel joinModel = new JoinModel(
                "android client",
                "5ab27190d0e54f10ecf3fa14",
                "LA CHANCLA"
        );
        mSocket.emit("JOIN", gson.toJson(joinModel));

        mSocket.emit("NEXT_QUESTION");

        return view;
    }

    private Emitter.Listener onNewQuestion = new Emitter.Listener() {

        @Override
        public void call(final Object... args) {
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    JSONObject data = (JSONObject) args[0];
                    Log.println(Log.ASSERT , "MSG :", data.toString());
                    QuestionModel newQuestion = new QuestionModel();

                    try {
                        newQuestion.setNameQuestion(data.getString("nameQuestion"));
                    } catch (JSONException e) {
                        return;
                    }

                    TextView tv = view.findViewById(R.id.txtQuestion);
                    tv.setText(newQuestion.getNameQuestion());
                }
            });
        }
    };
}
