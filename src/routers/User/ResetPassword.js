import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import axios from "axios";
import config from "../../helpers/config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import eye from "./../../assets/Images/eye.png";
import hidepassword from "./../../assets/Images/hidepassword.png";
import lock from "./../../assets/Images/lock.png";
import { encryption } from "../../helpers/Encryption";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

const cookies = new Cookies();
class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      newPassword: "",
      confirmPassword: "",
      loading: "",
      isRevealPassword: false,
      isRevealConfirmPassword: false,
    };
    this.handleFinaleSubmit = this.handleFinaleSubmit.bind(this);
  }

  componentDidMount() {
    
    var emailId = window.localStorage.getItem("emailId");
    // window.location.href
    //   .slice(window.location.href.indexOf("?") + 1)
    //   .split(":")[1];
    this.setState({
      emailId,
    });
  }

  ///finale submit
  handleFinaleSubmit(e) {
    e.preventDefault();
    var self = this;

    const { emailId, newPassword, confirmPassword } = this.state;

    if (newPassword && confirmPassword) {
      if (this.state.newPassword.length < 8) {
        return NotificationManager.error(
          "Password length must be atleast 8 characters.",
          "",
          1500
        );
      }
      var reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      if (reg.test(this.state.newPassword) === false) {
        return NotificationManager.error(
          "Password must have atleast one alphabet, one numeric and one special character.",
          "",
          1500
        );
      }

      if (newPassword !== confirmPassword)
        return NotificationManager.error(
          "New Password and Confirm Password don't match.",
          "",
          1500
        );
      self.setState({
        loading: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "UserAccount/customerresetpassword",
        data: {
          emailId: emailId,
          password: encryption(newPassword, "enc"),
          newPassword: encryption(confirmPassword, "enc"),
          ChangePasswordType: "mail",
        },
      })
        .then(function (res) {
          
          let resValid = res.data.message;
          if (resValid === "Success") {
            NotificationManager.success(
              "Your password has been reset.",
              "",
              1500
            );
            setTimeout(function () {
              self.props.history.push("/instantPayUserLogin");
            }, 1600);
          }
          self.setState({
            loading: false,
          });
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loading: false,
          });
        });
    } else {
      NotificationManager.error("The credentials cannot be empty.", "", 1500);
    }
  }
  handleClearCookies() {
    localStorage.clear();
  }
  /// handle input onchange
  handleInputOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  togglePassword = (event) => {
    this.setState({ isRevealPassword: !this.state.isRevealPassword });
  };

  toggleConfirmPassword = (event) => {
    this.setState({
      isRevealConfirmPassword: !this.state.isRevealConfirmPassword,
    });
  };

  render() {
    return (
      <div className="outer-sign-in">
        <NotificationContainer />
        <div className="text-center w-100">
        <img src={InstantLogo} width="150px" className="logo__img" />
          
          <div className="sign-in-card">
            <label className="sign-in">Reset Password</label>
            <form name="reset-password-form" onSubmit={this.handleFinaleSubmit}>
              <div className="input-cntr">
                <div className="input-icons">
                  <img src={lock} alt="icon missing" />
                </div>
                <input
                  type={this.state.isRevealPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  value={this.state.newPassword}
                  maxLength={100}
                  autoComplete="off"
                  onChange={this.handleInputOnchange}
                />
                <div
                  className="input-icons cursor-pointer m-0 ml-2"
                  onClick={this.togglePassword}
                >
                  {this.state.isRevealPassword ? (
                    <img src={eye} alt="icon missing" />
                  ) : (
                    <img src={hidepassword} alt="icon missing" />
                    // <i
                    //   class="fa fa-eye-slash icon-eye-slash"
                    //   aria-hidden="true"
                    // ></i>
                  )}
                </div>
              </div>
              <div className="input-cntr">
                <div className="input-icons">
                  <img src={lock} alt="icon missing" />
                </div>
                <input
                  type={
                    this.state.isRevealConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  maxLength={25}
                  autoComplete="off"
                  onChange={this.handleInputOnchange}
                />
                <div
                  className="input-icons cursor-pointer m-0 ml-2"
                  onClick={this.toggleConfirmPassword}
                >
                  {this.state.isRevealConfirmPassword ? (
                    <img src={eye} alt="icon missing" />
                  ) : (
                    <img src={hidepassword} alt="icon missing" />
                    // <i
                    //   class="fa fa-eye-slash icon-eye-slash"
                    //   aria-hidden="true"
                    // ></i>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="butn mx-auto"
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
