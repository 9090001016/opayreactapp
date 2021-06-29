import React, { Component } from 'react'
import { Link } from "react-router-dom";
import foryou from "../../assets/Images/foryou.png";
import business from "../../assets/Images/business.png";
import vedioplaypic from "../../assets/Images/vedioplaypic.png";
import lapivedioplay from "../../assets/Images/lapivedioplay.png";
import Header from "./../MerchantMarketing/header";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../assets/Images/CloseWhBold.png";
import email from "./../../assets/Images/emailBl.png";
import InstantLogo from "./../../assets/Images/Instant-logo.png";


class merchantstrippop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentGatewayType: [],
            merchantstrippop: false
        }
    }
    handleMerchantStripPopOpen() {
        this.setState({ merchantstrippop: true });
    }
    handleMerchantStripPopClose() {
        this.setState({ merchantstrippop: false });
    }
    render() {
        return (
            <div className="marketingSignHome">
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
                                <Link to="/instantPayUserSignUp">
                                    <button type="button">Sign Up Now</button>
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
                                    (<Link onClick={this.handleGetStripeUrlDetails.bind(this)}>
                                        <button type="button">Sign Up Now</button>
                                    </Link>) : (<Link to="/instantPaySignUp">
                                        <button type="button">Sign Up Now</button>
                                    </Link>)
                                } */}
                                <button type="button" onClick={this.handleMerchantStripPopOpen.bind(this)}>Sign Up Now</button>
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
                            <div className="edituser">


                                <div className="mersign">
                                    <div className="input-cntr margin">
                                        <div className="input-icons">
                                            <img src={email} alt="icon missing" />
                                        </div>
                                        <input type="text" placeholder="Email Id *"
                                            name="emailId"
                                        // value={this.state.emailId}
                                        // onChange={this.handleOnChange.bind(this)}
                                        // disabled={!this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true}
                                        />
                                    </div>
                                    {/* <span className="Error">{this.state.errors["emailId"]}</span> */}
                                </div>
                                <div className="mersign">
                                    <div className="input-cntr margin">
                                        <div className="input-icons">
                                            <img src={email} alt="icon missing" />
                                        </div>
                                        <input type="text" placeholder="Email Id *"
                                            name="emailId"
                                        // value={this.state.emailId}
                                        // onChange={this.handleOnChange.bind(this)}
                                        // disabled={!this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true}
                                        />
                                    </div>
                                    {/* <span className="Error">{this.state.errors["emailId"]}</span> */}
                                </div>
                                <div className="merchtstppopup">
                                    <button className="btn">Submit</button>

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

export default merchantstrippop
