import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RolesPermission from "./../../assets/Images/Roles-and-Premissions.png";
import InstantPayUser from "./../../assets/Images/Instant-Pay-User-Management.png";

class merchantSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Module: "",
      subModule: ""
    };
  }
  componentDidMount() {
    // if(document.getElementById("endCustomerMmt")){
    // document.getElementById("endCustomerMmt").classList.remove("active");
    // document.getElementById("merchantMmt").classList.remove("active");
    // }
    // var Module = window.localStorage.getItem("Module");
    var subModule = window.localStorage.getItem("InstantPayMerchantSubModule");
    this.setState({
      // Module,
      subModule
    })
  }

  render() {
    return (
      <div className="adminsetting">
        <h3 className="Usermana">Merchant Settings</h3>
        <div className="setting">
          <div className="row mt-4">
            {/* {(() => {
              if (this.state.subModule.includes('Roles and Permission')) {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayMerchant/rolespermission">
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
            })()} */}
            {(() => {
              if (this.state.subModule.includes('Merchant User Management')) {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <Link to="/instantPayMerchant/merchantusermanagement">
                      <div className="card">
                        <div className="totalmain">
                          <div className="total">
                            <img src={InstantPayUser} className="Content" />
                          </div>
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
                )
              }
            })()}
          </div>
        </div>
      </div>
    )
  }
}

export default merchantSetting
