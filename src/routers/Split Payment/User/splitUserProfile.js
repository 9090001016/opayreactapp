import React, { Component } from "react";
import Bluser from "./../../../assets/Images/bluser2.png";
import Camera from "./../../../assets/Images/camera.png";
import WhCloseIcon from "./../../../assets/Images/WhiteCancel.png";
import { Link } from "react-router-dom";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import countryList from 'react-select-country-list';
import BackBtn from './../../Split Payment/Setting/Admin/BackBtn.js';



class splitUserProfile extends Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData()

    this.state = {
      userName: "",
      userMobileNo: "",
      userEmail: "",
      country: "",
      address1: "",
      address2: "",
      suburb: "",
      state: "",
      postCode: "",
      userPic: "",
      newUserPic: "",
      src: false,
      changePreview: false,
      loading: false,
      reloading: false,
      show: false,
      options: this.options,
      updated: false,
      value: {
        value: "Australia",
        label: "Australia"
      },
    };
    this.handleUserInfo = this.handleUserInfo.bind(this);
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this);
    this.handleRemoveProfile = this.handleRemoveProfile.bind(this);
  }

  componentDidMount() {
    this.handleUserInfo();
    console.log("ssssssssssssssss", Bluser)
  }
  componentDidUpdate() {
    if (this.state.reloading) {
      // window.location.reload();
      this.handleUserInfo()
    }
  }
  // componentDidUpdate(){
  //   if(this.state.userPic === ""){
  //     this.handleUpdateUserInfo();
  //   }
  // }



  handleUserInfo = () => {
    var self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayUser/GetUserProfile",
      headers: userAuthHeader(),
    })
      .then(function (res) {

        let msg = res.data.message;
        let data = res.data.responseData[0];
        if (msg === "Success") {
          self.setState({
            userName: data.firstName,
            userMobileNo: data.mobileNo,
            userEmail: data.emailId,
            country: data.country,
            userPic: data.profilePicture,
            postCode: data.pincode,
            address1: data.address1,
            address2: data.address2,
            state: data.state,
            suburb: data.suburb
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleInputOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleUpdateUserInfo = () => {

    if (this.state.userName) {
      var self = this;
      var tempprofilePicture = ""
      if (this.state.userPic) {
        var s = this.state.userPic.split("/");
        if (s.length > 0) {
          tempprofilePicture = s[s.length - 1]
        } else {
          tempprofilePicture = s[s.length - 1];
        }
      }
      var json = {
        firstName: this.state.userName,
        mobileNo: this.state.userMobileNo,
        emailId: this.state.userEmail,
        pincode: this.state.postCode,
        address1: this.state.address1,
        address2: this.state.address2,
        state: this.state.state,
        suburb: this.state.suburb,
        country: this.state.country,
        profilePicture: tempprofilePicture
      };
      const formData = new FormData();

      formData.append("updateProfiledetails", JSON.stringify(json));
      formData.append("FileData", this.state.newUserPic[0]);
      self.setState({
        loading: true,
      });

      axios({
        method: "put",
        url: config.apiUrl + "OnePayUser/UpdateUserProfileDetails",
        headers: userAuthHeader(),
        data: formData,
      })
        .then(function (res) {

          let msg = res.data.message;
          let userPic = res.data.responseData.profilePath;
          if (msg === "Success") {
            NotificationManager.success("Profile updated successfully.");
            self.setState({
              loading: false,
              reloading: true,
            });
            // if (userPic) {
            //   self.setState({
            //     userPic,
            //   });
            // }
            self.handleUserInfo();
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loading: false,
            reloading: false
          });
        });
    } else {
      NotificationManager.error("Name cannot be empty.");
    }
  };

  fileUpload(e) {

    var allFiles = [];
    var selectedFiles = e.target.files;
    var changePreview = e.target.files[0];
    var src = URL.createObjectURL(changePreview);
    allFiles.push(selectedFiles[0]);
    if (this.state.userPic) {
      this.setState({
        newUserPic: allFiles,
        src: src,
        show: true
      })
    }
  }

  handleRemoveProfile = () => {
    this.setState({
      userPic: "",
      newUserPic: ""
    });
  };

  render() {
    return (
      <div>
        <BackBtn />
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
                      {this.state.show ?
                        <img src={this.state.src} alt="new_user_pic" />
                        : this.state.userPic === "" ?
                          <img src={Bluser} alt="avatar_img" />
                          :
                          <img
                            src={this.state.userPic}
                            alt="UserImg"
                          />
                      }
                    </div>
                    <input
                      type="file"
                      className="d-none"
                      id="img-upload"
                      onChange={this.fileUpload.bind(this)}
                    />
                    <label className="uploadicon" htmlFor="img-upload">
                      <img src={Camera} />
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
                          onChange={this.handleInputOnchange}
                        />
                      </div>
                    </div>

                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>Country</label>
                        <select
                          name="country"
                          value={this.state.country}
                          onChange={this.handleInputOnchange}
                        >
                          <option>Select Country</option>
                          {this.state.options.map((option, index) => {
                            return (
                              <option key={index} value={option.label}>
                                {option.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>Address 1</label>
                        <input
                          type="text"
                          placeholder="Address 1"
                          name="address1"
                          value={this.state.address1}
                          onChange={this.handleInputOnchange}
                        />
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>Address 2</label>
                        <input
                          type="text"
                          placeholder="Address 2"
                          name="address2"
                          value={this.state.address2}
                          onChange={this.handleInputOnchange}
                        />
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>Suburb</label>
                        <input
                          type="text"
                          placeholder="Suburb"
                          name="suburb"
                          value={this.state.suburb}
                          onChange={this.handleInputOnchange}
                        />
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>State</label>

                        {this.state.country == "Australia" ? (
                          <select
                            name="state"
                            value={this.state.state}
                            onChange={this.handleInputOnchange}
                          >
                            <option value={0}>Select State</option>
                            <option value={"NSW"}>NSW</option>
                            <option value={"ACT"}>ACT</option>
                            <option value={"VIC"}>VIC</option>
                            <option value={"SA"}>SA</option>
                            <option value={"NT"}>NT</option>
                            <option value={"TAS"}>TAS</option>
                            <option value={"QLD"}>QLD</option>
                            <option value={"WA"}>WA</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            placeholder="State *"
                            name="state"
                            value={this.state.state}
                            onChange={this.handleInputOnchange.bind(this)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8 mx-auto">
                        <label>PostCode</label>
                        <input
                          type="text"
                          placeholder="PostCode"
                          name="postCode"
                          value={this.state.postCode}
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
                              pathname: "/instantPayUserChangePassword",
                              state: { cameFrom: "User" },
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
      </div>

    );
  }
}

export default splitUserProfile;
