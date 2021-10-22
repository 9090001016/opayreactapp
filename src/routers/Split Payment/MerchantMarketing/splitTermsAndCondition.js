import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./../../../helpers/config";
import axios from "axios";
import Header from "./splitHeader";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

class splitTermsAndCondition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staticContent: [],
        };
    }

    componentDidMount() {
        this.handleGetStaticContent();
    }

    handleGetStaticContent() {
        let self = this;

        axios({
            method: "get",
            url: config.apiUrl + "OnePayMerchantMarketing/TermsAndConditionsDetails",
        })
            .then(function (res) {
                
                let data = res.data.responseData;
                self.setState({
                    staticContent: data,
                });
            })
            .catch((data) => {
                console.log(data);
            });
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
                    <h3>Terms And Conditions</h3>
                    <div className="apitab">
                        {staticContent.map((item, i) => (
                            <p className="mt-2">{i + 1}{". "}{item.contentText}</p>
                        ))}
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
        );
    }
}

export default splitTermsAndCondition;
