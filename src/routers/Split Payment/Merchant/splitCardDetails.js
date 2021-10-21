import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./splitCheckoutForm"

// const stripePromise = loadStripe("pk_live_51JASo7KR0d2qFggdMC3ijU6dLQU7VOKlQSA9tn0uAkodVpEZTgaiDb1fYqJGKXfHcq4h2l68f9OVZcasbaoZ8dxz000ufRmeuj");
const APIkey=`${process.env.REACT_APP_STRIPE_USER_KEY}` 

const stripePromise = loadStripe(APIkey);

const splitCardDetails = () => {
    
    return (
        <Elements stripe={stripePromise}> 
            <CheckoutForm />
        </Elements> 
    );
};

export default splitCardDetails;