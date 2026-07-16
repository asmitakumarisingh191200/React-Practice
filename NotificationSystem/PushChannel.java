public class PushChannel implements MessageChannel {

    @Override
    public void send(Message message) {

        System.out.println("Sending Push Notification: " + message.getContent());

    }

}