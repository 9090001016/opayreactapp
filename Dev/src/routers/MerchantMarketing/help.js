import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./../../helpers/config";
import axios from "axios";
import Header from "./../MerchantMarketing/header";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

class help extends Component {
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
            url: config.apiUrl + "MerchantMarketing/MerchantHomePageStaticData",
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
                    <h3>Help</h3>
                    <div className="apitab">
                        {staticContent.filter(e => e.contentType == "Help").map(item => (
                            <p className="mt-2">{item.contentText}</p>
                        ))}
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

export default help;
