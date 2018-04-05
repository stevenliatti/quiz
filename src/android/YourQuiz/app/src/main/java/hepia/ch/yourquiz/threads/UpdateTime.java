package hepia.ch.yourquiz.threads;

import hepia.ch.yourquiz.ParticipateQuizActivity;

/**
 * Created by raed on 29.03.18.
 */

public class UpdateTime extends Thread{
    private int questionTime;
    private ParticipateQuizActivity participateQuizActivity;

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
            while (questionTime > 0) {
                participateQuizActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        // update TextView here!
                        participateQuizActivity.setTimeLeft(questionTime);
                    }
                });
                questionTime--;
                Thread.sleep(1000);
            }
            participateQuizActivity.getSocket().emit("NEXT_QUESTION");
        } catch (InterruptedException ignored) {
        }
    }
}
