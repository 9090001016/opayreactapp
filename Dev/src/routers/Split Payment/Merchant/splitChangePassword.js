import React, { Component } from "react";
import axios from "axios";
import config from "../../../helpers/config";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import lock from "./../../../assets/Images/lock.png";
import { encryption } from "../../../helpers/Encryption";
import eye from "./../../../assets/Images/eye.png";
import hidepassword from "./../../../assets/Images/hidepassword.png";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

class splitChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      cameFrom: "",
      isRevealOldPassword: false,
      isRevealNewPassword: false,
      isRevealPassword: false
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentDidMount() {
    
    const cameFrom = this.props.location.state.cameFrom;
    this.setState({
      cameFrom,
    });
  }

  handleChangePassword = (e) => {
    e.preventDefault();
    
    if (
      this.state.oldPassword &&
      this.state.newPassword &&
      this.state.confirmPassword
    ) {
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

      if (this.state.newPassword !== this.state.confirmPassword)
        return NotificationManager.error(
          "New Password and Confirm Password don't match",
          "",
          1500
        );
      var self = this;
      self.setState({
        loading: true,
      });
      var json = {
        Oldpassword: encryption(this.state.oldPassword, "enc"),
        NewPassword: encryption(this.state.newPassword, "enc"),
        ConfirmPassword: encryption(this.state.confirmPassword, "enc"),
      };
      axios({
        method: "post",
        url: config.apiUrl + "OnePayAccount/ChangePassword",
        headers: merchantAuthHeader(),
        data: json,
      })
        .then(function (res) {
          
          let msg = res.data.message;
          self.setState({
            loading: false,
          });
          if (msg === "Success") {
            NotificationManager.success(
              "Password changed successfully.",
              "",
              1500
            );
              setTimeout(() => {
                self.props.history.push("/onePayMerchant/merchantProfile");
              }, 1600);
            
          } else if (msg === "Record Not Found") {
            NotificationManager.error("Invalid Current Password");
          } else {
            NotificationManager.error(msg);
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
  };

  /// handle input onchange
  handleInputOnchange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleOldPassword = (event) => {
    this.setState({ isRevealOldPassword: !this.state.isRevealOldPassword });
  };

  toggleNewPassword = (event) => {
    this.setState({ isRevealNewPassword: !this.state.isRevealNewPassword });
  };

  togglePassword = (event) => {
    this.setState({ isRevealPassword: !this.state.isRevealPassword });
  };

  render() {
    return (
      <div className="outer-sign-in">
        <NotificationContainer />
        <div className="text-center w-100">
        <img src={OnePayLogo} className="onepay__logo"/>
          <div className="sign-in-card">
            <label className="sign-in">Change Password</label>
            <form
              name="reset-password-form"
              onSubmit={this.handleChangePassword}
            >
              <div className="input-cntr">
              <div className="input-icons">
                  <img src={lock} alt="icon missing" />
              </div>
                <input
                  type={this.state.isRevealOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  name="oldPassword"
                  value={this.state.oldPassword}
                  onChange={this.handleInputOnchange}
                />
                <div className="input-icons cursor-pointer m-0 ml-2"
                  onClick={this.toggleOldPassword}
                >
                  {this.state.isRevealOldPassword ? (
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
              <div className="input-cntr">
              <div className="input-icons">
                  <img src={lock} alt="icon missing" />
              </div>
                <input
                  type={this.state.isRevealNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.handleInputOnchange}
                />
                <div className="input-icons cursor-pointer m-0 ml-2"
                  onClick={this.toggleNewPassword}
                >
                  {this.state.isRevealNewPassword ? (
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
              <div className="input-cntr">
              <div className="input-icons">
                  <img src={lock} alt="icon missing" />
              </div>
                <input
                  type={this.state.isRevealPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleInputOnchange}
                />
                <div className="input-icons cursor-pointer m-0 ml-2"
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
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default splitChangePassword;
