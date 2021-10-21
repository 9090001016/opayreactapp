import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm"

const stripePromise = loadStripe("pk_live_51JASo7KR0d2qFggdMC3ijU6dLQU7VOKlQSA9tn0uAkodVpEZTgaiDb1fYqJGKXfHcq4h2l68f9OVZcasbaoZ8dxz000ufRmeuj");

const CardDetails = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CardDetails;