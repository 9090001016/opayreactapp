import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import config from "./../../../helpers/config";
import { authHeader } from "./../../Split Payment/helpers/splitAuthHeader";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import Modal from "react-responsive-modal";
import CloseIcon from "../../../assets/Images/CloseWhBold.png";
import email from "../../../assets/Images/emailBl.png";
// import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";
import OnePayLogo from "./../../../assets/Images/onepaylogowhite.png";

import userWhiteIcon from "./../../../assets/Images/user-icon.png"

class splitHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentGatewayType: [],
            merchantstrippop: false,
            isVerifyEmail: false,
            emailOTP: "",
            isEmailOtpVerified: false,
            isEmailOTPVerifySend: false,
            emailMinute: 0,
            emailSecond: 0,
            emailId: ""
        };
    }

    componentDidMount() {
        this.handleGetDefaultPaymentGateway();
    }

    handleGetDefaultPaymentGateway() {

        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "OnePayMerchantMarketing/getdefaultpaymentgateway",
            headers: authHeader("no"),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {

                    self.setState({
                        paymentGatewayType: data
                    })

                    // if (data[0].paymentGatewayName.toLowerCase() == "stripe") {

                    // } else {
                    //     this.props.history.push('/');
                    // }
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

    handleGetStripeUrlDetails() {

        if (this.handleValidation()) {
            axios({
                method: "post",
                url: config.apiUrl + "OnePayMerchantMarketing/MerchantsignupforStripe",
                headers: authHeader("no"),
                params: {
                    EmailId: this.state.emailId
                }
            })
                .then(function (res) {

                    let status = res.data.message;
                    let data = res.data.responseData;
                    if (status === "success") {
                        // NotificationManager.success("Record Saved Successfully");
                        // if (data.paymentGateway.toLowerCase().trim() == "stripe") {
                        window.location.href = data.stripeAccountURI;
                        // }
                    } else {
                        NotificationManager.error(data);
                    }
                })
                .catch(function (res) {

                    // console.log(data);
                });
        }
    }

    handleValidation() {
        let formIsValid = true;
        if (!this.state.emailId.trim()) {
            formIsValid = false;
            NotificationManager.error("Please enter email id.");
        } else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.emailId.trim()) === false) {
                formIsValid = false;
                NotificationManager.error("Invalid email id.");
            } else {
                if (this.state.isEmailOtpVerified === false) {
                    formIsValid = false;
                    NotificationManager.error("Please Verify Email OTP.")
                }
            }

            // if (this.state.isEmailOtpVerified === false) {
            //     formIsValid = false;
            //     NotificationManager.error("Please verified email OTP.")
            // }
        }

        return formIsValid;

    }

    handleMerchantStripPopOpen() {
        this.setState({ merchantstrippop: true });
    }
    handleMerchantStripPopClose() {
        this.setState({ merchantstrippop: false });
    }

    initiateEmail = () => {
        // if (this.state.emailTime !== 0) {
        //     this.setState((prevState, prevProps) => ({
        //         emailTime: prevState.emailTime - 1
        //     }));
        //     if (this.state.emailTime === 0) {
        //         clearInterval(this.id);
        //         this.setState({ complete: true });
        //     }
        // }

        if (this.state.emailMinute !== 0 && this.state.emailSecond == 0) {
            this.setState((prevState, prevProps) => ({
                emailMinute: prevState.emailMinute - 1,
                emailSecond: 60
            }));
        }
        if (this.state.emailSecond !== 0) {
            this.setState((prevState, prevProps) => ({
                emailSecond: prevState.emailSecond - 1
            }));
            if (this.state.emailMinute === 0 && this.state.emailSecond == 0) {
                clearInterval(this.id);
                this.setState({ complete: true });
            }
        }
    };

    handleVerifyEmailFieldClick = () => {
        if (this.state.emailId.trim()) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.emailId.trim()) === true) {
                let self = this;
                axios({
                    method: "post",
                    url: config.apiUrl + "OnePayMerchantMarketing/MerchantEmailOTP",
                    headers: authHeader("no"),
                    data: {
                        Name: 'Merchant',
                        EmailId: this.state.emailId
                    }
                })
                    .then(function (res) {
                        let status = res.data.message;
                        let data = res.data.responseData;
                        if (status === "Success") {
                            NotificationManager.success(data);
                            self.setState({ isEmailOTPVerifySend: true, emailMinute: 5, emailSecond: 0, isVerifyEmail: true });
                            self.id = setInterval(self.initiateEmail, 1000);

                        } else {
                            NotificationManager.error(data);
                            self.setState({ isEmailOTPVerifySend: false, emailMinute: 0, emailSecond: 0, isVerifyEmail: false });
                        }
                    })
                    .catch((data) => {
                        console.log(data);
                    });
            } else {
                NotificationManager.error("Invalid email id.");
            }
        } else {
            NotificationManager.error("Please enter email id.");
        }

    }

    handleConfirmEmailOTP = () => {
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "OnePayMerchantMarketing/MerchantEmailOTPVerification",
            headers: authHeader("no"),
            data: {
                Otp: this.state.emailOTP,
                EmailID: this.state.emailId,
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    self.setState({
                        isEmailOtpVerified: true
                    });
                } else {
                    NotificationManager.error("Invalid Email OTP.");
                    self.setState({
                        isEmailOtpVerified: false
                    });
                }
            })
            .catch((data) => {
                console.log(data);
            });
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <header>
                <div className="header__block">
                    <div className="main__menu">
                        <nav className="navbar navbar-expand-lg navbar-light bg-transparent p-0">
                            <div className="inpay">
                                <Link to="/">
                                    <img src={OnePayLogo} width="150px" className="logo__img m-0" />
                                </Link>
                            </div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                                <div className="foryou">
                                    <ul className="menu__links">
                                        <li>
                                            <Link to="/">
                                                <a>For You</a>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/onePayforbusiness">
                                                <a>For Business</a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link to="#">
                                                <a>Shop</a>
                                            </Link>
                                        </li> */}
                                        <li className="user__icon">
                                            <Link to="#">
                                                <a><img src={userWhiteIcon} /></a>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            // <header>
            //     <div className="inpay">
            //         <Link to="/">
            //             <img src={OnePayLogo} width="150px" className="logo__img" />
            //         </Link>
            //     </div>
            //     <div className="foryou">
            //         <ul>
            //             <li>
            //                 <Link to="/customer">
            //                     <a>For You</a>

            //                 </Link>
            //             </li>
            //             <li>

            //                         <Link to="/merchant">
            //                         <a>For Business</a>
            //                     </Link>

            //             </li>
            //             <li>
            //                 <Link to="/onePaySetUp">
            //                     <a>Set - Up</a>
            //                 </Link>
            //             </li>
            //             <li>
            //                 <Link to="/onePayHelp">
            //                     <a>Help</a>
            //                 </Link>
            //             </li>
            //             <li>
            //                 <Link to="/onePay">
            //                     <a>Pricing</a>
            //                 </Link>
            //             </li>
            //             <li>
            //                 <Link to="/splitAPIDoc">
            //                     <a>API Docs</a>
            //                 </Link>
            //             </li>
            //         </ul>
            //     </div>
            //     <div className="signbtn">
            //         <Link to="/onePaySignInHome">
            //             <button type="button" className="btn sigin">
            //                 Sign In
            //                     </button>
            //         </Link>
            //         <Link to="/onePaySignUpHome">
            //             <button type="button" className="btn sigup">
            //                 Sign Up
            //                     </button>
            //         </Link>
            //     </div>
            //     <Modal
            //         open={this.state.merchantstrippop}
            //         onClose={this.handleMerchantStripPopClose.bind(this)}
            //         modalId="PlanPaymentModal"
            //         overlayId="overlay"
            //     >
            //         <div className="backtext">
            //             <h3 className="eduser">Merchant Registration</h3>
            //             <img src={CloseIcon} alt="CloseIcon" className="closeicon" onClick={this.handleMerchantStripPopClose.bind(this)} />
            //         </div>
            //         <div className="edituser signup">
            //             <div className="mersign">
            //                 <div className="input-cntr margin">
            //                     <div className="input-icons">
            //                         <img src={email} alt="icon missing" />
            //                     </div>
            //                     <input type="text" placeholder="Email Id *"
            //                         name="emailId"
            //                         value={this.state.emailId}
            //                         onChange={this.handleOnChange.bind(this)}
            //                         disabled={!this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true}
            //                     />
            //                 </div>
            //             </div>

            //             {this.state.isEmailOtpVerified ?
            //                 (<p className="Verify">Verified</p>) :
            //                 (this.state.isEmailOTPVerifySend ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? (<p className="Verify">OTP Sent</p>) : (<p className="Verify"></p>)) :
            //                     (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Verify OTP</p>))}
            //             {this.state.isVerifyEmail ?
            //                 (<><div className="mersign">
            //                     <div>
            //                         <div className="input-cntr margin">
            //                             <div className="input-icons">
            //                                 <img src={email} alt="icon missing" />
            //                             </div>
            //                             <input type="text" placeholder="Enter Email OTP"
            //                                 name="emailOTP"
            //                                 value={this.state.emailOTP}
            //                                 onChange={this.handleOnChange.bind(this)}
            //                                 disabled={!this.state.isEmailOtpVerified ? false : true}
            //                             />
            //                         </div>

            //                         {this.state.isEmailOtpVerified ?
            //                             (<p className="Verify"></p>) :
            //                             ((this.state.emailMinute == 0 && this.state.emailSecond == 0) ? (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Resend OTP</p>) :
            //                                 (<p className="Verify" onClick={this.handleConfirmEmailOTP}>Confirm <label style={{ paddingLeft: "12px" }}>{this.state.emailMinute}{" : "}{this.state.emailSecond}</label></p>))}
            //                     </div>
            //                 </div></>)
            //                 : null}
            //             <div className="merchtstppopup">
            //                 <button className="btn" onClick={this.handleGetStripeUrlDetails.bind(this)}>Submit</button>
            //             </div>
            //         </div>
            //     </Modal>
            // </header>

        );
    }
}

export default splitHeader;