package hepia.ch.yourquiz.customUI;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import hepia.ch.yourquiz.ParticipateQuizActivity;
import hepia.ch.yourquiz.R;

public class QuizFinishDialog extends DialogFragment {
    public static QuizFinishDialog newInstance(String title, int score) {
        QuizFinishDialog dialog = new QuizFinishDialog();
        Bundle args = new Bundle();
        args.putString("title", title);
        args.putInt("score", score);
        dialog.setArguments(args);
        return dialog;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        String title = getArguments().getString("title");
        int score = getArguments().getInt("score");

        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // Get the layout inflater
        LayoutInflater inflater = getActivity().getLayoutInflater();

        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
//        builder.setView(inflater.inflate(R.layout.dialog_quiz_finish, null));

        return new AlertDialog.Builder(getActivity())
//                .setIcon(android.R.drawable.ic_dialog_alert)
                .setView(inflater.inflate(R.layout.dialog_quiz_finish, null, false))
                .setTitle(title)
                .setMessage("Votre score : " + String.valueOf(score))
//                .setNegativeButton(R.string.alert_dialog_cancel,
//                        new DialogInterface.OnClickListener() {
//                            public void onClick(DialogInterface dialog,
//                                                int whichButton) {
//                                ((DialogActivity) getActivity())
//                                        .doNegativeClick();
//                            }
//                        })
                .setPositiveButton("Quitter",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int whichButton) {
                                ((ParticipateQuizActivity) getActivity()).exitClick();
                            }
                        }).create();
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        ((ParticipateQuizActivity) getActivity()).exitClick();
        super.onDismiss(dialog);
    }
}
