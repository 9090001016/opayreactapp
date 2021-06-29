import React, { Component } from "react";
import CSV from "./../../../../assets/Images/csv.png";
import { Table, Popover, Spin } from "antd";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import RedDelete from "./../../../../assets/Images/delete.png";
import BlueEdit from "./../../../../assets/Images/editt.png";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../../assets/Images/CloseWhBold.png";
import config from "./../../../../helpers/config";
import axios from "axios";
import { merchantAuthHeader } from "../../../Split Payment/Merchant/splitMerchantAuthHeader";
import { NotificationManager } from "react-notifications";
import { CSVLink } from "react-csv";
import Down from "./../../../../assets/Images/download.png";
import PhoneInput from 'react-phone-input-2';

class merchantusermanagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      editUser: false,
      merchantUserData: [],
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
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      searchBy: "",
      visible: {},
      merchantUserDataCSV: []
    };
  }

  componentDidMount() {
    this.handleGetMerchantUserList("");
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

  handleGetMerchantUserList(search, pagination, sorter) {
    let self = this;
    var merchantUserData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true,
      searchBy: search
    });
    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantSetting/MerchantUserList",
      headers: merchantAuthHeader(),
      data: {
        Searchby: search,
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
            merchantUserData.push({
              userID: item.userID,
              userName: item.userName,
              email: item.email,
              contactNumber: "+" + item.contactNumber,
              roleID: item.roleID,
              roleName: item.roleName,
              createdBy: item.createdBy,
              createdDate: item.createdDate,
              updatedBy: item.updatedBy,
              updatedDate: item.updatedDate,
              status: item.status === true ? "Active" : "InActive",
            })
          );
          self.setState({
            merchantUserData,
            loading: false,
            pagination: paging
          });
        } else {
          self.setState({
            merchantUserData: [],
            loading: false,
            pagination: paging
          });
        }
        self.handleGetMerchantUserCSV(search, pagination, sorter);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetMerchantUserCSV(search, pagination, sorter) {
    
    let self = this;
    var merchantUserDataCSV = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantSetting/MerchantUserList",
      headers: merchantAuthHeader(),
      data: {
        Searchby: search,
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
          merchantUserDataCSV.push({
              userID: item.userID,
              userName: item.userName,
              email: item.email,
              contactNumber: "+" + item.contactNumber,
              roleID: item.roleID,
              roleName: item.roleName,
              createdBy: item.createdBy,
              createdDate: item.createdDate,
              updatedBy: item.updatedBy,
              updatedDate: item.updatedDate,
              status: item.status === true ? "Active" : "InActive",
            })
          );
          self.setState({
            merchantUserDataCSV
          });
        } else {
          self.setState({
            merchantUserDataCSV: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDeleteMerchantUser(userID) {
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "OnePayMerchantSetting/DeleteMerchantUser",
      headers: merchantAuthHeader(),
      params: {
        userID,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("User deleted successfully.");
          self.setState({ visible: {} })
          self.handleGetMerchantUserList(self.state.searchBy);
        } else {
          NotificationManager.error("User not deleted.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetRolesList() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayMerchantSetting/GetMerchantRoles",
      headers: merchantAuthHeader(),
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

  handleAddMerchantUser() {
    let self = this;
    
    let headers = merchantAuthHeader();
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
      url: config.apiUrl + "OnePayMerchantSetting/CreateMerchantUser",
      headers,
      data: {
        UserName: this.state.userInfo.name,
        ContactNumber: this.state.userInfo.contactNo,
        Email: this.state.userInfo.emailId,
        RoleID: parseInt(this.state.userInfo.role),
        IsActive: this.state.userInfo.status,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("User created successfully.");
          self.setState({
            addUser: false,
            userInfo: {
              name: "",
              emailId: "",
              contactNo: "",
              role: "",
              status: false,
            },
            touched: false,
          });
          self.handleGetMerchantUserList(self.state.searchBy);
        } else {
          NotificationManager.error(status);
        }
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

  handleaddUserOpen() {
    this.setState({ addUser: true, visible: {} });
  }

  handleMerchantUserSearch(e) {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetMerchantUserList(e.target.value, pagination);
  }

  handleEditMerchantUser() {
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
      url: config.apiUrl + "OnePayMerchantSetting/UpdateMerchantUser",
      headers: merchantAuthHeader(),
      data: {
        userID: this.state.userId,
        UserName: this.state.userInfo.name,
        ContactNumber: this.state.userInfo.contactNo,
        Email: this.state.userInfo.emailId,
        RoleID: parseInt(this.state.userInfo.role),
        isActive: this.state.userInfo.status,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("User updated successfully.");
          self.handleGetMerchantUserList(self.state.searchBy);
          self.handleEditUserClose();
        } else {
          NotificationManager.error("User not updated.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleaddUserClose() {
    this.setState({
      addUser: false,
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
  handleEditUserOpen(user) {
    
    this.setState({
      editUser: true,
      userInfo: {
        name: user.userName,
        emailId: user.email,
        contactNo: user.contactNumber.split('+')[1],
        role: user.roleID,
        status: user.status == "Active"?true:false,
      },
      userId: user.userID,
      touched: true,
      visible: {}
    });
  }
  handleEditUserClose() {
    this.setState({
      editUser: false,
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
    this.setState({ visible: {} })
    this.handleGetMerchantUserList(this.state.searchBy, pagination, sorter)
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
      { label: "User ID", key: "userID" },
      { label: "Name", key: "userName" },
      { label: "Email", key: "email" },
      { label: "Contact No.", key: "contactNumber" },
      { label: "Role", key: "roleName" },
      { label: "Created By", key: "createdBy" },
      { label: "Status", key: "status" },
    ];
    const columns = [
      {
        title: "User ID",
        dataIndex: "userID",
        key: "userID",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
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
        dataIndex: "createdBy",
        key: "createdBy",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label>{item.createdBy}</label>
              <Popover
                content={
                  <div className="userpopover">
                    <div className="subsc">
                      <label>Created By</label>
                      <label>{item.createdBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Created On</label>
                      <label>{item.createdDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified By</label>
                      <label>{item.updatedBy}</label>
                    </div>
                    <div className="subsc">
                      <label>Modified On</label>
                      <label>{item.updatedDate}</label>
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
        dataIndex: "status",
        key: "status",
        className: "mob-none",
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
                  onClick={this.handleEditUserOpen.bind(this, item)}
                />
                <Popover
                  content={
                    <div className="deletepopover text-center">
                      <h3>Are you sure to delete ?</h3>
                      <button className="delete"
                        onClick={() =>
                          this.hide(
                            this,
                            "user" + item.userID
                          )
                        }
                      >Cancel</button>
                      <button
                        className="delete"
                        onClick={this.handleDeleteMerchantUser.bind(
                          this,
                          item.userID
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  }
                  placement="bottomRight"
                  trigger="click"
                  visible={this.state.visible["user" + item.userID] == undefined ? false :
                    this.state.visible["user" + item.userID]}
                >
                  <img src={RedDelete} alt="Delete"
                    onClick={() =>
                      this.show(this, "user" + item.userID)
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
      <div className="merusermana">
        <h3 className="Usermana">Merchant User Management</h3>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleMerchantUserSearch.bind(this)}
          />
          <CSVLink
            data={this.state.merchantUserDataCSV}
            headers={headers}
            filename={"Merchant User Management.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label className="add" onClick={this.handleaddUserOpen.bind(this)}>
            Add User
          </label>
        </div>
        <div className="merusermanatable tabmerchant">
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">User ID:</label>
                          <label className="expandemailtext">{row.userID}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Name:</label>
                          <label className="expandemailtext">{row.userName}</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Email:</label>
                          <label className="expandemailtext">{row.email}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Contact No:</label>
                          <label className="expandemailtext">{row.contactNumber}</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Role:</label>
                          <label className="expandemailtext">{row.roleName}</label>
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
              dataSource={this.state.merchantUserData}
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
        {/* Add Role */}
        <Modal
          open={this.state.addUser}
          onClose={this.handleaddUserClose.bind(this)}
          modalId="meradduserModal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Add Merchant User</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleaddUserClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Name</label>
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
                  <label>Email</label>
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
                  <label>Contact No.</label>
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
                  <label>Role</label>
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
                onClick={this.handleAddMerchantUser.bind(this)}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
        {/* Edit Role */}
        <Modal
          open={this.state.editUser}
          onClose={this.handleEditUserClose.bind(this)}
          modalId="meradduserModal"
          overlayId="overlay"
        >
          <div className="backtext">
            <h3 className="eduser">Edit Merchant User</h3>
            <img
              src={CloseIcon}
              alt="CloseIcon"
              className="closeicon"
              onClick={this.handleEditUserClose.bind(this)}
            />
          </div>
          <div className="edituser">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="marginbot">
                  <label>Name</label>
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
                  <label>Email</label>
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
                  <label>Contact No.</label>
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
                  <label>Role</label>
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
                onClick={this.handleEditMerchantUser.bind(this)}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
        {/* <div className="pagination">
          <ul>
            <li>
              <a hrf="">&lt;</a>
            </li>
            <li className="active">
              <a hrf="">1</a>
            </li>
            <li>
              <a hrf="">2</a>
            </li>
            <li>
              <a hrf="">3</a>
            </li>
            <li>
              <a hrf="">4</a>
            </li>
            <li>
              <a hrf="">5</a>
            </li>
            <li>
              <a hrf="">&gt;</a>
            </li>
          </ul>
          <div className="selectopt">
            <select>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div> */}
      </div>
    );
  }
}

export default merchantusermanagement;
