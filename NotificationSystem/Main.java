import java.util.Arrays;

public class Main {

    public static void main(String[] args) {

        Message message = new Message("Welcome to our app!");

        NotificationService service =
                new NotificationService(
                        Arrays.asList(
                                new EmailChannel(),
                                new SMSChannel(),
                                new PushChannel()
                        )
                );

        service.sendNotification(message);

    }

}