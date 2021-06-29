import React from "react";
import { ElementsConsumer, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import leftarrow from "./../../assets/Images/leftarrow.png";
import '../../assets/css/custome.css';
import config from "./../../helpers/config"
import axios from "axios"
import { merchantAuthHeader } from "../../component/Merchant/merchantAuthHeader"
import { NotificationManager } from "react-notifications";


const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
}) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        <input
            className="FormRowInput"
            id={id}
            type={type}
            placeholder={placeholder}
            // required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
        className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? 'Processing...' : children}
    </button>
);

const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentMethod: {},
            billingDetails: {},
            paymentGatewayType: [],
            payment: false,
            subscriptionId: 0,
            subscriptionPlan: [],
            cardName: "",
            cusStripeId: "",
            cACardHolderName: "",
            cACardNumber: "",
            expiryMonth: "",
            expiryYear: "",
            loading: false
        }
    }

    componentDidMount() {
        var subscriptionId = window.localStorage.getItem("subscriptionId");
        this.setState({
            subscriptionId: parseInt(subscriptionId)
        })
        this.handleGetDefaultPaymentGateway();
        this.handleGetSubsciptionPlan();
    }

    handlePaymentOpen() {
        this.setState({ payment: true });
    }
    handlePaymentClose() {
        this.setState({ payment: false });
    }

    handleGetSubsciptionPlan() {
        
        let self = this;
        var subscriptionPlan = [];
        var subscriptionId = 0;
        axios({
            method: "get",
            url: config.apiUrl + "Subscription/getsubscriptionplan",
            headers: merchantAuthHeader(),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    
                    // data.filter(subscriptionId => data.subscriptionId == self.state.subscriptionId)
                    data.map(item => {
                        if (item.subscriptionId === self.state.subscriptionId) {
                            subscriptionPlan = item
                        }
                    })
                    self.setState({
                        subscriptionPlan
                    })
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    // NotificationManager.error("Failed");
                    // self.setState({
                    //     loading: false,
                    // });
                }
            })
            .catch(function (res) {
                
                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleSubmit = async event => {
        
        event.preventDefault();

        if (this.state.paymentGatewayType.length > 0) {
            var paymentGatewayName = this.state.paymentGatewayType[0].paymentGatewayName.toLowerCase();
            switch (paymentGatewayName) {
                case "stripe":
                    const { stripe, elements } = this.props;
                    if (!stripe || !elements) {
                        return;
                    }

                    const cardElement = elements.getElement(CardNumberElement);
                    const result = await stripe.createToken(cardElement);
                    if (result.error) {
                        NotificationManager.error(result.error.message);
                        // console.log(result.error.message);
                    } else {
                        console.log(result.token);
                        if (this.state.cardName !== "") {
                            this.handleSubmitSubscriptionDetails(result.token, cardElement);
                        } else {
                            NotificationManager.error("Please enter the card name.");
                        }
                    };
                    break;

                case "card access":
                    this.handleSubmitCASubscriptionDetails();
                    break;
                // call card access api
                // before calling 1st api check this merchant is exist
                // first api call
                // sec api call save response of first and sec api
                // save all response in merchant card detail
                // call 3rd api
                // save this reponse against  merchant transaction table
                // generate app key and save in subscriptn master table
                // trigger mail to merchant


                // return "Card Access";
                default:
                    break;

            }
        }
        //switch case


        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: card,
        //     billing_details: this.state.billingDetails,
        // });

        // if (error) {
        //     console.log('[error]', error);
        // } else {
        //     this.setState({ paymentMethod })
        //     // console.log('[PaymentMethod]', paymentMethod);
        // }
    };

    handleSubmitSubscriptionDetails(cardDetails, cardElement) {
        
        let self = this;
        self.setState({
            loading: true
        });
        axios({
            method: "post",
            url: config.apiUrl + "PlanSubscription/sendmerchantcarddetail",
            headers: merchantAuthHeader(),
            data: {
                CardToken: cardDetails.id,
                SubscriptionPrice: this.state.subscriptionPlan.subscriptionPrice,
                PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName,
                // PaymentDetails: {
                //     CardToken: cardDetails.token.id,
                //     CardType: cardDetails.token.card.brand
                // },
                // SubscriptionItem: {
                //     SubscriptionPrice: 800
                // }
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    debugger
                    const { stripe } = self.props;
                    stripe.confirmCardPayment(
                        data.clientSecret,
                        {
                            payment_method: { card: cardElement },
                        }
                    ).then(function (result) {
                        
                        if (result.error) {
                            NotificationManager.error(result.error);
                            self.setState({
                                loading: false,
                            });
                        } else {
                            self.setState({
                                cusStripeId: data.cusStripeId
                            })
                            self.handleFinalPayment(cardDetails, result.paymentIntent);
                            // The payment has succeeded
                            // Display a success message

                            // call final success method.
                        }
                    });
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    // NotificationManager.error("Failed");
                    self.setState({
                        loading: false,
                    });
                }
            })
            .catch(function (res) {
                
                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleGetDefaultPaymentGateway() {
        
        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "PaymentDetail/getdefaultpaymentgateway",
            headers: merchantAuthHeader(),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    
                    self.setState({
                        paymentGatewayType: data
                    })
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    // NotificationManager.error("Failed");
                    // self.setState({
                    //     loading: false,
                    // });
                }
            })
            .catch(function (res) {
                
                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleFinalPayment(cardDetails, finalPaymentDetails) {
        
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "PlanSubscription/getfinalpaymentstatus",
            headers: merchantAuthHeader(),
            data: {
                PaymentIntentId: finalPaymentDetails.id,
                PaymentMethodId: finalPaymentDetails.payment_method,
                PaymentProceedorId: this.state.paymentGatewayType[0].paymentGatewaySourceId,
                PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName,
                SubscriptionItem: {
                    SubscriptionId: this.state.subscriptionPlan.subscriptionId,
                    PlanName: this.state.subscriptionPlan.subscriptionName,
                    SubscriptionPrice: this.state.subscriptionPlan.subscriptionPrice
                },
                PaymentDetails: {
                    CardToken: cardDetails.id,
                    CardType: cardDetails.card.brand,
                    Last4Digits: parseInt(cardDetails.card.last4),
                    CardExpMonth: cardDetails.card.exp_month,
                    CardExpYear: cardDetails.card.exp_year,
                    CustomerStripeId: this.state.cusStripeId,
                    CardIdInfo: cardDetails.card.id,
                    NameOnCard: this.state.carName,
                }
                // PaymentGatewayType: "Stripe",
                // PaymentDetails: {
                //     CardToken: cardDetails.token.id,
                //     CardType: cardDetails.token.card.brand
                // },
                // SubscriptionItem: {
                //     SubscriptionPrice: 800
                // }
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    
                    self.setState({
                        loading: false,
                    });
                    setTimeout(
                        NotificationManager.success("Your payment has been done successfully."),
                        NotificationManager.success(data)
                        , 1000);
                    window.location.href = "./merchantSubscription";
                } else {
                    NotificationManager.error(data);
                    self.setState({
                        loading: false,
                    });
                }
            })
            .catch(function (res) {
                console.log(res);
            });
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    handleSubmitCASubscriptionDetails() {
        
        let self = this;
        self.setState({
            loading: true
        });
        axios({
            method: "post",
            url: config.apiUrl + "PlanSubscription/sendmerchantcarddetail",
            headers: merchantAuthHeader(),
            data: {
                PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName,
                CardName: this.state.cACardHolderName[0],
                CardNumber: this.state.cACardNumber[0],
                CardExpMonth: parseInt(this.state.expiryMonth),
                CardExpYear: parseInt(this.state.expiryYear),
                Amount: this.state.subscriptionPlan.subscriptionPrice,
                OrderId: "1234567-2"
                // PaymentDetails: {
                //     CardToken: cardDetails.token.id,
                //     CardType: cardDetails.token.card.brand
                // },
                // SubscriptionItem: {
                //     SubscriptionPrice: 800
                // }
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    debugger
                    self.setState({
                        loading: false
                    });
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    self.setState({
                        loading: false
                    });
                    // NotificationManager.error("Failed");
                    // self.setState({
                    //     loading: false,
                    // });
                }
            })
            .catch(function (res) {
                
                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleOnChangeExpiryMonth(e) {
        
        var month = e.target.value;
        if (parseInt(month) > 12) {
            month = this.state.expiryMonth;
        }
        this.setState({
            [e.target.name]: month
        })
    }

    handleOnChangeExpiryYear(e) {
        
        var value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    render() {
        const { paymentMethod, billingDetails } = this.state;
        const { stripe, error, processing } = this.props;
        return (
            <div className={this.state.loading ? "oopasity" : ""}>
                {this.state.loading ? (
                    <div className="lodivone">
                        <div className="loderdiv">
                            <div class="loader"></div>
                        </div>
                        <label className="mt-1">Processing Payment<br />Dont Refresh or Click Back</label>
                    </div>) : null}
                <div className="merPlanPayment planpaymcard">
                    <form className="Form" onSubmit={this.handleSubmit}>
                        <div className="merPlanPayment planpaymcard">
                            <h3 className="Usermana"><a href="./merchantSubscription"><img src={leftarrow} alt="backarrow" /></a> Plan Payment</h3>
                            {this.state.paymentGatewayType.length > 0 && (this.state.paymentGatewayType[0].paymentGatewayName).toLowerCase().trim() == "stripe" ? (
                                <div className="card planinput">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Card Number</label>
                                                <div className="inpuu">
                                                    <CardNumberElement
                                                        placeholder="Enter Card Number"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Card Name</label>
                                                <input type="text" placeholder="Enter Card Name"
                                                    name="cardName"
                                                    value={this.state.cardName}
                                                    onChange={this.handleOnChange.bind(this)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Expiry Date / Month</label>
                                                <div className="inpuu">
                                                    <CardExpiryElement />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>CVV</label>
                                                <div className="inpuu">
                                                    <CardCvcElement />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="paybtn">
                                        <SubmitButton className="start" processing={processing} error={error} disabled={this.state.loading}>
                                            Pay
                                    </SubmitButton>
                                    </div>
                                </div>) : (<div className="card planinput">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Card Number</label>
                                                <input type="text" placeholder="Enter Card Number"
                                                    name="cACardNumber"
                                                    value={this.state.cACardNumber}
                                                    onChange={this.handleOnChange.bind(this)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Card Name</label>
                                                <input type="text" placeholder="Enter Card Name"
                                                    name="cACardHolderName"
                                                    value={this.state.cACardHolderName}
                                                    onChange={this.handleOnChange.bind(this)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>Expiry Date</label>
                                                <input type="text"
                                                    name="expiryMonth"
                                                    value={this.state.expiryMonth}
                                                    onChange={this.handleOnChangeExpiryMonth.bind(this)}
                                                    placeholder="MM" maxLength="2"
                                                />
                                                <input type="text"
                                                    name="expiryYear"
                                                    value={this.state.expiryYear}
                                                    onChange={this.handleOnChangeExpiryYear.bind(this)}
                                                    placeholder="YY" maxLength="2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="marginbot">
                                                <label>CVC</label>
                                                <input type="text" placeholder="Enter CVC" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="paybtn">
                                        <button type="submit" className="start" disabled={this.state.loading}>Pay</button>
                                    </div>
                                </div>)}
                        </div>
                    </form>
                    {/* // ) */}

                    <Modal
                        open={this.state.payment}
                        onClose={this.handlePaymentClose.bind(this)}
                        modalId="PlanPaymentModal"
                        overlayId="overlay"
                    >
                        <div className="backtext">
                            <h3 className="eduser">Payment Confirmed</h3>
                            <img src={CloseIcon} alt="CloseIcon" className="closeicon" onClick={this.handlePaymentClose.bind(this)} />
                        </div>
                        <div className="edituser">
                            <p>Your One Click & Split Payment Combo plan has been activated.</p>
                            <div className="Editbtn">
                                <Link to="/merchant/currentActivePlan">
                                    <button className="btn">OK</button>
                                </Link>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );


    }
}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    );
}