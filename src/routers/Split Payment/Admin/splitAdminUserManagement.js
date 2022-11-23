import React, { Component } from "react";
import { Table, DatePicker, Spin } from "antd";
import Filter from "./../../../assets/Images/smallicons/Filteralt.png";
import CSV from "./../../../assets/Images/smallicons/Exportcsv.png";
import WhiteDropdown from "./../../../assets/Images/WhiteDropdown.png";
import config from "./../../../helpers/config";
import axios from "axios";
import { authHeader } from "../helpers/splitAuthHeader";
import { CSVLink } from "react-csv";
import { Drawer } from "antd";
import Down from "./../../../assets/Images/download.png";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
// import Downarrow from "./../../assets/Images/downarrow.png";

const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";

class splitAdminUserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
      editUser: false,
      userData: [],
      userDetailsByID: [],
      userId: "",
      userName: "",
      userEmailId: "",
      userContactNo: "",
      status: "",
      startDate: null,
      endDate: null,
      userTotalTransactionCountTo: "",
      userTotalTransactionAmountTo: "",
      visibleFilter: false,
      placement: "bottom",
      mobileView: false,
      loading: false,
      module: "",
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        //   position: ["bottomCenter"],
        //   pageSizeOptions: ['10', '20', '30', '40']
      },
      loadingSearch: false,
      userCSVData: []
    };
  }
  showDrawerFilter = () => {
    this.setState({ visibleFilter: true });
  };
  onCloseFilter = () => {
    this.setState({ visibleFilter: false });
  };
  onChange = (e) => {
    this.setState({ placement: e.target.value });
  };
  componentDidMount() {
    var module = window.localStorage.getItem("OnePayAdminModule") == null ? "" :
      window.localStorage.getItem("OnePayAdminModule");
    if (document.getElementById("splitMerchantMmt")) {
      document.getElementById("splitMerchantMmt").classList.remove("active");
      document.getElementById("splitMerchantSett").classList.remove("active");
    }
    this.handleGetUserManagementList();
    this.handleGetUserManagementCSV();
    this.setState({
      module
    })
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

  handleFilterbuttonClick = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };
  handleEditUserOpen() {
    this.setState({ editUser: true });
  }
  handleEditUserClose() {
    this.setState({ editUser: false });
  }

  handleDateOnChange = (dates) => {
    if (dates !== null) {
      this.setState({ startDate: dates[0]._d, endDate: dates[1]._d });
    } else {
      this.setState({ startDate: null, endDate: null });
    }
  };

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGetUserManagementList(pagination, sorter) {
    let self = this;
    var userData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true,
      loadingSearch: true
    });
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayTransaction/usermanagementtransactionlist",
      headers: authHeader(),
      data: {
        UserId: this.state.userId ? parseInt(this.state.userId) : 0,
        UserName: this.state.userName,
        UserEmailId: this.state.userEmailId,
        UserContactNo: this.state.userContactNo,

        UserTotalTransactionCountFrom: -1,
        UserTotalTransactionCountTo: this.state.userTotalTransactionCountTo
          ? parseInt(this.state.userTotalTransactionCountTo)
          : -1,
          
        UserTotalTransactionAmountFrom: -1,
        UserTotalTransactionAmountTo: this.state.userTotalTransactionAmountTo
          ? parseInt(this.state.userTotalTransactionAmountTo)
          : -1,
        StartDate: startDate,
        EndDate: endDate,
        Status: this.state.status,
        
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "userId") : "userId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        // (pagination!==undefined?(pagination.current).toString():(paging.current).toString()),
        Size: (paging.pageSize).toString()
        // pagination!==undefined?(pagination.pageSize).toString():(paging.pageSize).toString()
        // SortColumn: "",
        // SortBy: ""
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // paging.current = paging.current;
          // paging.pageSize = paging.pageSize;
          if (data.length !== 0) {
            paging.total = parseInt(data[0].totalRowCount);
            data.map((item) =>
              userData.push({
                userId: item.userId,
                userName: item.userName,
                userEmailId: item.userEmailId,
                userContactNumber: "+" + item.userContactNumber,
                userTotalTransactionCount: item.userTotalTransactionCount,
                userTotalTransactionAmount: item.userTotalTransactionAmount,
                status: item.status === true ? "Active" : "Inactive",
              })
            );
            self.setState({
              userData,
              loading: false,
              pagination: paging,
              loadingSearch: false
            });
          } else {
            paging.total = 0
            self.setState({
              userData: [],
              loading: false,
              pagination: paging,
              loadingSearch: false
            });
          }
        } else {
          paging.total = 0
          self.setState({
            userData: [],
            loading: false,
            pagination: paging,
            loadingSearch: false
          });
        }
        self.handleGetUserManagementCSV(pagination, sorter);
      })
      .catch(() => {
        self.setState({
          userData: [],
          loading: false,
          pagination: paging,
          loadingSearch: false
        });
      });
  }

  handleGetUserManagementCSV(pagination, sorter) {
    let self = this;
    var userCSVData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayTransaction/usermanagementtransactionlist",
      headers: authHeader(),
      data: {
        UserId: this.state.userId ? parseInt(this.state.userId) : 0,
        UserName: this.state.userName,
        UserEmailId: this.state.userEmailId,
        UserContactNo: this.state.userContactNo,
        UserTotalTransactionCountFrom: -1,
        UserTotalTransactionCountTo: this.state.userTotalTransactionCountTo
          ? parseInt(this.state.userTotalTransactionCountTo)
          : -1,
        UserTotalTransactionAmountFrom: -1,
        UserTotalTransactionAmountTo: this.state.userTotalTransactionAmountTo
          ? parseInt(this.state.userTotalTransactionAmountTo)
          : -1,
        StartDate: startDate,
        EndDate: endDate,
        Status: this.state.status,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "userId") : "userId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        // (pagination!==undefined?(pagination.current).toString():(paging.current).toString()),
        Size: (this.state.pagination.total).toString()
        // pagination!==undefined?(pagination.pageSize).toString():(paging.pageSize).toString()
        // SortColumn: "",
        // SortBy: ""
      },
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            data.map((item) =>
              userCSVData.push({
                userId: item.userId,
                userName: item.userName,
                userEmailId: item.userEmailId,
                userContactNumber: "+" + item.userContactNumber,
                userTotalTransactionCount: item.userTotalTransactionCount,
                userTotalTransactionAmount: item.userTotalTransactionAmount,
                status: item.status === true ? "Active" : "Inactive",
              })
            );
            self.setState({
              userCSVData
            });
          } else {
            self.setState({
              userCSVData: []
            });
          }
        } else {
          self.setState({
            userCSVData: []
          });
        }
      })
      .catch(() => {
        self.setState({
          userCSVData: []
        });
      });
  }

  handleRowClickPage(userId) {

    let self = this;

    setTimeout(function () {
      self.props.history.push({
        pathname: "adminUserManagementDetails",
        userId: userId,
      });
    }, 1000);
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.handleGetUserManagementList(pagination, sorter)
  }

  handleSearch() {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetUserManagementList(pagination)
  }

  render() {
    function disabledDate(current) {
      // Can not select days before today and today
      return current > new Date();
    }
    const { placement, visibleFilter } = this.state;
    const headers = [
      { label: "User Id", key: "userId" },
      { label: "Name", key: "userName" },
      { label: "Email", key: "userEmailId" },
      { label: "Contact No.", key: "userContactNumber" },
      { label: "Total No. of Transactions", key: "userTotalTransactionCount" },
      { label: "Total Amount Transacted", key: "userTotalTransactionAmount" },
      { label: "Status", key: "status" },
    ];

    // const DeleteUser = (
    //   <div className="deletepopover text-center">
    //     <h3>Are you sure to delete ?</h3>
    //     <button className="delete">Cancel</button>
    //     <button className="delete">Delete</button>
    //   </div>
    // );
    const columns = [
      {
        title: "User Id",
        dataIndex: "userId",
        key: "userId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend'],
        className: "uidresp"
      },
      {
        title: "Name",
        dataIndex: "userName",
        key: "userName",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Email",
        dataIndex: "userEmailId",
        key: "userEmailId",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Contact No.",
        key: "userContactNumber",
        dataIndex: "userContactNumber",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Total No. of Transactions",
        key: "userTotalTransactionCount",
        dataIndex: "userTotalTransactionCount",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="totalTran">
              <label>{item.userTotalTransactionCount}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Total Amount Transacted",
        key: "userTotalTransactionAmount",
        dataIndex: "userTotalTransactionAmount",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="totalAmoun">
              <label>{"$"}{item.userTotalTransactionAmount}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
        // render: (row, item) => {
        //   return (
        //     <div className="status">
        //       <div>
        //         <label className="switch">
        //           <input type="checkbox" checked={item.status} disabled />
        //           <span className="slider round"></span>
        //         </label>
        //       </div>
        //     </div>
        //   );
        // },
      },
      // {
      //   title: "Actions",
      //   key: "action",
      //   dataIndex: "action",
      //   render: (row, item) => {
      //     return (
      //       <div className="action">
      //         <div className="editdele">
      //           <img
      //             src={BlueEdit}
      //             alt="Edit"
      //             onClick={this.handleEditUserOpen.bind(this)}
      //           />
      //           <Popover
      //             content={DeleteUser}
      //             placement="bottomRight"
      //             trigger="click"
      //           >
      //             <img src={RedDelete} alt="Delete" />
      //           </Popover>
      //         </div>
      //       </div>
      //     );
      //   },
      // },
    ];

    return (
      <div>
        <div className="blue_line">
        </div>
        <div className="userManagement setting_dashboard">
          <div className="dash_link end_user">
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
          <div className="transaction_details">
          <h3 className="Usermana">End Customer Management</h3>
          <div className="exfilter">
            <CSVLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download CSV"
              data={this.state.userCSVData}
              headers={headers}
              filename={"End Customer Management.csv"}
              className="csv"
            >
              <img src={CSV} alt="Export" />
              Export to CSV
            </CSVLink>
            <label data-bs-toggle="tooltip" data-bs-placement="bottom" title="Custom Filter"
              className="filte"
              onClick={this.handleFilterbuttonClick.bind(this)}
            >
              <img src={Filter} alt="Export" />
              Filter
              <img src={WhiteDropdown} alt="Dropdown" className="WhDrop" />
              {/* WhDrop1 */}
            </label>
          </div>
          <label className="filt" onClick={this.showDrawerFilter.bind(this)}>
            <img src={Filter} alt="Export" />
          </label>
          {this.state.isFilter ? (
            <div className="row m-0 w-100 back">
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  placeholder="Enter User Id"
                  name="userId"
                  value={this.state.userId}
                  onChange={this.handleOnChange.bind(this)}
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleOnChange.bind(this)}
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="userEmailId"
                  value={this.state.userEmailId}
                  onChange={this.handleOnChange.bind(this)}
                />
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="text"
                  placeholder="Enter Contact No."
                  name="userContactNo"
                  value={this.state.userContactNo}
                  onChange={this.handleOnChange.bind(this)}
                />
              </div>
              {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total No. of Txn upto"
                name="userTotalTransactionCountTo"
                value={this.state.userTotalTransactionCountTo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
              {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total Amount Txn upto"
                name="userTotalTransactionAmountTo"
                value={this.state.userTotalTransactionAmountTo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
              {/* <div className="col-12 col-md-3">
              <label className="Totalamount">
                Total No. of Transaction upto
              </label>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <label className="Totalamount">
                Total Amount Transacted upto
              </label>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
              </div>
            </div> */}
              <div className="col-12 col-md-3">
                {/* <input type="text" className="calendar" placeholder="Start Date - End Date"/> */}
                {/* <RangePicker
                className="calendar"
                format={dateFormat}
                onChange={this.handleDateOnChange}
                disabledDate={disabledDate}
              ></RangePicker> */}
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleOnChange.bind(this)}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="col-12 col-md-3">
              </div>
              <div className="col-12 col-md-12">
                <div className="search">
                  <button onClick={this.handleSearch.bind(this)}
                    disabled={this.state.loadingSearch}>
                    {this.state.loadingSearch && (
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faCircleNotch}
                        size="sm"
                        spin
                      />
                    )}
                    Search
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="usmanatable">
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
                            <label className="expandemailtext">
                              {row.userEmailId}
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">Contact Number:</label>
                            <label className="expandemailtext">
                              {row.userContactNo}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">
                              Total No. of Transactions
                            </label>
                            <label className="expandemailtext">
                              {row.userTotalTransactionCount}
                            </label>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                          <div className="mobilevi">
                            <label className="expandemail">
                              Total Amount Transacted
                            </label>
                            <div className="amazontext">
                              <label className="expandemailtext">
                                {row.userTotalTransactionCount}
                              </label>
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
                      <img src={Down} onClick={(e) => onExpand(record, e)} />
                    </div>
                  ) : (
                    <div className="expandown">
                      <img src={Down} onClick={(e) => onExpand(record, e)} />
                    </div>
                  )
                }
                expandIconColumnIndex={this.state.mobileView ? 8 : -1}
                expandIconAsCell={false}
                dataSource={this.state.userData}
                pagination={{
                  current: this.state.pagination.current,
                  pageSize: this.state.pagination.pageSize,
                  total: this.state.pagination.total,
                  position: ["bottomCenter"],
                  showSizeChanger: true
                }}
                onRow={(row) => ({
                  onClick: () => this.handleRowClickPage(row.userId),
                })}
                onChange={this.onShowSizeChange}

              />
              {/* <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            /> */}
            </Spin>
          </div>
          {/* Delete Record Modal */}
          {/* <Modal
          open={this.state.editUser}
          onClose={this.handleEditUserClose.bind(this)}
          modalId="EditUserModal"
          overlayId="overlay"
        >
          <img
            src={CloseIcon}
            alt="CloseIcon"
            className="closeicon"
            onClick={this.handleEditUserClose.bind(this)}
          />
          <div className="edituser">
            <h3 className="eduser">Edit User</h3>
            <div className="row">
              <div className="col-12 col-md-6">
                <label>Name</label>
                <input type="text" placeholder="Name" />
              </div>
              <div className="col-12 col-md-6">
                <label>Contact No.</label>
                <input type="text" placeholder="Contact Number" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <label>Email Id</label>
                <input type="text" placeholder="Email ID" />
              </div>
              <div className="col-12 col-md-6">
                <label>Status</label>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <span className="active">Active</span>
              </div>
            </div>
            <div className="Editbtn">
              <button className="btn">Edit</button>
            </div>
          </div>
        </Modal> */}
          <div className="fl">
            <Drawer
              placement={placement}
              closable={false}
              onClose={this.onCloseFilter}
              visible={visibleFilter}
              key={placement}
              className="f2"
            >
              <div className="drarfilter">
                <div className="row m-0 w-100 back">
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Enter User Id"
                      name="userId"
                      value={this.state.userId}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Enter Email"
                      name="userEmailId"
                      value={this.state.userEmailId}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Enter Contact No."
                      name="userContactNo"
                      value={this.state.userContactNo}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Total No. of Transaction upto"
                      name="userTotalTransactionCountTo"
                      value={this.state.userTotalTransactionCountTo}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <input
                      type="text"
                      placeholder="Total Amount Transacted upto"
                      name="userTotalTransactionAmountTo"
                      value={this.state.userTotalTransactionAmountTo}
                      onChange={this.handleOnChange.bind(this)}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    {/* <input type="text" className="calendar" placeholder="Start Date - End Date"/> */}
                    <RangePicker
                      className="calendar"
                      format={dateFormat}
                      onChange={this.handleDateOnChange}
                      disabledDate={disabledDate}
                    ></RangePicker>
                  </div>
                  <div className="col-12 col-md-3">
                    <select
                      name="status"
                      value={this.state.status}
                      onChange={this.handleOnChange.bind(this)}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="search">
                      <button
                        onClick={this.onCloseFilter.bind(this)}
                        className="mr-1"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={this.handleGetUserManagementList.bind(this)}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer>
            {/* <div className="pagination">
            <ul>
              <li><a hrf="">&lt;</a></li>
              <li className="active"><a hrf="">1</a></li>
              <li><a hrf="">2</a></li>
              <li><a hrf="">3</a></li>
              <li><a hrf="">4</a></li>
              <li><a hrf="">5</a></li>
              <li><a hrf="">&gt;</a></li>
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
          </div>
        </div>
      </div>
    );
  }
}

export default splitAdminUserManagement;
