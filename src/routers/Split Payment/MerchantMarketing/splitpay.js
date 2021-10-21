import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Check from "./../../../assets/Images/check.png";
import Header from "./splitHeader";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

class splitpay extends Component {
    render() {
        return (
            <div className="marketingApi splitpaybgblue">
                <div className="merchantMar">
                    <Header />
                </div>
                <div className="container topbottom">
                    <div className="merSubsc splitpaycard">
                        <div className="card">
                            <h3>One Pay</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                            {/* <h4>AUS 149 / Month</h4> */}
                            <div className="contentcard">
                                <ul>
                                    <li className="ftsize13">3M / $400</li>
                                    <li className="ftsize13">6M / $600</li>
                                    <li className="ftsize13">9M / $900</li>
                                    <li className="ftsize13">12 / $1200</li>
                                    <li className="ftsize13">2M / $200</li>
                                    <li className="ftsize13">10M / $1000</li>
                                    <li className="ftsize13">4M / $400</li>
                                    <li className="ftsize13">5M / $500</li>
                                </ul>
                            </div>
                            {/* <select>
                            <option>Select Validity</option>
                            <option>Select Validity 1</option>
                            <option>Select Validity 2</option>
                        </select>
                        <Link to="/instantPayPlanPayment">
                            <button type="button" className="start">Choose Plan</button>
                        </Link> */}
                            <div className="cardtext">
                                <p><img src={Check} alt="Check" />The application is divided into three major modules which is User Module, Merchant Module and Admin Modules</p>
                                {/* <p>The application is divided into three major modules which is User Module, Merchant Module and the Instant Pay Admin User Modules</p> */}
                                {/* <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="foot">
                    <footer className="container">
                        <div className="inpay">
                            <img src={OnePayLogo} width="150px" className="logo__img" />
                        </div>
                        <div className="foryou">
                            <ul>
                                <li>
                                    <Link to="/onePayAboutUs">
                                        <p>About Us</p>
                                    </Link>
                                    <Link to="/onePayContactUs">
                                        <p>Contact Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/onePayPolicies">
                                        <p>Policies</p>
                                    </Link>
                                    <Link to="/onePayFAQ">
                                        <p>FAQ</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/splitAPIDoc">
                                        <p>API Information</p>
                                    </Link>
                                    <Link to="/onePayTermsAndCondition">
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

export default splitpay
