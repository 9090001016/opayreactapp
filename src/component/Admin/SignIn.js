import React, { Component } from "react";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "./../../assets/css/custome.css";
import { Link } from "react-router-dom";
import avatar from "./../../assets/Images/avatar.png";
import lock from "./../../assets/Images/lock.png";
import eye from "./../../assets/Images/eye.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import config from "./../../helpers/config";
import { encryption } from "../../helpers/Encryption";
import hidepassword from "./../../assets/Images/hidepassword.png";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Cookies from "universal-cookie";
import { authHeader } from "../../helpers/authHeader";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

const cookies = new Cookies();
class SingIn extends Component {
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

  ///finale submit
  handleFinaleSubmit(e) {
    e.preventDefault();
    var self = this;

    const { userName, password } = this.state;
    if (userName && password) {
      self.setState({
        loading: true,
      });
      axios({
        method: "get",
        url: config.apiUrl + "AccountAdmin/loginuser",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Authorized-userId": userName.toLocaleLowerCase().trim(),
          "X-Authorized-password": encryption(password, "enc"),
        },
      })
        .then(function (res) {
          
          let resValid = res.data.message;
          var search = "";
          if (resValid === "Valid Login") {
            
            let decryptedToken = encryption(res.data.responseData.token, "dec");
            const decryptedObj = JSON.parse(decryptedToken);
            window.localStorage.setItem("token", res.data.responseData.token);
            window.localStorage.setItem("username", res.data.responseData.firstName);
            window.localStorage.setItem("emailid", res.data.responseData.userEmailID);
            if (decryptedObj.IsAdmin) {
              search = "Admin";
            } else if (decryptedObj.IsAdminUser) {
              search = "User";
            }
            self.setState({
              loading: false,
            });
            cookies.set("token", res.data.responseData.token, { path: "/", maxAge: 86400 });
            self.handleGetRolesPermissionsList(search);
            // setInterval(() => {
            //   self.handleClearCookies()
            // }, 60000);
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

  handleGetRolesPermissionsList(search) {
    let self = this;
    var rolesPermissionsData = [];
    self.setState({
      loading: true
    });
    axios({
      method: "get",
      url: config.apiUrl + "Settings/rolepermissionsbyroleid",
      headers: authHeader(),
      // params: {
      //   searchBy: search,
      // },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          data.map((item) => {
            // if (item.roleName == "Admin") {
              window.localStorage.setItem("InstantPayAdminModule", item.mappedModuleName);
              window.localStorage.setItem("InstantPayAdminSubModule", item.mappedSubModuleName);
            // } else if (item.roleName == "User") {
            //   window.localStorage.setItem("Module", item.mappedModuleName);
            //   window.localStorage.setItem("SubModule", item.mappedSubModuleName);
            //   // self.setState({
            //   //   rolesPermissionsData: [],
            //   //   loading: false
            //   // });
            // }
          })

          // if (search = "Admin") {
            if(window.localStorage.getItem("InstantPayAdminModule").includes('Dashboard'))
            {
              setTimeout(function () {
                self.props.history.push("/instantPayAdmin/dashboard");
              }, 100);  
            } else if(window.localStorage.getItem("InstantPayAdminModule").includes('End Customer Management')){
              setTimeout(function () {
                self.props.history.push("/instantPayAdmin/adminUserManagement");
              }, 100); 
            } else if(window.localStorage.getItem("InstantPayAdminModule").includes('Merchants Management')){
              setTimeout(function () {
                self.props.history.push("/instantPayAdmin/adminMerchantManagement");
              }, 100); 
            }
                  
          // } else if (search = "User") {
          //   setTimeout(function () {
          //     self.props.history.push("/user/dashboard");
          //   }, 100);          
          // } else if (search = "Merchant") {
          //   setTimeout(function () {
          //     self.props.history.push("/merchant/dashboard");
          //   }, 100);           
          // } else if (search = "Customer") {
          //   setTimeout(function () {
          //     self.props.history.push("/user/userdashboard");
          //   }, 100);       
          // }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="outer-sign-in">
        <NotificationContainer />
        <div className="text-center w-100">
        <img src={InstantLogo} width="150px" className="logo__img" />
          
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
                {/* <div className="rem-me">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div> */}
                <span></span>
                <Link
                  to="instantPayAdminForgotPassword"
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
              {/* <div className="font-14-500 mt-45">
                Don't have an account ?{" "}
                <Link
                  to="/"
                  className="color-dark-blue text-uppercase underlined-link"
                >
                  Signup
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SingIn;
