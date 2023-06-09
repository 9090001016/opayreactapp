import React, { Component } from "react";
import dashboard from "./../../../assets/Images/dashboard.png";
import merchant from "./../../../assets/Images/merchant.png";
import user from "./../../../assets/Images/user.png";
import Bluser from "./../../../assets/Images/BlUser.png";
import setting from './../../../assets/Images/smallicons/Settings.png'
import notification from './../../../assets/Images/smallicons/notify.png'
import profile from "./../../../assets/Images/profile.jpg";
import Edit from "./../../../assets/Images/edit.png";
import Modal from "react-responsive-modal";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../helpers/splitAuthHeader";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { Drawer, Button, Space } from "antd";
import menu from "./../../../assets/Images/menu.png";
import logoutwhite from "./../../../assets/Images/logoutwhite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import dashboardSVG from "./../../../assets/Images/dashboard2.svg";
import OnePayLogo from './../../../assets/Images/smallicons/main_logo.png'

const cookies = new Cookies();
class splitHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      visible: false,
      placement: "left",
      loading: false,
      notificationCount: 0,
      userName: "",
      userEmail: "",
      userPic: "",
      module: "",
    };
  }

  componentDidMount() {

    var module = window.localStorage.getItem("OnePayAdminModule") == null ? "" :
      window.localStorage.getItem("OnePayAdminModule");
    this.handleGetNotificationsCount();
    this.handleUserInfo();
    // this.settingClicked();
    this.setState({
      module
    })
    // setInterval(() => {
    //   this.handleGetNotificationsCount();
    // }, 5000);
  }
  // componentDidUpdate(){
  //   this.settingClicked();
  // }

  handleUserInfo = () => {
    var self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayDashboard/GetUserProfileDetail",
      headers: authHeader(),
    })
      .then(function (res) {

        let msg = res.data.message;
        let data = res.data.responseData[0];
        if (msg === "Success") {
          self.setState({
            userName: data.firstName,
            userEmail: data.emailId,
            userPic: data.profilePicture,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  // handleGetNotificationsCount() {
  //   let self = this;

  //   axios({
  //     method: "get",
  //     url: config.apiUrl + "MerchantDashboard/NotificationCount",
  //     headers: authHeader(),
  //   })
  //     .then(function (res) {
  //       let status = res.data.message;
  //       let notificationCount = res.data.responseData;
  //       if (status === "Success") {
  //         self.setState({
  //           notificationCount,
  //         });
  //       } else {
  //         self.setState({
  //           notificationCount: 0,
  //         });
  //       }
  //     })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  handleGetNotificationsCount() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayDashboard/adminnotificationcount",
      headers: authHeader(),
    })
      .then(function (res) {

        let status = res.data.message;
        let notificationCount = res.data.responseData.notificationCount;
        if (status === "Success") {
          self.setState({
            notificationCount,
          });
        } else {
          self.setState({
            notificationCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  onChange = (e) => {
    this.setState({ placement: e.target.value });
  };
  handleUserOpen() {
    this.setState({ user: true });
  }
  handleUserClose = () => {
    this.setState({ user: false });
  };

  handleLogout() {
    var self = this;

    self.setState({
      loading: true,
    });
    axios({
      method: "get",
      url: config.apiUrl + "AccountAdmin/Logout",
      headers: authHeader(),
    })
      .then(function (res) {

        if (res.status) {
          cookies.remove("token");
          window.localStorage.removeItem('onepaytoken');
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('emailid');
          window.location.href = "/admin";
        } else {
          NotificationManager.error("Not able to logout.");
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
  }
  
  

  render() {
    const { placement, visible } = this.state;
    return (
      <div className="header">
        <img src={OnePayLogo} className="onepay__logo" />
        {/* <h1 className="header-logo">ONE PAY</h1> */}
        <div className="header-nav">

          <div className="header-right">
            <ul className="d-flex">
              {(() => {
                if (this.state.module.includes('Notifications')) {
                  return (
                    <li className="header-icons" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Notification">
                      <Link
                        to="/onePayAdmin/adminNotification"
                        className="position-relative"
                        onClick={this.handleGetNotificationsCount}
                      >
                        <img src={notification} alt="icon missing" />
                        {this.state.notificationCount !== 0 && (
                          <span className="notification-count" id="notificationCount">
                            {this.state.notificationCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                }
              })()}
            </ul>
            <div className="user-profile" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout">
              <div className="profile-img">
                <img
                  // src={profile}
                  src={this.state.userPic ? this.state.userPic : Bluser}
                  alt="img missing"
                />
              </div>
              <span className="profile-img-arrow" onClick={this.handleUserOpen.bind(this)}></span>
            </div>
          </div>
        </div >
        {/* Mobile View Header */}
        < div className="sidebarresp" >
          <img
            className="menubtn"
            src={menu}
            alt="menu"
            onClick={this.showDrawer.bind(this)}
          />
          <ul className="d-flex">
            <li className="header-icons">
              <Link
                to="/onePayAdmin/adminNotification"
                className="position-relative"
                onClick={this.handleGetNotificationsCount}
              >
                <img src={notification} alt="icon missing" />
                {this.state.notificationCount !== 0 && (
                  <span className="notification-count" id="notificationCount">
                    {this.state.notificationCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="header-icons">
              <Link to="/onePayAdmin/adminSetting">
                <img src={setting} alt="icon missing" />
              </Link>
            </li>
            <li className="header-icons">
              <Link to="/onePayAdmin/adminProfile">
                <img className="profilerep" src={profile} alt="profile" />
              </Link>
            </li>
          </ul>
          <Drawer
            title={<img src={OnePayLogo} width="150px" className="logo__img instant__logo" />}
            placement={placement}
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <ul className="respnavb">
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayAdmin/dashboard">
                  <img src={dashboard} alt="icon missing" />
                  <span className="ml-2 sidbarspan"> Dashboard</span>
                </NavLink>
              </li>
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayAdmin/adminUserManagement">
                  <img src={user} alt="icon missing" />
                  <span className="ml-2 sidbarspan">User Management</span>
                </NavLink>
              </li>
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayAdmin/adminMerchantManagement">
                  <img src={merchant} alt="icon missing" />
                  <span className="ml-2 sidbarspan">Merchant Management</span>
                </NavLink>
              </li>
            </ul>
            <div
              className="respbarli logoutbg"
              onClick={this.handleLogout.bind(this)}
            >
              <Link to="">
                <img
                  className="logouticon"
                  src={logoutwhite}
                  alt="logoutwhite"
                />
                <span className="ml-2 sidbarspan">Logout</span>
              </Link>
            </div>
          </Drawer>
        </div >
        {/* Modal User */}
        < Modal
          open={this.state.user}
          onClose={this.handleUserClose}
          modalId="HeaderUserModal"
          overlayId="overlay"
        >
          <div className="mainuser">
            <div className="usericon">
              <img
                src={this.state.userPic ? this.state.userPic : Bluser}
                alt="UserIcon"
              />
            </div>
            <div className="usertext">
              <label>
                {this.state.userName}
                <Link onClick={() => { window.location.href = "/onePayAdmin/adminProfile" }}>
                  {/* <img src={Edit} alt="Edit" onClick={this.handleUserClose.bind(this)} /> */}
                  <img src={Edit} alt="Edit" />
                </Link>
                <label className="text-lowercase">{this.state.userEmail}</label>
              </label>
              
            </div>
            <div className="Logout">
              <button
                className="btn"
                onClick={this.handleLogout.bind(this)}
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
                Logout
              </button>
            </div>
          </div>
        </Modal >
      </div >
    );
  }
}

export default splitHeader;
