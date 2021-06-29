import React, { Component } from "react";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import TotalUsers from "./../../assets/Images/TotalUsers.png";
import TotalMerchants from "./../../assets/Images/TotalMerchants.png";
import TotalTransactions from "./../../assets/Images/TotalTransactions.png";
import TotalTransactionsAmt from "./../../assets/Images/TotalTransactionsAmt.png";
import axios from "axios"
import { NavLink } from "react-router-dom";

class adminDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalUsers: 0,
      totalMerchants: 0,
      totalTransactions: 0,
      totalTransactionAmounts: 0
    };
  }

  componentDidMount() {
    
    if (document.getElementById("endCustomerMmt")) {
      document.getElementById("endCustomerMmt").classList.remove("active");
      document.getElementById("merchantMmt").classList.remove("active");
    }
    this.handleGetDashboardData();
  }

  handleGetDashboardData() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "Dashboard/DashboardCards",
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
        <div className="dashboard">
          <h3 className="dash">Dashboard</h3>
          <div className="row mt-4">

            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/instantPayAdmin/adminUserManagement">
                <div className="card back1">
                  <div className="image">
                    <img src={TotalUsers} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Active End Customer</label>
                    <label>{this.state.totalUsers}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/instantPayAdmin/adminMerchantManagement">
                <div className="card back2">
                  <div className="image">
                    <img src={TotalMerchants} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Active Merchant</label>
                    <label>{this.state.totalMerchants}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/instantPayAdmin/paymentManagement">
                <div className="card back3">
                  <div className="image">
                    <img src={TotalTransactions} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Success Transaction</label>
                    <label>{this.state.totalTransactions}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/instantPayAdmin/paymentManagement">
                <div className="card back4">
                  <div className="image">
                    <img src={TotalTransactionsAmt} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Success Amount Transaction (AU$)</label>
                    <label>{this.state.totalTransactionAmounts}</label>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default adminDashboard;
