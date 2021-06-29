import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm"

const stripePromise = loadStripe("pk_test_51I6UeVJjvVY99yl2fqW0jC1zlySp6ZoPtwQPwCAVJPgQ9J2M11VY5WKJWWZ2hk28Ip5iVIXCfOXdQtDqyEL9sQHO00N5RYJEFj");

const CardDetails = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CardDetails;