import React, { Component } from "react";
import config from "../../../helpers/config";
import { authHeader } from "../helpers/splitAuthHeader";
import TotalUsers from "./../../../assets/Images/TotalUsers.png";
import TotalMerchants from "./../../../assets/Images/TotalMerchants.png";
import TotalTransactions from "./../../../assets/Images/TotalTransactions.png";
import TotalTransactionsAmt from "./../../../assets/Images/TotalTransactionsAmt.png";
import axios from "axios"
import { NavLink } from "react-router-dom";
import dashboard from "./../../../assets/Images/dashboard.png";
import merchant from "./../../../assets/Images/merchant.png";
import user from "./../../../assets/Images/user.png";
import dashboardSVG from "./../../../assets/Images/dashboard2.svg";
import auccessfultransactions from "./../../../assets/Images/smallicons/success_img.png";
import moneytransfer from "./../../../assets/Images/smallicons/total_spent_img.png";

class SplitAdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUsers: 0,
      totalMerchants: 0,
      totalTransactions: 0,
      totalTransactionAmounts: 0,
      module: ""
    };
  }

  componentDidMount() {
    var module = window.localStorage.getItem("OnePayAdminModule") == null ? "" :
      window.localStorage.getItem("OnePayAdminModule");
    if (document.getElementById("splitEndCustomerMmt")) {
      document.getElementById("splitEndCustomerMmt").classList.remove("active");
      document.getElementById("splitMerchantMmt").classList.remove("active");
      document.getElementById("splitMerchantSett").classList.remove("active");
    }
    this.handleGetDashboardData();
    this.setState({
      module
    })
  }

  handleGetDashboardData() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayDashboard/DashboardCards",
      headers: authHeader()
    }).then(function (res) {

      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({
          totalUsers: data.totalUsers,
          totalMerchants: data.totalMerchants,
          totalTransactions: data.totalTransaction,
          totalTransactionAmounts: data.totalTransactionAmount
        });
      } else {
        self.setState({
          totalUsers: 0,
          totalMerchants: 0,
          totalTransactions: 0,
          totalTransactionAmounts: 0
        });
      }
    })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <div className="blue_line">
        </div>
        <div className="dashboard setting_dashboard">
          <div className="dash_link">
            <ul className="header-left">
              {(() => {
                if (this.state.module.includes('Dashboard')) {
                  return (
                    <li>
                      <NavLink to="/onePayAdmin/dashboard">
                        {/* <div className="header-icons">
                          <img src={dashboardSVG} alt="icon missing" />
                        </div> */}
                        <span className="ml-2">Dashboard</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('End Customer Management')) {
                  return (
                    <li>
                      <NavLink to="/onePayAdmin/adminUserManagement" id="splitEndCustomerMmt">
                        {/* <div className="header-icons">
                          <img src={user} alt="icon missing" />
                        </div> */}
                        <span className="ml-2">End Customer Management</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Merchants Management')) {
                  return (
                    <li>
                      <NavLink to="/onePayAdmin/adminMerchantManagement" id="splitMerchantMmt">
                        {/* <div className="header-icons">
                          <img src={merchant} alt="icon missing" />
                        </div> */}
                        <span className="ml-2">Merchant Management</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Settings')) {
                  return (
                    <li>
                      <NavLink to="/onePayAdmin/adminSetting" id="splitMerchantSett">
                        {/* <div className="header-icons">
                          <img src={merchant} alt="icon missing" />
                        </div> */}
                        <span className="ml-2">Admin Settings</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
            </ul>

          </div>
          <div className="transaction_details">
            <h3 className="dash">Dashboard</h3>
            <div className="row mt-4">
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 hover_card">
                <NavLink to="/onePayAdmin/adminUserManagement">
                  <div className="card bac1">
                    <div className="image">
                      <img src={TotalUsers} alt="Card1" />
                    </div>
                    <div className="text">
                      <label>Total Active End Customer</label>
                    </div>
                  </div>
                  <div className="card_value1">
                    <label>{this.state.totalUsers}</label>
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 hover_card">
                <NavLink to="/onePayAdmin/adminMerchantManagement">
                  <div className="card bac2">
                    <div className="image">
                      <img src={TotalMerchants} alt="Card1" />
                    </div>
                    <div className="text">
                      <label>Total Active Merchant</label>
                    </div>
                  </div>
                  <div className="card_value2">
                    <label>{this.state.totalMerchants}</label>
                  </div>
                </NavLink>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 hover_card">
                <NavLink to="/onePayAdmin/paymentManagement">
                  <div className="card bac3">
                    <div >
                    <img src={auccessfultransactions} alt="Card1" />
                    </div>
                    <div className="text">
                      <label>Total Success Transaction</label>
                    </div>
                  </div>
                  <div className="card_value3">
                    <label>{this.state.totalTransactions}</label>

                  </div>


                </NavLink>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3 hover_card">
                <NavLink to="/onePayAdmin/paymentManagement">
                  <div className="card bac4">
                  <div>
                    <img src={moneytransfer} alt="Card1" />
                  </div>
                    <div className="text">
                      <label>Total Success Amount Transaction (AU$)</label>

                    </div>
                  </div>
                  <div className="card_value4">
                    <label>{this.state.totalTransactionAmounts}</label>

                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SplitAdminDashboard;
