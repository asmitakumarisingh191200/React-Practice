public class SMSChannel implements MessageChannel {

    @Override
    public void send(Message message) {

        System.out.println("Sending SMS: " + message.getContent());

    }

}


//Design a login system that today uses email+password but must later support Google  OAuth and magic links without changing 
// the code that checks "is the user logged in". keep the interface each provider implements minimal

