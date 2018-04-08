package hepia.ch.yourquiz.threads;

import hepia.ch.yourquiz.ParticipateQuizActivity;

/**
 * Created by raed on 29.03.18.
 */

public class UpdateTime extends Thread{
    private int questionTime;
    private ParticipateQuizActivity participateQuizActivity;
    private boolean stopped = false;

    public UpdateTime(int questionTime, ParticipateQuizActivity participateQuizActivity) {
        this.questionTime = questionTime;
        this.participateQuizActivity = participateQuizActivity;
    }

    @Override
    public void run() {
        try {
            participateQuizActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    participateQuizActivity.setTimeLeft(questionTime);
                }
            });
            while (questionTime > 0 && !stopped) {
                Thread.sleep(1000);
                questionTime--;
                participateQuizActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        // update TextView here!
                        participateQuizActivity.setTimeLeft(questionTime);
                    }
                });
            }
        } catch (InterruptedException ignored) {
        }
    }

    public void setStopped(boolean stopped) {
        this.stopped = stopped;
    }
}
