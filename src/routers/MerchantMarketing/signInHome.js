import React, { Component } from 'react';
import { Link } from "react-router-dom";
import foryou from "../../assets/Images/foryou.png";
import business from "../../assets/Images/business.png";
import vedioplaypic from "../../assets/Images/vedioplaypic.png";
import lapivedioplay from "../../assets/Images/lapivedioplay.png";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import Header from "./header";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import email from "./../../assets/Images/emailBl.png";
import InstantLogo from "./../../assets/Images/Instant-logo.png";



class signInHome extends Component {
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
        debugger;
        this.handleGetDefaultPaymentGateway();
    }

    handleGetDefaultPaymentGateway() {
        debugger;
        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "MerchantMarketing/getdefaultpaymentgateway",
            headers: authHeader("no"),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    debugger;
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
                debugger;
                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleGetStripeUrlDetails() {
        debugger;
        if (this.handleValidation()) {
            axios({
                method: "post",
                url: config.apiUrl + "MerchantMarketing/MerchantsignupforStripe",
                headers: authHeader("no"),
                params: {
                    EmailId: this.state.emailId
                }
            })
                .then(function (res) {
                    debugger;
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
                    debugger;
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
                    url: config.apiUrl + "MerchantMarketing/MerchantEmailOTP",
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
            url: config.apiUrl + "MerchantMarketing/MerchantEmailOTPVerification",
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
            <div className="marketingSignHome">
                <NotificationContainer />
                <div className="merchantMar">
                    <Header />
                </div>
                <div className="container topbottom">
                    <div className="mainCard">
                        <div className="card">
                            <div className="Circleimg">
                                <img src={foryou} alt="Circle" />
                            </div>
                            <h4>For You</h4>
                            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className="signup">
                                <Link to="/instantPayUserLogin">
                                    <button type="button">Sign In Now</button>
                                </Link>
                            </div>

                            <div className="Video">
                                <a href="https://youtu.be/U6fC4Ij608A" target="_blank">
                                    <img src={vedioplaypic} alt="Video" />
                                </a>
                            </div>

                        </div>
                        <div className="card">
                            <div className="imgbusiness">
                                <img src={business} alt="Circle" />
                            </div>
                            <h4>For Your Business</h4>
                            <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <div className="signup1">
                                {/* {this.state.paymentGatewayType.length > 0 &&
                                    this.state.paymentGatewayType[0].paymentGatewayName.toLowerCase() == "stripe" ?
                                    ( */}
                                    {/* <Link onClick={this.handleMerchantStripPopOpen.bind(this)}
                                    // onClick={this.handleGetStripeUrlDetails.bind(this)}
                                    >
                                        <button type="button">Sign Up Now</button>
                                    </Link> */}
                                    <Link to="/instantPayMerchantLogin">
                                         <button type="button">Sign In Now</button>
                                    </Link>)
                                
                            </div>
                            <div className="Video">
                                <a href="https://youtu.be/U6fC4Ij608A" target="_blank">
                                    <img src={lapivedioplay} alt="Video" />
                                </a>
                            </div>
                        </div>
                    </div>
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
                        <Modal
                            open={this.state.merchantstrippop}
                            onClose={this.handleMerchantStripPopClose.bind(this)}
                            modalId="PlanPaymentModal"
                            overlayId="overlay"
                        >
                            <div className="backtext">
                                <h3 className="eduser">Merchant Registration</h3>
                                <img src={CloseIcon} alt="CloseIcon" className="closeicon" onClick={this.handleMerchantStripPopClose.bind(this)} />
                            </div>
                            <div className="edituser signup">
                                <div className="mersign">
                                    <div className="input-cntr margin">
                                        <div className="input-icons">
                                            <img src={email} alt="icon missing" />
                                        </div>
                                        <input type="text" placeholder="Email Id *"
                                            name="emailId"
                                            value={this.state.emailId}
                                            onChange={this.handleOnChange.bind(this)}
                                            disabled={!this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true}
                                        />
                                    </div>
                                </div>

                                {this.state.isEmailOtpVerified ?
                                    (<p className="Verify">Verified</p>) :
                                    (this.state.isEmailOTPVerifySend ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? (<p className="Verify">OTP Sent</p>) : (<p className="Verify"></p>)) :
                                        (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Verify OTP</p>))}
                                {this.state.isVerifyEmail ?
                                    (<><div className="mersign">
                                        <div>
                                            <div className="input-cntr margin">
                                                <div className="input-icons">
                                                    <img src={email} alt="icon missing" />
                                                </div>
                                                <input type="text" placeholder="Enter Email OTP"
                                                    name="emailOTP"
                                                    value={this.state.emailOTP}
                                                    onChange={this.handleOnChange.bind(this)}
                                                    disabled={!this.state.isEmailOtpVerified ? false : true}
                                                />
                                            </div>

                                            {this.state.isEmailOtpVerified ?
                                                (<p className="Verify"></p>) :
                                                ((this.state.emailMinute == 0 && this.state.emailSecond == 0) ? (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Resend OTP</p>) :
                                                    (<p className="Verify" onClick={this.handleConfirmEmailOTP}>Confirm <label style={{ paddingLeft: "12px" }}>{this.state.emailMinute}{" : "}{this.state.emailSecond}</label></p>))}
                                        </div>
                                    </div></>)
                                    : null}
                                <div className="merchtstppopup">
                                    <button className="btn" onClick={this.handleGetStripeUrlDetails.bind(this)}>Submit</button>
                                </div>
                            </div>
                        </Modal>
                        <div className="signbtn">
                            <ul>
                                <li><a className="fa fa-facebook" href="https://www.facebook.com/" target="_blank"></a></li>
                                <li><a className="fa fa-twitter" href="https://twitter.com/" target="_blank"></a></li>
                                <li><a className="fa fa-linkedin" href="https://in.linkedin.com/" target="_blank"></a></li>
                                <li><a className="fa fa-instagram" href="https://www.instagram.com/" target="_blank"></a></li>
                                <li><a className="fa fa-youtube-play" href="https://www.youtube.com/" target="_blank"></a></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default signInHome
