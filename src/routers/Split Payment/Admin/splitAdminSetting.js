import React, { Component } from "react";
import { Link } from "react-router-dom";
import SplitPayment from "./../../../assets/Images/Split-Payment-Management.png";
import PaymentManagement from "./../../../assets/Images/Payment-Management.png";
import SubscriptionManagement from "./../../../assets/Images/Subscription-Management.png";
import AlertTempManagement from "./../../../assets/Images/Alert-Template-Management.png";
import ContentManagement from "./../../../assets/Images/Content-Management.png";
import RolesPermission from "./../../../assets/Images/Roles-and-Premissions.png";
import InstantPayUser from "./../../../assets/Images/Instant-Pay-User-Management.png";
import { NavLink } from "react-router-dom";

class splitAdminSetting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      module: "",
      subModule: ""
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
    // var Module = window.localStorage.getItem("Module");
    var subModule = window.localStorage.getItem("OnePayAdminSubModule");
    this.setState({
      module,
      subModule
    })
  }

  render() {
    return (
      <div>
        <div className="blue_line">
        </div>
        <div className="adminsetting setting_dashboard">
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
          
          <div className="transaction_details1">
            <h3 className="Usermana">Admin Settings</h3>
            <div className="setting">
              <div className="row mt-4">
                {(() => {
                  if (this.state.subModule.includes('Split Payment Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/splitPaymentManagement">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={SplitPayment} className="Content" />
                              </div> */}
                              <label>Split Payment Management</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
                {(() => {
                  if (this.state.subModule.includes('Transaction Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/paymentManagement">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={PaymentManagement} className="Content" />
                              </div> */}
                              <label>Transaction Management</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
                {(() => {
                  if (this.state.subModule.includes('Subscription Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/subscriptionManagement">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={SubscriptionManagement} className="Content" />
                              </div> */}
                              <label>Subscription Management</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
                {(() => {
                  if (this.state.subModule.includes('Alert Template Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/alertTemplateManagement">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={AlertTempManagement} className="Content" />
                              </div> */}
                              <label>Alert Template Management</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
                {(() => {
                  if (this.state.subModule.includes('Roles and Permission Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/rolesPermission">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={RolesPermission} className="Content" />
                              </div> */}
                              <label>Roles & Permissions</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
                {(() => {
                  if (this.state.subModule.includes('Instant Pay User Management')) {
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <Link to="/onePayAdmin/instantPayUserManagement">
                          <div className="card">
                            <div className="totalmain">
                              {/* <div className="total">
                                <img src={InstantPayUser} className="Content" />
                              </div> */}
                              <label>One Pay User Management</label>
                            </div>
                            <p>
                              Lorem Ipsum has been the industry's standard dummy text ever
                              since the 1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })()}
              </div>
              <div className="row mb-4">
                {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
            <Link to="/admin/contentManagement">
              <div className="card">
                <div className="totalmain">
                  <div className="total">
                    <img src={ContentManagement} className="Content" />
                  </div>
                  <label>Content Management</label>
                </div>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
              </Link>
            </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default splitAdminSetting;
