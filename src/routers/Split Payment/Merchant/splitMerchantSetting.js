import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RolesPermission from "./../../../assets/Images/Roles-and-Premissions.png";
import InstantPayUser from "./../../../assets/Images/Instant-Pay-User-Management.png";
import { NavLink } from 'react-router-dom';

class splitMerchantSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: "",
      mobileView:false
    }
  }
  componentDidMount(){
    var module = window.localStorage.getItem("OnePayMerchantModule");
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
        module
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
  }
  render() {
    return (
      <div>
        <div className="blue_line">
        </div>
        <div className="adminsetting">
          <div className="dash_link">
            <ul className="header-left">
              {(() => {
                if (this.state.module.includes('Dashboard')) {
                  return (
                    <li>
                      <NavLink to="/onePayMerchant/dashboard">
                        {/* <div className="header-icons">
                          <img src={dashboard} alt="icon missing" />
                        </div> */}
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
                      <NavLink to="/onePayMerchant/transaction-history">
                        {/* <div className="header-icons">
                          <img src={user} alt="icon missing" />
                        </div> */}
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
                      <NavLink to="/onePayMerchant/merchantSubscription">
                        {/* <div className="header-icons">
                          <img src={merchant} alt="icon missing" />
                        </div> */}
                        <span className="ml-2">Subscription</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Settings')) {
                  return (
                    <li>
                      <NavLink to="/onePayMerchant/merchantSetting" id="splitMerchantSett">
                        <span className="ml-2">Settings</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
            </ul>
          </div>
          <h3 className="Usermana merchant_menu">Merchant Settings</h3>
          <div className="setting">
            <div className="row mt-4">
              {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3"> */}
              {/* <Link to="/onePayMerchant/rolespermission">
                <div className="card">
                  <div className="totalmain">
                    <div className="total">
                      <img src={RolesPermission} className="Content" />
                    </div>
                    <label>Roles & Permissions</label>
                  </div>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.
                  </p>
                </div>
              </Link> */}
              {/* </div> */}
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <Link to="/onePayMerchant/merchantusermanagement">
                  <div className="card">
                    <div className="totalmain">
                      {/* <div className="total">
                      <img src={InstantPayUser} className="Content" />
                    </div> */}
                      <label>Merchant User Management</label>
                    </div>
                    <p>
                      Lorem Ipsum has been the industry's standard dummy text ever
                      since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default splitMerchantSetting
