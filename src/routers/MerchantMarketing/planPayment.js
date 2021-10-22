import React, { Component } from 'react'
import Check from "./../../assets/Images/check.png";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import Header from "./../MerchantMarketing/header";
import InstantLogo from "./../../assets/Images/Instant-logo.png";


class planPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            payment: false,
        }
    }
    handlePaymentOpen() {
        this.setState({ payment: true });
    }
    handlePaymentClose() {
        this.setState({ payment: false });
    }
    render() {
        return (
            <div className="marketingApi">
                <div className="merchantMar">
                    <Header />
                </div>
                <div className="merPlanPayment">
                    <h3 className="Usermana">Plan Payment</h3>
                    <div className="row mt-4">
                        <div className="col-12 col-md-9">
                            <div className="card planinput">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="marginbot">
                                            <label>Card Number</label>
                                            <input type="text" placeholder="Enter Card Number" />
                                            <span className="Error">Required Field.</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="marginbot">
                                            <label>Card Name</label>
                                            <input type="text" placeholder="Enter Card Name" />
                                            <span className="Error">Required Field.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="marginbot">
                                            <label>Expiry Date</label>
                                            <input type="text" placeholder="Enter Expiry Date" />
                                            <span className="Error">Required Field.</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="marginbot">
                                            <label>CVV</label>
                                            <input type="text" placeholder="Enter CVV" />
                                            <span className="Error">Required Field.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="paybtn">
                                    <button type="button" className="start" onClick={this.handlePaymentOpen.bind(this)}>Pay</button>
                                    <h3>OR</h3>
                                    <button type="button" className="start" onClick={this.handlePaymentOpen.bind(this)}>Pay Using Instant Pay</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card cardp">
                                <h3>Combo
                                <span>( One Click & Split Payment )</span>
                                </h3>
                                <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                <h4>AUS 199 / Month</h4>
                                <label className="month">For 3 Months</label>
                                <Link to="/instantPay">
                                    <button type="button" className="start">Return to All Plans</button>
                                </Link>
                                <div className="cardtext">
                                    <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                    <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                    <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Add Role */}
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
                <div className="foot">
                    <footer className="container">
                        <div className="inpay">
                            <img src={InstantLogo} width="150px" className="logo__img" />
                        </div>
                        <div className="foryou">
                            <ul>
                                <li>
                                    <Link to="/instantPayAboutUs">
                                        <p>About Us</p>
                                    </Link>
                                    <Link to="/instantPayContactUs">
                                        <p>Contact Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/instantPayPolicies">
                                        <p>Policies</p>
                                    </Link>
                                    <Link to="/instantPayFaq">
                                        <p>FAQ</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/apiDocMerchant">
                                        <p>API Information</p>
                                    </Link>
                                    <Link to="/instantPayTermsAndCondition">
                                        <p>Terms & Conditions</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="signbtn">
                            <ul className="footerlink">
                                <li>
                                    <a className="fa fa-facebook" href="https://www.facebook.com/" target="_blank"></a>
                                </li>
                                <li>
                                    <a className="fa fa-twitter" href="https://twitter.com/" target="_blank"></a>
                                </li>
                                <li>
                                    <a className="fa fa-linkedin" href="https://in.linkedin.com/" target="_blank"></a>
                                </li>
                                <li>
                                    <a className="fa fa-instagram" href="https://www.instagram.com/" target="_blank"></a>
                                </li>
                                <li>
                                    <a className="fa fa-youtube-play" href="https://www.youtube.com/" target="_blank"></a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default planPayment
