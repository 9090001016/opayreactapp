import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../../assets/css/custome.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../helpers/splitAuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";
import avatar from "./../../../assets/Images/avatar.png";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      loading: false,
      otpLoading: false,
      editUser: false,
      otp: "",
      minute: 0,
      second: 0,
      disableOtp: false,
    };
  }
  // handleEditUserOpen() {
  //   this.setState({ editUser: true });
  // }
  handleEditUserClose() {
    
    this.setState({ editUser: false, minute: 0, second: 0, otp: "" });
    clearInterval(this.id);
  }
  handleFinaleSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.emailId) {
      var self = this;
      self.setState({
        loading: true,
        minute: 0,
        second: 0,
        otp: "",
        disableOtp: true,
      });
      // let domain = "http://localhost:3000";
      // let domain = "https://k2ui.dcdev.brainvire.net";
      let domain = "https://instant-dev-webapp.azurewebsites.net";
      axios({
        method: "post",
        url: config.apiUrl + "OnePayAccountAdmin/ForgetPassword",
        headers: {
          "X-Authorized-Domainname": domain,
        },
        params: {
          EmailId: this.state.emailId,
        },
      })
        .then(function (res) {
          
          let msg = res.data.message;
          if (msg === "Success") {
            NotificationManager.success("Email have been sent.", "", 1500);
            self.setState({ editUser: true, minute: 5, second: 0 });
            self.id = setInterval(self.initiate, 1000);
          } else if (msg === "Record Not Found") {
            NotificationManager.error(
              "The Email ID is not registered.",
              "",
              1500
            );
            self.setState({ editUser: false, minute: 0, second: 0 });
          }
          self.setState({
            loading: false,
            disableOtp: false,
          });
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loading: false,
            disableOtp: false,
          });
        });
    } else {
      NotificationManager.error("The credentials cannot be empty.", "", 1500);
    }
  };

  initiate = () => {
    // if (this.state.time !== 0) {
    //   this.setState((prevState, prevProps) => ({
    //     time: prevState.time - 1,
    //   }));
    //   if (this.state.time === 0) {
    //     clearInterval(this.id);
    //     this.setState({ complete: true });
    //   }
    // }
    if (this.state.minute !== 0 && this.state.second == 0) {
      this.setState((prevState, prevProps) => ({
        minute: prevState.minute - 1,
        second: 60
      }));
    }
    if (this.state.second !== 0) {
      this.setState((prevState, prevProps) => ({
        second: prevState.second - 1
      }));
      if (this.state.minute === 0 && this.state.second == 0) {
        clearInterval(this.id);
        this.setState({ complete: true });
      }
    }
  };

  /// handle input onchange
  handleInputOnchange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOTPSubmit() {
    let self = this;

    if (this.state.otp === "")
      return NotificationManager.error("Please enter OTP.");

    this.setState({
      otpLoading: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "OnePayAccountAdmin/AdminEmailOTPVerification",
      headers: authHeader("no"),
      data: {
        OTP: this.state.otp,
        EmailId: this.state.emailId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          window.localStorage.setItem("emailId", self.state.emailId);
          window.location.href = `/onePayAdminResetPassword`;
        } else {
          NotificationManager.error("Invalid OTP.");
        }
        self.setState({
          otpLoading: false,
        });
      })
      .catch((data) => {
        console.log(data);
        self.setState({
          otpLoading: false,
        });
      });
  }

  render() {
    return (
      <div className="outer-sign-in">
        <NotificationContainer />
        <div className="text-center w-100">
        <Link to="/onePayHome">
            <img src={OnePayLogo} width="150px" className="onepay__logo" />
        </Link>
          <div className="sign-in-card">
            <label className="sign-in">Forgot Password</label>
            <form
              name="forgot-password-form"
              onSubmit={this.handleFinaleSubmit}
            >
              <div className="input-cntr">
                <div className="input-icons">
                  <img src={avatar} alt="icon missing" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Registered Email ID"
                  name="emailId"
                  value={this.state.emailId}
                  maxLength={100}
                  autoComplete="off"
                  onChange={this.handleInputOnchange}
                />
              </div>
              <button
                type="submit"
                className="butn mx-auto"
                disabled={this.state.loading}
              // onClick={this.handleEditUserOpen.bind(this)}
              >
                {this.state.loading && (
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faCircleNotch}
                    size="sm"
                    spin
                  />
                )}
                Recover Password
              </button>
            </form>
            <Modal
              open={this.state.editUser}
              onClose={this.handleEditUserClose.bind(this)}
              modalId="ForgotPasswordOtp"
              overlayId="overlay"
            >
              <div className="backtext">
                <h3 className="eduser">Enter OTP</h3>
                <img
                  src={CloseIcon}
                  alt="CloseIcon"
                  className="closeicon"
                  onClick={this.handleEditUserClose.bind(this)}
                />
              </div>
              <div className="edituser">
                <div className="row">
                  <div className="col-12 col-md-12 margin">
                    <label>OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      name="otp"
                      value={this.state.otp}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.minute == 0 && this.state.second ? (
                      <p
                        className={
                          this.state.disableOtp
                            ? "Verify disable-otp"
                            : "Verify"
                        }
                        onClick={this.handleFinaleSubmit}
                      >
                        Resend OTP
                      </p>
                    ) : (
                        <p className="Verify">
                          {this.state.minute}{" : "}{this.state.second}
                        </p>
                      )}
                  </div>
                </div>
                <div className="Editbtn">
                  <button
                    className="btn"
                    onClick={this.handleOTPSubmit.bind(this)}
                    disabled={this.state.otpLoading}
                  >
                    {this.state.otpLoading && (
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
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
