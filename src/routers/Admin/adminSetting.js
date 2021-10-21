import React, { Component } from "react";
import { Link } from "react-router-dom";
import SplitPayment from "./../../assets/Images/Split-Payment-Management.png";
import PaymentManagement from "./../../assets/Images/Payment-Management.png";
import SubscriptionManagement from "./../../assets/Images/Subscription-Management.png";
import AlertTempManagement from "./../../assets/Images/Alert-Template-Management.png";
import ContentManagement from "./../../assets/Images/Content-Management.png";
import RolesPermission from "./../../assets/Images/Roles-and-Premissions.png";
import InstantPayUser from "./../../assets/Images/Instant-Pay-User-Management.png";

class adminSetting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Module: "",
      subModule: ""
    };
  }
  componentDidMount() {
    if(document.getElementById("endCustomerMmt")){
    document.getElementById("endCustomerMmt").classList.remove("active");
    document.getElementById("merchantMmt").classList.remove("active");
    }
    // var Module = window.localStorage.getItem("Module");
    var subModule = window.localStorage.getItem("InstantPayAdminSubModule");
    this.setState({
      // Module,
      subModule
    })
  }

  render() {
    return (
      <div className="adminsetting">
        <h3 className="Usermana">Admin Settings</h3>
        <div className="setting">
          <div className="row mt-4">
            {/* {(() => {
              if (this.state.subModule.includes('Split Payment Management')) {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/splitPaymentManagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={SplitPayment} className="Content" />
                          </div>
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
            })()} */}
            {(() => {
              if (this.state.subModule.includes('Transaction Management')) {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/paymentManagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={PaymentManagement} className="Content" />
                          </div>
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
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/subscriptionManagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={SubscriptionManagement} className="Content" />
                          </div>
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
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/alertTemplateManagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={AlertTempManagement} className="Content" />
                          </div>
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
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/rolesPermission">
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

            {(() => {
              if (this.state.subModule.includes('Instant Pay User Management')) {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayAdmin/instantPayUserManagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={InstantPayUser} className="Content" />
                          </div>
                          <label>Instant Pay User Management</label>
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
        </div>
      </div>
    );
  }
}

export default adminSetting;
