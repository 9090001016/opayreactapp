import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SplitPaymentCardDetail from "./splitPaymentCardDetail"

// const stripePromise = loadStripe("pk_live_51JASo7KR0d2qFggdMC3ijU6dLQU7VOKlQSA9tn0uAkodVpEZTgaiDb1fYqJGKXfHcq4h2l68f9OVZcasbaoZ8dxz000ufRmeuj");
const APIkey=`${process.env.REACT_APP_STRIPE_USER_KEY}`

const stripePromise = loadStripe(APIkey);

const splitPaymentDetails = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <SplitPaymentCardDetail /> 
        </Elements>
    );
};

export default splitPaymentDetails;