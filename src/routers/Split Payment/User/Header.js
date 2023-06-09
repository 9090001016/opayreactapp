import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import dashboard from "./../../../assets/Images/dashboard.png";
import merchant from "./../../../assets/Images/merchant.png";
import user from "./../../../assets/Images/user.png";
import notification from "./../../../assets/Images/notification.png";
import profile from "./../../../assets/Images/profile.jpg";
import Edit from "./../../../assets/Images/edit.png";
import Modal from "react-responsive-modal";
import Bluser from "./../../../assets/Images/BlUser.png";
import axios from "axios";
import config from "./../../../helpers/config";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { Drawer, Button, Space } from "antd";
import menu from "./../../../assets/Images/menu.png";
import logoutwhite from "./../../../assets/Images/logoutwhite.png";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";
import mainLogo from './../../../assets/Images/smallicons/main_logo.png'
import notifyimg from './../../../assets/Images/smallicons/notify.png'

const cookies = new Cookies();

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      notificationCount: 0,
      visible: false,
      placement: "left",
    };
  }

  componentDidMount() {
    this.handleGetNotificationsCount();
    this.handleGetNotificationsCount();
    this.handleUserInfo();
  }
  

  handleGetNotificationsCount() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayUserDashboard/CustomerNotificationCount",
      headers: userAuthHeader(),
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

  handleUserInfo = () => {
    var self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayUser/getuserprofile",
      headers: userAuthHeader(),
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

  handleLogout() {
    axios({
      method: "get",
      url: config.apiUrl + "OnePayUserAccount/logout",
      headers: userAuthHeader(),
    })
      .then(function (res) {

        if (res.status) {
          cookies.remove("onepayusertoken");
          window.localStorage.removeItem('onepayusertoken');
          window.location.href = "/customer";
        } else {
          NotificationManager.error("Not able to logout.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const { placement, visible } = this.state;
    return (
      <div className="header">
        {/* <NavLink to="/"> */}
        <img src={mainLogo} className="onepay__logo" />
        {/* </NavLink> */}
        {/* <h1 className="header-logo">ONE PAY</h1> */}
        <div className="header-nav">
          {/* <ul className="header-left">
            <li>
              <NavLink to="/onePayUser/userDashboard">
                <div className="header-icons">
                  <img src={dashboard} alt="icon missing" />
                </div>
                <span className="ml-2">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/onePayUser/userTransaction">
                <div className="header-icons">
                  <img src={user} alt="icon missing" />
                </div>
                <span className="ml-2">Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/onePayUser/paymentDetail">
                <div className="header-icons">
                  <img src={merchant} alt="icon missing" />
                </div>
                <span className="ml-2">Payment Details</span>
              </NavLink>
            </li>
          </ul> */}
          <div className="header-right">
            <ul className="d-flex">
              <li className="header-icons">
                <Link
                  to="/onePayUser/userNotification"
                  className="position-relative"
                  onClick={this.handleGetNotificationsCount}
                >
                  <img src={notifyimg} alt="icon missing" />
                  {this.state.notificationCount !== 0 && (
                    <span className="notification-count">
                      {this.state.notificationCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
            <div className="user-profile">
              <div
                className="profile-img"
                onClick={this.handleUserOpen.bind(this)}
              >
                <img
                  // src={profile}
                  src={this.state.userPic}
                  alt="img missing"
                />
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
              <Link to="/onePayUser/userNotification" className="position-relative">
                <img src={notifyimg} alt="icon missing" />
                {this.state.notificationCount !== 0 && (
                  <span className="notification-count">
                    {this.state.notificationCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="header-icons">
              <Link to="/onePayUser/userProfile">
                <img className="profilerep" src={this.state.userPic} alt="profile" />
              </Link>
            </li>
          </ul>
          <Drawer
            title={<img src={OnePayLogo} className="onepay__logo" />}
            placement={placement}
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <ul className="respnavb">
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayUser/userDashboard">
                  <img src={dashboard} alt="icon missing" />
                  <span className="ml-2 sidbarspan">Dashboard</span>
                </NavLink>
              </li>
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayUser/userTransaction">
                  <img src={user} alt="icon missing" />
                  <span className="ml-2 sidbarspan">Transactions</span>
                </NavLink>
              </li>
              <li className="respbarli" onClick={this.onClose.bind(this)}>
                <NavLink to="/onePayUser/paymentDetail">
                  <img src={merchant} alt="icon missing" />
                  <span className="ml-2 sidbarspan">Payment Details</span>
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
              <img
                src={this.state.userPic}
                alt="UserIcon"
              />
            </div>
            <div className="usertext">
              <label>
                {this.state.userName}
                <Link onClick={() => { window.location.href = "/onePayUser/userProfile" }}>
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
