public class EmailChannel implements MessageChannel {

    @Override
    public void send(Message message) {

        System.out.println("Sending Email: " + message.getContent());

    }

}