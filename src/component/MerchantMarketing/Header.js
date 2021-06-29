import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import dashboard from "./../../assets/Images/dashboard.png";
import merchant from "./../../assets/Images/merchant.png";
import user from "./../../assets/Images/user.png";
import setting from "./../../assets/Images/setting.png";
import notification from "./../../assets/Images/notification.png";
import profile from "./../../assets/Images/profile.jpg";
import Edit from "./../../assets/Images/edit.png";
import Modal from "react-responsive-modal";
import Bluser from "./../../assets/Images/BlUser.png";
import axios from "axios";
import config from "./../../helpers/config";
import { merchantAuthHeader } from "./../Merchant/merchantAuthHeader";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { Drawer, Button, Space } from "antd";
import menu from "./../../assets/Images/menu.png";
import logoutwhite from "./../../assets/Images/logoutwhite.png";
import InstantLogo from "./../../assets/Images/Instant-logo.png";


const cookies = new Cookies();

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      notificationCount: 0,
      visible: false,
      placement: "left",
      userName: "",
      userEmail: "",
      module: ""
    };
  }

  componentDidMount() {
    var module = window.localStorage.getItem("InstantPayMerchantModule");
    this.handleGetNotificationsCount();
    this.handleUserInfo();
    this.setState({
      module
    })
    // setInterval(() => {
    //   this.handleGetNotificationsCount();
    // }, 5000);
  }

  handleGetNotificationsCount() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "MerchantDashboard/NotificationCount",
      headers: merchantAuthHeader(),
    })
      .then(function (res) {
        
        let status = res.data.message;
        let notificationCount = res.data.responseData;
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
  handleUserClose() {
    this.setState({ user: false });
  }
  handleLogout() {
    axios({
      method: "get",
      url: config.apiUrl + "Account/Logout",
      headers: merchantAuthHeader(),
    })
      .then(function (res) {
        
        if (res.status) {
          cookies.remove("instantmerchanttoken");
          window.localStorage.removeItem('instantmerchanttoken');
          window.location.href = "/merchant";
        } else {
          NotificationManager.error("Not able to logout.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUserInfo = () => {
    var self = this;
    axios({
      method: "get",
      url: config.apiUrl + "Merchant/GetMerchatProfile",
      headers: merchantAuthHeader(),
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

  render() {
    const { placement, visible } = this.state;
    return (
      <div className="header">
        <img src={InstantLogo} width="150px" className="logo__img instant__logo" />
        <div className="header-nav">
          <ul className="header-left">
            {(() => {
              if (this.state.module.includes('Dashboard')) {
                return (
                  <li>
                    <NavLink to="/instantPayMerchant/dashboard">
                      <div className="header-icons">
                        <img src={dashboard} alt="icon missing" />
                      </div>
                      <span className="ml-2">Dashboard</span>
                    </NavLink>
                  </li>
                )
              }
            })()}
            {(() => {
              if (this.state.module.includes('Transaction History')) {
                return (
                  <li>
                    <NavLink to="/instantPayMerchant/transaction-history">
                      <div className="header-icons">
                        <img src={user} alt="icon missing" />
                      </div>
                      <span className="ml-2">Transaction History</span>
                    </NavLink>
                  </li>
                )
              }
            })()}
            {/* <li>
              <Link to="/merchant/salesReport">
                <div className="header-icons">
                  <img src={merchant} alt="icon missing" />
                </div>
                <span className="ml-2">Sales Report</span>
              </Link>
            </li> */}
            {(() => {
              if (this.state.module.includes('Subscription')) {
                return (
                  <li>
                    <NavLink to="/instantPayMerchant/merchantSubscription">
                      <div className="header-icons">
                        <img src={merchant} alt="icon missing" />
                      </div>
                      <span className="ml-2">Subscription</span>
                    </NavLink>
                  </li>
                )
              }
            })()}
          </ul>
          <div className="header-right">
            <ul className="d-flex">
              {(() => {
                if (this.state.module.includes('Notifications')) {
                  return (
                    <li className="header-icons">
                      <Link
                        to="/instantPayMerchant/notification"
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
              {(() => {
                if (this.state.module.includes('Settings')) {
                  return (
                    <li className="header-icons">
                      <Link to="/instantPayMerchant/merchantSetting">
                        <img src={setting} alt="icon missing" />
                      </Link>
                    </li>
                  )
                }
              })()}
            </ul>
            <div className="user-profile">
              <div
                className="profile-img"
                onClick={this.handleUserOpen.bind(this)}
              >
                <img src={this.state.userPic ? this.state.userPic : Bluser} alt="img missing" />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View Header */}
        <div className="sidebarresp">
          <img
            className="menubtn"
            src={menu}
            alt="menu"
            onClick={this.showDrawer.bind(this)}
          />
          <ul className="d-flex">
            <li className="header-icons">
              <Link to="/instantPayMerchant/notification" className="position-relative">
                <img src={notification} alt="icon missing" />
                <span className="notification-count">18</span>
              </Link>
            </li>
            <li className="header-icons">
              <Link to="/instantPayMerchant/merchantSetting">
                <img src={setting} alt="icon missing" />
              </Link>
            </li>
            <li className="header-icons">
              <Link to="/instantPayMerchant/adminProfile">
                <img className="profilerep" src={profile} alt="profile" />
              </Link>
            </li>
          </ul>
          <Drawer
            title={<img src={InstantLogo} width="150px" className="logo__img instant__logo" />}
            placement={placement}
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <ul className="respnavb">
              {(() => {
                if (this.state.module.includes('Dashboard')) {
                  return (
                    <li className="respbarli" onClick={this.onClose.bind(this)}>
                      <NavLink to="/instantPayMerchant/dashboard">
                        <img src={dashboard} alt="icon missing" />
                        <span className="ml-2 sidbarspan"> Dashboard</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Transaction History')) {
                  return (
                    <li className="respbarli" onClick={this.onClose.bind(this)}>
                      <NavLink to="/instantPayMerchant/transaction-history">
                        <img src={user} alt="icon missing" />
                        <span className="ml-2 sidbarspan">Transaction History</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Subscription')) {
                  return (
                    <li className="respbarli" onClick={this.onClose.bind(this)}>
                      <NavLink to="/instantPayMerchant/merchantSubscription">
                        <img src={merchant} alt="icon missing" />
                        <span className="ml-2 sidbarspan">Subscription</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
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
        </div>
        {/* Modal User */}
        <Modal
          open={this.state.user}
          onClose={this.handleUserClose.bind(this)}
          modalId="HeaderUserModal"
          overlayId="overlay"
        >
          <div className="mainuser">
            <div className="usericon">
              <img src={this.state.userPic ? this.state.userPic : Bluser} alt="UserIcon" />
            </div>
            <div className="usertext">
              <label>
                {this.state.userName}
                <Link onClick={() => { window.location.href = "/instantPayMerchant/merchantProfile" }}>
                  <img src={Edit} alt="Edit" />
                </Link>
              </label>
              <label>{this.state.userEmail}</label>
            </div>
            <div className="Logout">
              <button className="btn" onClick={this.handleLogout.bind(this)}>
                Logout
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
