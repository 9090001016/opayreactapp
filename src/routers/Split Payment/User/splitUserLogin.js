import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "./../../../assets/Images/avatar.png";
import lock from "./../../../assets/Images/lock.png";
import eye from "./../../../assets/Images/eye.png";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Cookies from "universal-cookie";
import config from "../../../helpers/config";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { encryption } from "../../../helpers/Encryption";
import hidepassword from "./../../../assets/Images/hidepassword.png";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

const cookies = new Cookies();
class splitUserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      loading: false,
      isRevealPassword: false,
    };
    this.handleFinaleSubmit = this.handleFinaleSubmit.bind(this);
  }
  componentDidMount() {
    document.getElementsByTagName("meta")[3].content =
      "OnePay for Customers – No hurry, No worry Shopping Experience";
    document.getElementsByTagName("meta")[4].content =
      "Shop now from favorite brands and pay for your purchases over time. No time-consuming approval process, no interest fee. Sign up now for Buy Now Pay Later option.";
  }
  ///finale submit
  handleFinaleSubmit(e) {
    e.preventDefault();
    var self = this;

    const { userName, password } = this.state;
    // var X_Authorized_userId = encryption(userName, "enc");

    // let X_Authorized_password = encryption(password, "enc");

    // let X_Authorized_Domainname = encryption(window.location.origin, "enc");
    if (userName && password) {
      self.setState({
        loading: true,
      });
      axios({
        method: "get",
        url: config.apiUrl + "OnePayUserAccount/userlogin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Authorized-userId": userName.toLocaleLowerCase().trim(),
          "X-Authorized-password": encryption(password, "enc"),
        },
      })
        .then(function (res) {
          let resValid = res.data.message;
          if (resValid === "Valid Login") {
            let decryptedToken = encryption(res.data.responseData.token, "dec");
            window.localStorage.setItem(
              "onepayusertoken",
              res.data.responseData.token
            );
            setTimeout(function () {
              self.props.history.push("/onePayUser/userDashboard");
            }, 100);
            self.setState({
              loading: false,
            });
            cookies.set("onepayusertoken", res.data.responseData.token, {
              path: "/",
              maxAge: 86400,
            });
          } else {
            NotificationManager.error(res.data.responseData.message, "", 1500);
            self.setState({
              loading: false,
            });
          }
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

  render() {
    return (
      <div className="outer-sign-in">
        <NotificationContainer />
        <div className="text-center w-100">
          <Link to="/">
            <img src={OnePayLogo} width="150px" className="onepay__logo" />
          </Link>
          <div className="sign-in-card">
            <label className="sign-in">Sign In</label>
            <form name="sign-in-form" onSubmit={this.handleFinaleSubmit}>
              <div className="input-cntr">
                <div className="input-icons">
                  <img src={avatar} alt="icon missing" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  name="userName"
                  value={this.state.userName}
                  maxLength={100}
                  autoComplete="off"
                  onChange={this.handleInputOnchange}
                />
              </div>
              <div className="input-cntr">
                <div className="input-icons">
                  <img src={lock} alt="icon missing" />
                </div>
                <input
                  type={this.state.isRevealPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={this.state.password}
                  maxLength={25}
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
                    // <i
                    //   class="fa fa-eye-slash icon-eye-slash"
                    //   aria-hidden="true"
                    // ></i>
                    <img src={hidepassword} alt="icon missing" />
                  )}
                </div>
              </div>
              <div className="flex-parted">
                <span></span>
                <Link
                  to="OnePayUserForgotPassword"
                  className="font-14-500 color-dark-blue"
                >
                  Forgot Password ?
                </Link>
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
                Sign In
              </button>
              <Link to="onePayUserSignUp">
                <p className="mtop10 fsize14">Sign Up</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default splitUserLogin;
