package hepia.ch.yourquiz.threads;

import android.app.Activity;
import android.util.Log;

import hepia.ch.yourquiz.ParticipateFragment;

/**
 * Created by raed on 29.03.18.
 */

public class UpdateTime extends Thread{
    private int questionTime;
    private Activity context;
    private ParticipateFragment participateFragment;
    private boolean stop = false;

    public UpdateTime(int questionTime, Activity context, ParticipateFragment participateFragment) {
        this.questionTime = questionTime;
        this.context = context;
        this.participateFragment = participateFragment;
    }

    @Override
    public void run() {
        try {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    participateFragment.setTimeLeft(questionTime);
                }
            });
            while (questionTime > 0 && !stop) {
                Thread.sleep(1000);
                context.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        // update TextView here!
                        participateFragment.setTimeLeft(questionTime);
                        questionTime--;
                    }
                });
            }
            if (!stop) {
                participateFragment.getSocket().emit("NEXT_QUESTION");
            }
        } catch (InterruptedException ignored) {
        }
    }

    public void setStop(boolean stop) {
        this.stop = stop;
    }
}
