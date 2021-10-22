import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "./../../helpers/config";
import axios from "axios";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from 'react-phone-input-2';
import Header from "./../MerchantMarketing/header";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

class contactus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staticContent: [],
      contactInfo: {
        name: "",
        emailId: "",
        contactNo: "",
        message: "",
      },
      validEmail: false,
      validNo: false,
      touched: false,
      loading: false,
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

  handleInputOnchange = (e) => {
    
    let contactInfo = { ...this.state.contactInfo };
    if (e.target.name === "contactNo") {
      if (e.target.value.length <= 10) {
        if (!isNaN(e.target.value)) {
          contactInfo[e.target.name] = e.target.value;
          this.setState({
            validNo: true,
          });
        }
      }
      if (e.target.value.length === 10) {
        this.setState({
          validNo: false,
        });
      }
    } else {
      contactInfo[e.target.name] = e.target.value;
    }
    if (e.target.name === "emailId") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(e.target.value) === false) {
        this.setState({
          validEmail: true,
        });
      } else {
        this.setState({
          validEmail: false,
        });
      }
    }
    this.setState({
      contactInfo,
    });
  };

  handlePhoneOnChange = (value) => {
    let contactInfo = { ...this.state.contactInfo };
    contactInfo["contactNo"] = value;
    this.setState({
      contactInfo,
    });
  }

  handleSubmitContactForm() {
    let self = this;
    

    const { name, emailId, contactNo, message } = this.state.contactInfo;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (
      !(
        name &&
        emailId &&
        contactNo &&
        message &&
        !this.state.validEmail &&
        !this.state.validNo
      )
    )
      return;

    this.setState({
      loading: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "MerchantMarketing/InsertCustomerSupportPage",
      data: {
        Name: name,
        ContactNumber: contactNo,
        emailid: emailId,
        Message: message,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Your query was sent successfully.");
          self.setState({
            contactInfo: {
              name: "",
              emailId: "",
              contactNo: "",
              message: "",
            },
            touched: false,
          });
        } else {
          NotificationManager.error("Your query was not sent.");
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const { staticContent } = this.state;
    return (
      <div className="marketingContact">
        <NotificationContainer />
        <div className="merchantMar">
          <Header />
        </div>
        <div className="container topbottom">
          <h3>Contact Us</h3>
          <div className="card">
            <div className="card-a">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Name *</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={this.state.contactInfo.name}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.contactInfo.name.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot pincontactus">
                    <label>Contact Number *</label>
                    {/* <input
                      type="text"
                      placeholder="Enter Contact Number"
                      name="contactNo"
                      value={this.state.contactInfo.contactNo}
                      onChange={this.handleInputOnchange}
                    /> */}
                    <PhoneInput
                      country={'au'}
                      value={this.state.contactInfo.contactNo}
                      onChange={this.handlePhoneOnChange}
                      disabled={!this.state.isMobileOtpVerified ? ((this.state.minute > 0 || this.state.second > 0) ? true : false) : true}
                      maxLength="10"
                    />
                    {this.state.validNo && (
                      <span className="Error">Invalid Number.</span>
                    )}
                    {this.state.contactInfo.contactNo.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="marginbot">
                    <label>Email ID *</label>
                    <input
                      type="text"
                      placeholder="Enter Email ID"
                      name="emailId"
                      value={this.state.contactInfo.emailId}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.validEmail && (
                      <span className="Error">Invalid Email.</span>
                    )}
                    {this.state.contactInfo.emailId.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12">
                  <div className="marginbot">
                    <label>Message *</label>
                    <textarea
                      placeholder="Enter your message here..."
                      name="message"
                      value={this.state.contactInfo.message}
                      onChange={this.handleInputOnchange}
                    ></textarea>
                    {this.state.contactInfo.message.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12">
                  <button
                    onClick={this.handleSubmitContactForm.bind(this)}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faCircleNotch}
                        size="sm"
                        spin
                      />
                    )}
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="card-b">
              <ul>
                {staticContent.filter(e => e.contentType == "Contact Us").map(item => (
                  <li>
                    <label>
                      <span>
                        <i className={item.title == "Address" ? "fa fa-map-marker" : (item.title == "Mail" ? "fa fa-envelope-o" : "fa fa-phone")}></i>
                      </span>
                      {item.contentText}
                    </label>
                  </li>))}
                {/* <li>
                  <label>
                    <span>
                      <i className="fa fa-envelope-o"></i>
                    </span>
                    {staticContent.contactUsMail}
                  </label>
                </li>
                <li>
                  <label>
                    <span>
                      <i className="fa fa-phone"></i>
                    </span>
                    {staticContent.contactUsCall}
                  </label>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="foot">
          <footer className="container">
            <div className="inpay">
            <img src={InstantLogo} width="150px" className="logo__img" />
              {/* <span>&copy; 1999-2020</span>
              <a>Privacy Policy Terms and Conditions</a> */}
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

export default contactus;
