import React, { Component } from "react";
import Bluser from "./../../../assets/Images/BlUser.png";
import Camera from "./../../../assets/Images/camera.png";
import WhCloseIcon from "./../../../assets/Images/WhiteCancel.png";
import { Link } from "react-router-dom";
import { authHeader } from "../helpers/splitAuthHeader";
import axios from "axios";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class SplitAdminProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userMobileNo: "",
      userEmail: "",
      userPic: "",
      newUserPic: "",
      loading: false,
    };
    this.handleUserInfo = this.handleUserInfo.bind(this);
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
    this.handleRemoveProfile = this.handleRemoveProfile.bind(this);
  }
  componentDidMount() {
    if (document.getElementById("splitEndCustomerMmt")) {
      document.getElementById("splitEndCustomerMmt").classList.remove("active");
      document.getElementById("splitMerchantMmt").classList.remove("active");
    }
    this.handleUserInfo();
  }

  handleRemoveProfile = () => {
    this.setState({
      userPic: "",
    });
  };

  handleUserInfo = () => {
    var self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayDashboard/getuserprofiledetail",
      headers: authHeader(),
    })
      .then(function (res) {
        
        let msg = res.data.message;
        let data = res.data.responseData[0];
        if (msg === "Success") {
          self.setState({
            userName: data.firstName,
            userMobileNo: data.mobileNo,
            userEmail: data.emailId,
            userPic: data.profilePicture,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleUpdateUserInfo = () => {
    
    if (this.state.userName) {
      var self = this;
      var json = {
        firstName: this.state.userName,
      };
      const formData = new FormData();

      let fileData = this.state.newUserPic
        ? this.state.newUserPic[0]
        : this.state.userPic;

      formData.append("updateProfiledetails", JSON.stringify(json));
      formData.append("FileData", fileData);
      self.setState({
        loading: true,
      });

      axios({
        method: "put",
        url: config.apiUrl + "OnePayDashboard/UpdateProfileDetails",
        headers: authHeader(),
        data: formData,
      })
        .then(function (res) {
          
          let msg = res.data.message;
          let userPic = res.data.responseData.profilePath;
          if (msg === "Success") {
            NotificationManager.success("Profile updated successfully.");
            // window.location.reload();
            self.setState({
              loading: false,
            });
            if (userPic) {
              self.setState({
                userPic,
              });
            } else {
              self.setState({
                userPic: "",
              });
            }
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loading: false,
          });
        });
    } else {
      NotificationManager.error("Name cannot be empty.");
    }
  };

  /// handle input onchange
  handleInputOnchange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileUpload(e) {
    
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      newUserPic: allFiles,
    });
  }

  render() {
    return (
      <div className="mainprofile">
        <h3>Personal Information</h3>
        <div className="profile">
          <div className="row m-0">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 prof">
              <div className="card">
                <div className="upload">
                  <div className="closeicon" onClick={this.handleRemoveProfile}>
                    <img src={WhCloseIcon} alt="CloseIcon" />
                  </div>
                  <div className="profileimg">
                    <img
                      src={this.state.userPic ? this.state.userPic : Bluser}
                      alt="UserImg"
                    />
                  </div>
                  <input
                    type="file"
                    className="d-none"
                    id="img-upload"
                    onChange={this.fileUpload.bind(this)}
                  />
                  <label className="uploadicon" htmlFor="img-upload">
                    <img src={Camera} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Upload Image" />
                  </label>
                </div>
                <div className="formdata">
                  <div className="row m-0">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                      <label>Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleInputOnchange}
                      />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                      <label>Mobile No.</label>
                      <input
                        type="text"
                        placeholder="Mobile No."
                        name="userMobileNo"
                        value={this.state.userMobileNo}
                        disabled
                        onChange={this.handleInputOnchange}
                      />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                      <label>Email ID</label>
                      <input
                        type="text"
                        placeholder="Email ID"
                        name="userEmail"
                        value={this.state.userEmail}
                        disabled
                        onChange={this.handleInputOnchange}
                      />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                      <div className="save">
                        <button
                          type="button"
                          className="btn"
                          onClick={this.handleUpdateUserInfo}
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
                          Save
                        </button>
                        <Link
                          to={{
                            pathname: "/onePayAdminChangePassword",
                            state: { cameFrom: "Admin" },
                          }}
                        >
                          <p>Change Password</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SplitAdminProfile;
