package hepia.ch.yourquiz.manager;

import hepia.ch.yourquiz.models.UserModel;

public class CurrentUser {
    private static UserModel user = new UserModel();

    private static boolean isConnected = false;

    public static UserModel getUser() {
        return user;
    }

    public static boolean isConnected() {
        return isConnected;
    }

    public static void setUser(UserModel user) {
        CurrentUser.user = user;

        CurrentUser.isConnected = true;
    }

    public static void setIsConnected(boolean isConnected) {
        CurrentUser.isConnected = isConnected;
    }
}
