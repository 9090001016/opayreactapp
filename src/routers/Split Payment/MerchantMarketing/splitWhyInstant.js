import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./splitHeader";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

class splitWhyInstant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staticContent: [],
            type: "",
            text: ""
        };
    }

    componentDidMount() {
        var type = this.props.location.type;
        var text = this.props.location.text;
        if (type) {
            this.setState({ type: type, text: text });
        } else {
            this.props.history.push("home");
        }
    }

    hanlecallback(key) {
        console.log(key);
    }
    render() {
        const { staticContent } = this.state;
        return (
            <div className="marketingApi">
                <div className="merchantMar">
                    <Header />
                </div>
                <div className="container topbottom">
                    <h3>{this.state.type}</h3>
                    <div className="apitab">
                        <p className="mt-2">{this.state.text}</p>
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
                            <ul>
                                <li>
                                    <i className="fa fa-facebook" href="https://www.facebook.com/" target="_blank"></i>
                                </li>
                                <li>
                                    <i className="fa fa-twitter" href="https://twitter.com/" target="_blank"></i>
                                </li>
                                <li>
                                    <i className="fa fa-linkedin" href="https://in.linkedin.com/" target="_blank"></i>
                                </li>
                                <li>
                                    <i className="fa fa-instagram" href="https://www.instagram.com/" target="_blank"></i>
                                </li>
                                <li>
                                    <i className="fa fa-youtube-play" href="https://www.youtube.com/" target="_blank"></i>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default splitWhyInstant;
