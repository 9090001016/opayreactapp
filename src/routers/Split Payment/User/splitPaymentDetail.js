import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SplitPaymentCardDetail from "./splitPaymentCardDetail"

const stripePromise = loadStripe("pk_test_51I6UeVJjvVY99yl2fqW0jC1zlySp6ZoPtwQPwCAVJPgQ9J2M11VY5WKJWWZ2hk28Ip5iVIXCfOXdQtDqyEL9sQHO00N5RYJEFj");

const splitPaymentDetails = () => {
    
    return (
        <Elements stripe={stripePromise}>
            <SplitPaymentCardDetail />
        </Elements>
    );
};

export default splitPaymentDetails;