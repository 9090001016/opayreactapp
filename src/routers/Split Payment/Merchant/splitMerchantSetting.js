import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RolesPermission from "./../../../assets/Images/Roles-and-Premissions.png";
import InstantPayUser from "./../../../assets/Images/Instant-Pay-User-Management.png";

class splitMerchantSetting extends Component {
  render() {
    return (
      <div className="adminsetting">
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
    )
  }
}

export default splitMerchantSetting
