import java.util.List;

public class NotificationService {

    private List<MessageChannel> channels;

    public NotificationService(List<MessageChannel> channels) {
        this.channels = channels;
    }

    public void sendNotification(Message message) {

        for (MessageChannel channel : channels) {
            channel.send(message);
        }

    }

}