import React, { Component } from "react";
import CSV from "./../../../../assets/Images/smallicons/Exportcsv.png";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import RedDelete from "./../../../../assets/Images/smallicons/redDelete.png";
import BlueEdit from "./../../../../assets/Images/editt.png";
import CloseIcon from "./../../../../assets/Images/CloseWhBold.png";
import { Table, Popover, Spin } from "antd";
import Modal from "react-responsive-modal";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import { NotificationManager } from "react-notifications";
import { CSVLink } from "react-csv";
import Down from "./../../../../assets/Images/download.png";
import PhoneInput from 'react-phone-input-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "./BackBtn";

class splitInstantPayUserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addInstantPay: false,
      editInstantPay: false,
      instantPayUserData: [],
      roles: [],
      userId: "",
      userInfo: {
        name: "",
        emailId: "",
        contactNo: "",
        role: "",
        status: false,
      },
      validEmail: false,
      validNo: false,
      touched: false,
      instantPayUserCSVData: [],
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      loadingAddEdit: false,
      searchBy: "",
      visible: {}
    };
  }

  componentDidMount() {
    this.handleGetInstantPayUserList("");
    this.handleGetRolesList();
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
  }

  handleGetRolesList() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePaySettings/GetRolesList",
      headers: authHeader(),
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            roles: data,
          });
        } else {
          self.setState({
            roles: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleInstantPayUserSearch(e) {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetInstantPayUserList(e.target.value, pagination);
  }

  handleGetInstantPayUserList(search, pagination, sorter) {

    let self = this;
    var instantPayUserData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true,
      searchBy: search
    });
    axios({
      method: "post",
      url: config.apiUrl + "OnePayInstantPayUser/InstantPayUserList",
      headers: authHeader(),
      data: {
        searchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "userId") : "userId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          paging.total = parseInt(data[0].totalRowCount);
          data.map((item, i) =>
            instantPayUserData.push({
              userId: item.userId,
              firstName: item.firstName,
              emailId: item.emailId,
              contactNumber: "+" + item.contactNumber,
              roleId: item.roleId,
              roleName: item.roleName,
              createBy: item.createBy,
              createDate: item.createDate,
              updateBy: item.updateBy,
              updateDate: item.updateDate,
              isActive: item.isActive === true ? "Active" : "InActive",
            })
          );
          self.setState({
            instantPayUserData,
            loading: false,
            pagination: paging
          });
        } else {
          self.setState({
            instantPayUserData: [],
            loading: false,
            pagination: paging
          });
        }
        self.handleGetInstantPayUserCSV(search, pagination, sorter);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  // handleGetInstantPayUserCSV() {
  //   
  //   let self = this;
  //   var instantPayUserCSVData = [];
  //   axios({
  //     method: "get",
  //     url: config.apiUrl + "OnePayInstantPayUser/instantpayuserexportexcel",
  //     headers: authHeader()
  //   })
  //     .then(function (res) {
  //       
  //       let status = res.data.message;
  //       let data = res.data.responseData;
  //       if (status === "Success") {
  //         data.map((item, i) =>
  //           instantPayUserCSVData.push({
  //             userId: item.userId,
  //             firstName: item.firstName,
  //             emailId: item.emailId,
  //             contactNumber: "+" + item.contactNumber,
  //             roleId: item.roleId,
  //             roleName: item.roleName,
  //             createBy: item.createBy,
  //             createDate: item.createDate,
  //             updateBy: item.updateBy,
  //             updateDate: item.updateDate,
  //             isActive: item.isActive === true ? "Active" : "InActive",
  //           })
  //         );
  //         self.setState({
  //           instantPayUserCSVData
  //         });
  //       } else {
  //         self.setState({
  //           instantPayUserCSVData: []
  //         });
  //       }
  //     })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  handleGetInstantPayUserCSV(search, pagination, sorter) {

    let self = this;
    var instantPayUserCSVData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayInstantPayUser/InstantPayUserList",
      headers: authHeader(),
      data: {
        searchBy: search,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "userId") : "userId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          data.map((item, i) =>
            instantPayUserCSVData.push({
              userId: item.userId,
              firstName: item.firstName,
              emailId: item.emailId,
              contactNumber: "+" + item.contactNumber,
              roleId: item.roleId,
              roleName: item.roleName,
              createBy: item.createBy,
              createDate: item.createDate,
              updateBy: item.updateBy,
              updateDate: item.updateDate,
              isActive: item.isActive === true ? "Active" : "InActive",
            })
          );
          self.setState({
            instantPayUserCSVData
          });
        } else {
          self.setState({
            instantPayUserCSVData: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAddInstantPayUser() {
    let self = this;

    this.setState({
      loadingAddEdit: true,
    });
    let headers = authHeader();
    // let domain = "http://localhost:3000";
    // let domain = "https://k2ui.dcdev.brainvire.net";
    let domain = "https://instant-dev-webapp.azurewebsites.net";
    headers["X-Authorized-Domainname"] = domain;

    const { name, emailId, contactNo, role } = this.state.userInfo;

    if (!this.state.touched)
      this.setState({
        touched: true,
      });

    if (
      !(
        name &&
        emailId &&
        contactNo &&
        role &&
        !this.state.validEmail &&
        !this.state.validNo
      )
    )
      return;

    axios({
      method: "post",
      url: config.apiUrl + "OnePayInstantPayUser/CreateUser",
      headers,
      data: {
        FirstName: this.state.userInfo.name,
        LastName: "",
        ContactNumber: this.state.userInfo.contactNo,
        EmailId: this.state.userInfo.emailId,
        RoleId: parseInt(this.state.userInfo.role),
        IsActive: this.state.userInfo.status,
      },
    })
      .then(function (res) {

        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("User created successfully.");
          self.handleGetInstantPayUserList("");
          self.setState({
            addInstantPay: false,
            userInfo: {
              name: "",
              emailId: "",
              contactNo: "",
              role: "",
              status: false,
            },
            loadingAddEdit: false
          });
        } else {
          NotificationManager.error(status);
          self.setState({
            loadingAddEdit: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleEditInstantPayUser() {
    let self = this;


    const { name, emailId, contactNo, role } = this.state.userInfo;

    if (
      !(
        name &&
        emailId &&
        contactNo &&
        role &&
        !this.state.validEmail &&
        !this.state.validNo
      )
    )
      return;

    axios({
      method: "put",
      url: config.apiUrl + "OnePayInstantPayUser/UpdateUser",
      headers: authHeader(),
      data: {
        UserId: this.state.userId,
        FirstName: this.state.userInfo.name,
        LastName: "",
        ContactNumber: this.state.userInfo.contactNo,
        EmailId: this.state.userInfo.emailId,
        RoleId: parseInt(this.state.userInfo.role),
        IsActive: this.state.userInfo.status,
      },
    })
      .then(function (res) {

        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("User updated successfully.");
          self.handleGetInstantPayUserList("");
          self.handleeditInstantPayClose();
        } else {
          NotificationManager.error(status);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDeleteInstantPayUser(userid) {
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "OnePayInstantPayUser/DeactivateUser",
      headers: authHeader(),
      params: {
        userid,
      },
    })
      .then(function (res) {

        let status = res.data.message;
        // if (status === "Success") {
        NotificationManager.success(status);
        self.hide(
          this,
          "user" + userid
        )
        self.handleGetInstantPayUserList("");
        // } else {
        //   NotificationManager.error("User not deleted.");
        // }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleInputOnchange = (e) => {

    let userInfo = { ...this.state.userInfo };
    if (e.target.name === "status") {
      userInfo[e.target.name] = e.target.checked;
    } else if (e.target.name === "contactNo") {
      if (e.target.value.length <= 10) {
        if (!isNaN(e.target.value)) {
          userInfo[e.target.name] = e.target.value;
          this.setState({
            validNo: true,
          });
        }
      }
      if (e.target.value.length === 10) {
        this.setState({
          validNo: false,
        });
      }
    } else {
      userInfo[e.target.name] = e.target.value;
    }
    if (e.target.name === "emailId") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(e.target.value) === false) {
        this.setState({
          validEmail: true,
        });
      } else {
        this.setState({
          validEmail: false,
        });
      }
    }
    this.setState({
      userInfo,
    });
  };

  handlePhoneOnChange = (value) => {
    let userInfo = { ...this.state.userInfo };
    userInfo["contactNo"] = value;
    this.setState({
      userInfo,
    });
  }

  handleaddInstantPayOpen() {
    this.setState({ addInstantPay: true, visible: {} });
  }
  handleaddInstantPayClose() {
    this.setState({
      addInstantPay: false,
      userInfo: {
        name: "",
        emailId: "",
        contactNo: "",
        role: "",
        status: false,
      },
      touched: false,
    });
  }
  handleeditInstantPayOpen(user) {

    this.setState({
      editInstantPay: true,
      userInfo: {
        name: user.firstName,
        emailId: user.emailId,
        contactNo: user.contactNumber.split('+')[1],
        role: user.roleId,
        status: user.isActive == "Active" ? true : false,
      },
      userId: user.userId,
      touched: true,
      visible: {}
    });
  }
  handleeditInstantPayClose() {
    this.setState({
      editInstantPay: false,
      userInfo: {
        name: "",
        emailId: "",
        contactNo: "",
        role: "",
        status: false,
      },
      userId: "",
      touched: false,
    });
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.setState({ visible: {} });
    this.handleGetInstantPayUserList(this.state.searchBy, pagination, sorter)
  }

  hide(e, id) {
    // document.getElementById(
    //   id
    // ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //   "none";
    let visible = {};
    visible[id] = false;
    this.setState({
      visible
    })
  }

  show(e, id) {
    // if (document.getElementById(id))
    //   document.getElementById(
    //     id
    //   ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //     "block";
    let visible = {};
    visible[id] = true;
    this.setState({
      visible
    })
  }

  render() {
    const headers = [
      // { label: "User ID", key: "userId" },
      { label: "Name", key: "firstName" },
      { label: "Email", key: "emailId" },
      { label: "Contact No.", key: "contactNumber" },
      { label: "Role", key: "roleName" },
      { label: "Created By", key: "createBy" },
      { label: "Status", key: "isActive" },
    ];

    const columns = [
      {
        title: "User ID",
        dataIndex: "userId",
        key: "userId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Name",
        dataIndex: "firstName",
        key: "firstName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Email",
        dataIndex: "emailId",
        key: "emailId",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Contact No.",
        dataIndex: "contactNumber",
        key: "contactNumber",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Created By",
        dataIndex: "createBy",
        key: "createBy",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label>{item.createBy}</label>
              <Popover
                content={
                  <div className="userpopover">
                    <div className="subsc">
                      <label>Created By</label>
                      <label>{item.createBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Created On</label>
                      <label>{item.createDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified By</label>
                      <label>{item.updateBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified On</label>
                      <label>{item.updateDate}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="hover"
              >
                <img src={InfoIcon} alt="InfoIcon" />
              </Popover>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "isActive",
        key: "isActive",
        className: "mob-none",
        // render: (row, item) => {
        //   return (
        //     <div className="status">
        //       <div>
        //         <label className="switch">
        //           <input type="checkbox" checked={item.isActive} disabled />
        //           <span className="slider round"></span>
        //         </label>
        //       </div>
        //     </div>
        //   );
        // },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "Action",
        render: (row, item) => {
          return (
            <div className="action">
              <div className="editdele">
                <img
                  src={BlueEdit}
                  alt="Edit"
                  onClick={this.handleeditInstantPayOpen.bind(this, item)}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center" id={"user" + item.userId}>
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                        onClick={() =>
                          this.hide(
                            this,
                            "user" + item.userId
                          )
                        }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleDeleteInstantPayUser.bind(
                          this,
                          item.userId
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="click"
                  visible={this.state.visible["user" + item.userId] == undefined ? false :
                    this.state.visible["user" + item.userId]}
                >
                  <img src={RedDelete} alt="Delete"
                    onClick={() =>
                      this.show(this, "user" + item.userId)
                    }
                  />
                </Popover>
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <BackBtn />
        <div className="instantpay common_table">
          <h3 className="Usermana">One Pay User Management</h3>
          <div className="exfilter">
            <input
              type="text"
              placeholder="Search Anything"
              onChange={this.handleInstantPayUserSearch.bind(this)}
            />
            <CSVLink
              data={this.state.instantPayUserCSVData}
              headers={headers}
              filename={"Instant Pay User Management.csv"}
              className="csv"
            >
              <img src={CSV} alt="Export" />
              Export to CSV
            </CSVLink>
            <label
              className="add add_new_btn"
              onClick={this.handleaddInstantPayOpen.bind(this)}
            >
              Add User
            </label>
          </div>
          {/* Add Instant User */}
          <Modal
            open={this.state.addInstantPay}
            onClose={this.handleaddInstantPayClose.bind(this)}
            modalId="addinstantuserModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Add User</h3>
              <img
                src={CloseIcon}
                alt="CloseIcon"
                className="closeicon"
                onClick={this.handleaddInstantPayClose.bind(this)}
              />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Name *</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={this.state.userInfo.name}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.userInfo.name.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Email *</label>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="emailId"
                      value={this.state.userInfo.emailId}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.validEmail && (
                      <span className="Error">Invalid Email.</span>
                    )}
                    {this.state.userInfo.emailId.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot pincontactno">
                    <label>Contact No. *</label>
                    {/* <input
                    type="text"
                    placeholder="Enter Contact No."
                    name="contactNo"
                    value={this.state.userInfo.contactNo}
                    onChange={this.handleInputOnchange}
                  /> */}
                    <PhoneInput
                      country={'au'}
                      name="contactNo"
                      value={this.state.userInfo.contactNo}
                      onChange={this.handlePhoneOnChange}
                      maxLength="10"
                    />
                    {this.state.validNo && (
                      <span className="Error">Invalid Number.</span>
                    )}
                    {this.state.userInfo.contactNo.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Role *</label>
                    <select
                      name="role"
                      value={this.state.userInfo.role}
                      onChange={this.handleInputOnchange}
                    >
                      <option hidden>Select Role</option>
                      {this.state.roles &&
                        this.state.roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.roleName}
                          </option>
                        ))}
                    </select>
                    {this.state.userInfo.role.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Status</label>
                    <label className="switch ml-0">
                      <input
                        type="checkbox"
                        name="status"
                        value={this.state.userInfo.status}
                        onChange={this.handleInputOnchange}
                        checked={this.state.userInfo.status}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="Editbtn">
                <button
                  className="btn"
                  onClick={this.handleAddInstantPayUser.bind(this)}
                  disabled={this.state.loadingAddEdit}
                >
                  {this.state.loadingAddEdit && (
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faCircleNotch}
                      size="sm"
                      spin
                    />
                  )}
                  Add
                </button>
              </div>
            </div>
          </Modal>
          {/* Edit Instant User */}
          <Modal
            open={this.state.editInstantPay}
            onClose={this.handleeditInstantPayClose.bind(this)}
            modalId="addinstantuserModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Edit User</h3>
              <img
                src={CloseIcon}
                alt="CloseIcon"
                className="closeicon"
                onClick={this.handleeditInstantPayClose.bind(this)}
              />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Name *</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={this.state.userInfo.name}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.userInfo.name.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Email *</label>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="emailId"
                      value={this.state.userInfo.emailId}
                      onChange={this.handleInputOnchange}
                    />
                    {this.state.validEmail && (
                      <span className="Error">Invalid Email.</span>
                    )}
                    {this.state.userInfo.emailId.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot pincontactno">
                    <label>Contact No. *</label>
                    {/* <input
                    type="text"
                    placeholder="Enter Contact No."
                    name="contactNo"
                    value={this.state.userInfo.contactNo}
                    onChange={this.handleInputOnchange}
                  /> */}
                    <PhoneInput
                      country={'au'}
                      name="contactNo"
                      value={this.state.userInfo.contactNo}
                      onChange={this.handlePhoneOnChange}
                      maxLength="10"
                    />
                    {this.state.validNo && (
                      <span className="Error">Invalid Number.</span>
                    )}
                    {this.state.userInfo.contactNo.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Role *</label>
                    <select
                      name="role"
                      value={this.state.userInfo.role}
                      onChange={this.handleInputOnchange}
                    >
                      <option hidden>Select Role</option>
                      {this.state.roles &&
                        this.state.roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.roleName}
                          </option>
                        ))}
                    </select>
                    {this.state.userInfo.role.length === 0 &&
                      this.state.touched && (
                        <span className="Error">Required.</span>
                      )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Status</label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        name="status"
                        value={this.state.userInfo.status}
                        onChange={this.handleInputOnchange}
                        checked={this.state.userInfo.status}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="Editbtn">
                <button
                  className="btn"
                  onClick={this.handleEditInstantPayUser.bind(this)}
                  disabled={this.state.loadingAddEdit}
                >
                  {this.state.loadingAddEdit && (
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faCircleNotch}
                      size="sm"
                      spin
                    />
                  )}
                  Edit
                </button>
              </div>
            </div>
          </Modal>
          <div className="instantpaytable common_one">
            <Spin spinning={this.state.loading}>
              <Table
                columns={columns}
                expandedRowRender={(row) => {
                  return (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Email:</label>
                            <label className="expandemailtext">{row.emailId}</label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Contact Number:</label>
                            <label className="expandemailtext">
                              {row.contactNumber}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Role:</label>
                            <label className="expandemailtext">
                              {row.roleName}
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Created By:</label>
                            <div className="amazontext">
                              <label className="expandemailtext">
                                {row.createBy}
                              </label>
                              <Popover
                                content={
                                  <div className="userpopover">
                                    <div className="subsc">
                                      <label>Created By</label>
                                      <label>{row.createBy}</label>
                                    </div>
                                    <div className="subsc">
                                      <label>Created On</label>
                                      <label>{row.createDate}</label>
                                    </div>
                                    <div className="subsc">
                                      <label>Modified By</label>
                                      <label>{row.updateBy}</label>
                                    </div>
                                    <div className="subsc">
                                      <label>Modified On</label>
                                      <label>{row.updateDate}</label>
                                    </div>
                                  </div>
                                }
                                placement="bottom"
                                trigger="click"
                              >
                                <img src={InfoIcon} alt="InfoIcon" />
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Status:</label>
                            <label className="expandemailtext">
                              {row.isActive ? "Active" : "Inactive"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }}
                expandIcon={({ expanded, onExpand, record }) =>
                  expanded ? (
                    <div className="expandown1">
                      <img src={Down} onClick={e => onExpand(record, e)} />
                    </div>
                  ) : (
                    <div className="expandown">
                      <img src={Down} onClick={e => onExpand(record, e)} />
                    </div>
                  )}
                expandIconColumnIndex={this.state.mobileView ? 8 : -1}
                expandIconAsCell={false}
                dataSource={this.state.instantPayUserData}
                pagination={{
                  current: this.state.pagination.current,
                  pageSize: this.state.pagination.pageSize,
                  total: this.state.pagination.total,
                  position: ["bottomCenter"],
                  showSizeChanger: true
                }}
                onChange={this.onShowSizeChange}
              />
            </Spin>
          </div>
        </div>
      </div>

    );
  }
}

export default splitInstantPayUserManagement;
