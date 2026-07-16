//Design a login system that today uses email+password but must later support Google  OAuth and magic links without changing 
// the code that checks "is the user logged in". keep the interface each provider implements minimal


class Login {


}

class Passwordlogin{
    void email();
    void password();


}


class authLogin{

}

you are given a smartDevice interface with turnOn, turnoff, setbrightness, setTemperature, play. A smart bulb, a thermostat, and a speaker each implement only some of these . Redesign the interfaces, and write a scene runner that operates on whatever capabilities a device actually exposes


public class SmartHomeDemo {

    // Capability Interfaces
    interface Switchable {
        void turnOn();
        void turnOff();
    }

    interface BrightnessControl {
        void setBrightness(int level);
    }

    interface TemperatureControl {
        void setTemperature(int temperature);
    }

    interface MusicPlayer {
        void play();
    }

    // Smart Bulb
    static class SmartBulb implements Switchable, BrightnessControl {

        public void turnOn() {
            System.out.println("Smart Bulb is ON");
        }

        public void turnOff() {
            System.out.println("Smart Bulb is OFF");
        }

        public void setBrightness(int level) {
            System.out.println("Brightness set to " + level + "%");
        }
    }

    // Thermostat
    static class Thermostat implements Switchable, TemperatureControl {

        public void turnOn() {
            System.out.println("Thermostat is ON");
        }

        public void turnOff() {
            System.out.println("Thermostat is OFF");
        }

        public void setTemperature(int temperature) {
            System.out.println("Temperature set to " + temperature + "°C");
        }
    }

    // Speaker
    static class Speaker implements Switchable, MusicPlayer {

        public void turnOn() {
            System.out.println("Speaker is ON");
        }

        public void turnOff() {
            System.out.println("Speaker is OFF");
        }

        public void play() {
            System.out.println("Playing Music...");
        }
    }

    // Scene Runner
    static class SceneRunner {

        public static void run(Object device) {

            if (device instanceof Switchable) {
                ((Switchable) device).turnOn();
            }

            if (device instanceof BrightnessControl) {
                ((BrightnessControl) device).setBrightness(80);
            }

            if (device instanceof TemperatureControl) {
                ((TemperatureControl) device).setTemperature(24);
            }

            if (device instanceof MusicPlayer) {
                ((MusicPlayer) device).play();
            }

            if (device instanceof Switchable) {
                ((Switchable) device).turnOff();
            }

            System.out.println();
        }
    }

    // Main Method
    public static void main(String[] args) {

        SmartBulb bulb = new SmartBulb();
        Thermostat thermostat = new Thermostat();
        Speaker speaker = new Speaker();

        SceneRunner.run(bulb);
        SceneRunner.run(thermostat);
        SceneRunner.run(speaker);
    }
} 




//build a checkout system that charges a customer, with these real world twist layered in:
//payments go through providers(stripe, paypal, an in-house "store credit"wallet). some providers supports refunds, some support partial capture, some support neither.
//store credit can only deduct - it can never process an external card.
//An order may be split across multiple providers in one transactions(e.g. $30 store credit + $70 card). if any leg fails, the already-charged legs must be rolled back.
//The system must retry transient failures - but a "retry" for an idempotent charge and "retry" for a non - idempotent  one are not the same thing, and a wrong entry can double-charge.
//fraud checks rrun before charging , and the set of checks changes per region(EU adds 3d secure). compliance owns those rules; the payments team owns the charging.
//the whole flow must be unit- testable with zero network calls, the finance team must be able to add anew provider without a payment - team code review of the core.


import java.util.*;

public class CheckoutDemo {

    public static void main(String[] args) {

        // Fraud Check
        FraudCheck fraud = new FraudCheck();
        if (!fraud.check()) {
            System.out.println("Fraud Found");
            return;
        }

        // Payment Providers
        PaymentProvider wallet = new StoreCredit();
        PaymentProvider stripe = new Stripe();

        // Split Payment
        boolean p1 = wallet.charge(30);
        boolean p2 = stripe.charge(70);

        // Rollback
        if (p1 && !p2) {
            wallet.refund(30);
            System.out.println("Rollback Done");
            return;
        }

        System.out.println("Payment Successful");
    }
}

// Interface 
interface PaymentProvider {

    boolean charge(double amount);

    void refund(double amount);
}

// Stripe 
class Stripe implements PaymentProvider {

    public boolean charge(double amount) {
        System.out.println("Stripe Charged : " + amount);
        return true;
    }

    public void refund(double amount) {
        System.out.println("Stripe Refunded : " + amount);
    }
}

// Paypal 
class Paypal implements PaymentProvider {

    public boolean charge(double amount) {
        System.out.println("Paypal Charged : " + amount);
        return true;
    }

    public void refund(double amount) {
        System.out.println("Paypal Refunded : " + amount);
    }
}

// Store Credit 
class StoreCredit implements PaymentProvider {

    public boolean charge(double amount) {
        System.out.println("Store Credit Used : " + amount);
        return true;
    }

    public void refund(double amount) {
        System.out.println("Store Credit Returned : " + amount);
    }
}

// Fraud Check 
class FraudCheck {

    public boolean check() {
        System.out.println("Fraud Check Passed");
        return true;
    }
}