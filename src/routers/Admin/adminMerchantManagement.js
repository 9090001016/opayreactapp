import React, { Component } from "react";
import Filter from "./../../assets/Images/filter.png";
import CSV from "./../../assets/Images/csv.png";
import WhiteDropdown from "./../../assets/Images/WhiteDropdown.png";
import CloseIcon from "./../../assets/Images/cross-icon.png";
import InfoIcon from "./../../assets/Images/info.png";
import { Table, Popover, DatePicker, Spin } from "antd";
import Modal from "react-responsive-modal";
import config from "./../../helpers/config";
import axios from "axios";
import { authHeader } from "./../../helpers/authHeader";
import { CSVLink } from "react-csv";
import { Drawer } from "antd";
import Down from "./../../assets/Images/download.png";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BlueEdit from "./../../assets/Images/editt.png";
import RedDelete from "./../../assets/Images/delete.png";
import { NotificationManager } from "react-notifications";
// import InfoIcon from "./../../assets/Images/Infoblue.png";

const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";

class adminMerchantManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
      editUser: false,
      merchantData: [],
      merchantId: "",
      merchantName: "",
      merchantEmailId: "",
      merchantContactNo: "",
      status: "",
      subscriptionStatus: "",
      approvalStatus: "",
      subscriptionTypePeriod: [],
      subscriptionType: "",
      subscriptionPeriod: "",
      type: "",
      period: "",
      startDate: null,
      endDate: null,
      merchantCSVData: [],
      merchantTotalTransactionCountTo: "",
      merchantTotalTransactionAmountTo: "",
      visibleFilter: false,
      placement: "bottom",
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      popUpVisible: false,
      loadingSearch: false,
      visible: {}
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
    if (document.getElementById("endCustomerMmt")) {
      document.getElementById("endCustomerMmt").classList.remove("active");
    }
    this.handleGetMerchantManagementList();
    this.handleSubscriptionTypePeriodList();
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

  handleRowClickPage(merchantId, isAdminApproveMerchant) {
    
    let self = this;
    if (isAdminApproveMerchant == true) {
      setTimeout(function () {
        self.props.history.push({
          pathname: "adminMerchantManagementDetails",
          merchantId: merchantId,
        });
      }, 1000);
    }
  }

  handleSubscriptionTypePeriodList() {
    
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "Transaction/SubscriptionMaster",
      headers: authHeader(),
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            subscriptionTypePeriod: data,
          });
        } else {
          self.setState({
            subscriptionTypePeriod: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDateOnChange = (dates, dateStrings) => {
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

  handleGetMerchantManagementList(pagination, sorter) {
    
    let self = this;
    var merchantData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true,
      loadingSearch: true
    });
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "Transaction/TransactionManagementTransactionList",
      headers: authHeader(),
      data: {
        MerchantId: this.state.merchantId ? parseInt(this.state.merchantId) : 0,
        MerchantName: this.state.merchantName,
        MerchantEmailId: this.state.merchantEmailId,
        MerchantContactNo: this.state.merchantContactNo,

        MerchantTotalTransactionCountFrom: -1,
        MerchantTotalTransactionCountTo: this.state.merchantTotalTransactionCountTo
          ? parseInt(this.state.merchantTotalTransactionCountTo)
          : -1,

        MerchantTotalTransactionAmountFrom: -1,
        MerchantTotalTransactionAmountTo: this.state
          .merchantTotalTransactionAmountTo
          ? parseInt(this.state.merchantTotalTransactionAmountTo)
          : -1,
        StartDate: startDate,
        EndDate: endDate,
        Status: this.state.status !== "" ? (this.state.status == "Active" ? "1" : "0") : "",
        SubscriptionType: this.state.subscriptionType,
        SubscriptionPeriod: this.state.subscriptionPeriod,
        SubscriptionStatus: this.state.subscriptionStatus,
        ApprovalStatus: this.state.approvalStatus !== "" ? (this.state.approvalStatus == "Approved" ? "1" : "0") : "",
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "merchantId") : "merchantId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            // paging.current = paging.current;
            // paging.pageSize = paging.pageSize;
            paging.total = parseInt(data[0].totalRowCount);
            data.map((item, i) =>
              merchantData.push({
                merchantId: item.merchantId,
                merchantName: item.merchantName,
                merchantEmailId: item.merchantEmailId,
                subscriptionType: item.subscriptionType,
                subscriptionPeriod: item.subscriptionPeriod,
                subscriptionEndDate: item.subscriptionEndDate,
                merchantContactNo: "+" + item.merchantContactNo,
                merchantTotalTransactionCount: item.merchantTotalTransactionCount,
                merchantTotalTransactionAmount: item.merchantTotalTransactionAmount,
                status: item.status == true ? "Active" : "InActive",
                paymentGApprovalStatus: item.paymentGApprovalStatus? "Yes":"No",
                isAdminApproveMerchant: item.isAdminApproveMerchant
              })
            );
            self.setState({
              merchantData,
              loading: false,
              pagination: paging,
              loadingSearch: false
            });
          } else {
            paging.total = 0
            self.setState({
              merchantData: [],
              loading: false,
              pagination: paging,
              loadingSearch: false
            });
          }
        } else {
          paging.total = 0
          self.setState({
            merchantData: [],
            loading: false,
            pagination: paging,
            loadingSearch: false
          });
        }
        self.handleGetMerchantManagementCSV(pagination, sorter)
      })
      .catch((data) => {
        paging.total = 0
        self.setState({
          merchantData: [],
          loading: false,
          pagination: paging,
          loadingSearch: false
        });
      });
  }

  handleGetMerchantManagementCSV(pagination, sorter) {
    
    let self = this;
    var merchantCSVData = [];
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "Transaction/TransactionManagementTransactionList",
      headers: authHeader(),
      data: {
        MerchantId: this.state.merchantId ? parseInt(this.state.merchantId) : 0,
        MerchantName: this.state.merchantName,
        MerchantEmailId: this.state.merchantEmailId,
        MerchantContactNo: this.state.merchantContactNo,

        MerchantTotalTransactionCountFrom: -1,
        MerchantTotalTransactionCountTo: this.state.merchantTotalTransactionCountTo
          ? parseInt(this.state.merchantTotalTransactionCountTo)
          : -1,
          
        MerchantTotalTransactionAmountFrom: -1,
        MerchantTotalTransactionAmountTo: this.state
          .merchantTotalTransactionAmountTo
          ? parseInt(this.state.merchantTotalTransactionAmountTo)
          : -1,
        StartDate: startDate,
        EndDate: endDate,
        Status: this.state.status !== "" ? (this.state.status == "Active" ? "1" : "0") : "",
        SubscriptionType: this.state.subscriptionType,
        SubscriptionPeriod: this.state.subscriptionPeriod,
        SubscriptionStatus: this.state.subscriptionStatus,
        ApprovalStatus: this.state.approvalStatus !== "" ? (this.state.approvalStatus == "Approved" ? "1" : "0") : "",
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "merchantId") : "merchantId",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            data.map((item, i) =>
              merchantCSVData.push({
                merchantId: item.merchantId,
                merchantName: item.merchantName,
                merchantEmailId: item.merchantEmailId,
                subscriptionType: item.subscriptionType,
                subscriptionPeriod: item.subscriptionPeriod,
                subscriptionEndDate: item.subscriptionEndDate,
                merchantContactNo: "+" + item.merchantContactNo,
                merchantTotalTransactionCount: item.merchantTotalTransactionCount,
                merchantTotalTransactionAmount: item.merchantTotalTransactionAmount,
                status: item.status == true ? "Active" : "InActive",
                paymentGApprovalStatus: item.paymentGApprovalStatus? "Yes":"No",
                isAdminApproveMerchant: item.isAdminApproveMerchant
              })
            );
            self.setState({
              merchantCSVData
            });
          } else {
            self.setState({
              merchantCSVData: []
            });
          }
        } else {
          self.setState({
            merchantCSVData: []
          });
        }
      })
      .catch((data) => {
        self.setState({
          merchantCSVData: []
        });
      });
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.setState({ visible: {} })
    this.handleGetMerchantManagementList(pagination, sorter)
  }

  handleSearch() {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetMerchantManagementList(pagination)
  }

  handleAdminApprove = (merchantId, merchantName, merchantEmailId, merchantContactNo) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "Transaction/isadminaprrove",
      headers: authHeader(),
      data: {
        MerchantId: merchantId,
        MerchantName: merchantName,
        MerchantEmailId: merchantEmailId,
        MerchantContactNo: merchantContactNo
      }
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (data === true) {
          self.hide(
            this,
            "merchant" + merchantId
          )
          self.handleGetMerchantManagementList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
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

  handleMerchantDeactivate(merchantId) {
    
    let self = this;

    axios({
      method: "delete",
      url: config.apiUrl + "MerchantTransaction/deactivateMerchant",
      headers: authHeader(),
      params: {
        userid: merchantId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        // if (status === "Success") {
        NotificationManager.success(status);
        self.hide(
          this,
          "delete" + merchantId
        )
        self.handleGetMerchantManagementList();

      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    function disabledDate(current) {
      // Can not select days before today and today
      return current > new Date();
    }
    const { placement, visibleFilter } = this.state;
    const headers = [
      { label: "User Id", key: "merchantId" },
      { label: "Name", key: "merchantName" },
      { label: "Email", key: "merchantEmailId" },
      { label: "Contact No.", key: "merchantContactNo" },
      { label: "Subscription Type", key: "subscriptionType" },
      { label: "Subscription Period", key: "subscriptionPeriod" },
      { label: "Valid Upto", key: "subscriptionEndDate" },
      // {
      //   label: "Total No. of Transactions",
      //   key: "merchantTotalTransactionCount",
      // },
      {
        label: "Total Amount Transacted (AU$)",
        key: "merchantTotalTransactionAmount",
      },
      { label: "Status", key: "status" },
    ];

    // const DeleteUser = (
    //   <div className="deletepopover text-center">
    //     <h3>Are you sure to delete ?</h3>
    //     <button className="delete">Cancel</button>
    //     <button className="delete">Delete</button>
    //   </div>
    // );
    const approve = (
      <div className="deletepopover text-center">
        <h3>Are you sure to approve ?</h3>
        <button className="delete">Cancel</button>
        <button className="delete">Approve</button>
      </div>
    );
    const merchantinfo = (
      <div className="deletepopover">
        <div className="subsc">
          <label>Subscription Type</label>
          <label>Gold</label>
        </div>
        <div className="subsc">
          <label>Subscription Period</label>
          <label>3 Months</label>
        </div>
        <div className="subsc">
          <label>Valid Upto</label>
          <label>09-20-2020</label>
        </div>
        <div className="subsc">
          <label>Subscription Status</label>
          <label>Active</label>
        </div>
      </div>
    );
    const columns = [
      {
        title: "User Id",
        dataIndex: "merchantId",
        key: "merchantId",
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        className: "uidadmmresp"
        // width: "8%"
      },
      {
        title: "Name",
        dataIndex: "merchantName",
        key: "merchantName",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label>{item.merchantName}</label>
              {/* <Popover
                content={
                  <div className="deletepopover">
                    <div className="subsc">
                      <label>Subscription Type </label>
                      <label>{item.subscriptionType}</label>
                    </div>
                    <div className="subsc">
                      <label>Subscription Period </label>
                      <label>{item.subscriptionPeriod}</label>
                    </div>
                    <div className="subsc">
                      <label>Valid Upto </label>
                      <label>{item.subscriptionEndDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Subscription Status </label>
                      <label>{item.subscriptionStatus == true?"Active":"InActive"}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="click"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <img src={InfoIcon} alt="InfoIcon" />
              </Popover> */}
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Email",
        dataIndex: "merchantEmailId",
        key: "merchantEmailId",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Contact No.",
        key: "merchantContactNo",
        dataIndex: "merchantContactNo",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "No. Of Transactions",
        dataIndex: "merchantTotalTransactionCount",
        key: "merchantTotalTransactionCount",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Subscription Type",
      //   dataIndex: "subscriptionType",
      //   key: "subscriptionType",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Subscription Period",
      //   dataIndex: "subscriptionPeriod",
      //   key: "subscriptionPeriod",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Valid Upto",
      //   dataIndex: "subscriptionEndDate",
      //   key: "subscriptionEndDate",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Total No. of Transactions",
      //   key: "merchantTotalTransactionCount",
      //   dataIndex: "merchantTotalTransactionCount",
      //   className: "mob-none",
      //   render: (row, item) => {
      //     return (
      //       <div className="totalTran">
      //         <label>{item.merchantTotalTransactionCount}</label>
      //       </div>
      //     );
      //   },
      //   sorter: true
      // },
      {
        title: "Total Amount Transacted (AU$)",
        key: "merchantTotalTransactionAmount",
        dataIndex: "merchantTotalTransactionAmount",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="totalAmoun">
              <label>{"$"}{item.merchantTotalTransactionAmount}</label>
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
      },
      {
        title: "Payment Gatway Approved",
        key: "paymentGApprovalStatus",
        dataIndex: "paymentGApprovalStatus",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Actions",
        key: "action",
        dataIndex: "action",
        className: "mob-none",
        render: (row, item) => {
          return (() => {
            if (item.isAdminApproveMerchant == false) {
              return (
                <div>
                  <Popover content={
                    <div className="deletepopover text-center" id={"merchant" + item.merchantId}>
                      <h3>Are you sure to approve ?</h3>
                      <button className="delete" onClick={() =>
                        this.hide(
                          this,
                          "merchant" + item.merchantId
                        )}>Cancel</button>
                      <button className="delete"
                        onClick={(e) => { e.stopPropagation(); this.handleAdminApprove(item.merchantId, item.merchantName, item.merchantEmailId, item.merchantContactNo) }}>
                        Approve
                      </button>
                    </div>
                  }
                    placement="left"
                    trigger="click"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    visible={this.state.visible["merchant" + item.merchantId] == undefined ? false :
                      this.state.visible["merchant" + item.merchantId]}
                  >
                    <div className="approve">
                      <button onClick={() =>
                        this.show(this, "merchant" + item.merchantId)
                      } >Approve</button>
                    </div>
                  </Popover>
                  {item.status == "Active" ? (
                    <div className="editdele">
                      <Popover
                        content={
                          <div className="deletepopover text-center" id={"delete" + item.merchantId}>
                            <h3>Are you sure to delete ?</h3>
                            <button className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.hide(
                                  this,
                                  "delete" + item.merchantId
                                )
                              }}
                            >Cancel</button>
                            <button
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.handleMerchantDeactivate(
                                  item.merchantId
                                )
                              }}
                            >
                              Delete
                      </button>
                          </div>
                        }
                        visible={this.state.visible["delete" + item.merchantId] == undefined ? false :
                          this.state.visible["delete" + item.merchantId]}
                        placement="bottomRight"
                        trigger="click"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <img src={RedDelete} alt="Delete"
                          onClick={() =>
                            this.show(this, "delete" + item.merchantId)
                          }
                        />
                      </Popover>
                    </div>) : null}
                </div>
              );
            } else {
              return (
                <div>
                  <label>Approved</label>
                  {item.status == "Active" ? (
                    <div className="editdele deleteicon">
                      <Popover
                        content={
                          <div className="deletepopover text-center" id={"delete" + item.merchantId}>
                            <h3>Are you sure to delete ?</h3>
                            <button className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.hide(
                                  this,
                                  "delete" + item.merchantId
                                )
                              }}
                            >Cancel</button>
                            <button
                              className="delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.handleMerchantDeactivate(
                                  item.merchantId
                                )
                              }}
                            >
                              Delete
                      </button>
                          </div>
                        }
                        visible={this.state.visible["delete" + item.merchantId] == undefined ? false :
                          this.state.visible["delete" + item.merchantId]}
                        placement="bottomRight"
                        trigger="click"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <img className="deleteiconsz" src={RedDelete} alt="Delete"
                          onClick={() =>
                            this.show(this, "delete" + item.merchantId)
                          }
                        />
                      </Popover>
                    </div>
                  ) : null}
                </div>

              )
            }
          })();
        },
      },
    ];

    return (
      <div className="merchManagement">
        <h3 className="Usermana">merchant management</h3>
        <div className="exfilter">
          <CSVLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download CSV"
            data={this.state.merchantCSVData}
            headers={headers}
            filename={"Merchant Management.csv"}
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
                name="merchantId"
                value={this.state.merchantId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Name"
                name="merchantName"
                value={this.state.merchantName}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Email"
                name="merchantEmailId"
                value={this.state.merchantEmailId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Contact No."
                name="merchantContactNo"
                value={this.state.merchantContactNo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total No. of Txn upto"
                name="merchantTotalTransactionCountTo"
                value={this.state.merchantTotalTransactionCountTo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total Amount Txn upto"
                name="merchantTotalTransactionAmountTo"
                value={this.state.merchantTotalTransactionAmountTo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            {/* <div className="col-12 col-md-3">
                            <label className="Totalamount">Total No. of Transaction upto</label>
                            <div className="slidecontainer">
                                <input type="range" min="1" max="100" value="50" />
                            </div>
                        </div> */}
            {/* <div className="col-12 col-md-3">
                            <label className="Totalamount">Total Amount Transacted upto</label>
                            <div className="slidecontainer">
                                <input type="range" min="1" max="100" value="50" />
                            </div>
                        </div> */}
            <div className="col-12 col-md-3">
              {/* <input type="text" className="calendar" placeholder="Start Date - End Date" /> */}
              {/* <RangePicker
                className="calendar"
                format={dateFormat}
                onChange={this.handleDateOnChange}
                disabledDate={disabledDate}
              ></RangePicker> */}
              <select
                name="approvalStatus"
                value={this.state.approvalStatus}
                onChange={this.handleOnChange.bind(this)}
              >
                <option value="">Select Approval Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <select
                name="status"
                value={this.state.status}
                onChange={this.handleOnChange.bind(this)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {/* <div className="col-12 col-md-3">
              <select
                name="subscriptionType"
                value={this.state.subscriptionType}
                onChange={this.handleOnChange.bind(this)}
              >
                <option value="">Select Subscription Type</option>
                {this.state.subscriptionTypePeriod &&
                  this.state.subscriptionTypePeriod.map((type) => (
                    <option value={type.planName}>{type.planName}</option>
                  ))}
              </select>
            </div>
            <div className="col-12 col-md-3">
              <select
                name="subscriptionPeriod"
                value={this.state.subscriptionPeriod}
                onChange={this.handleOnChange.bind(this)}
              >
                <option value="">Select Subscription Period</option>
                {this.state.subscriptionTypePeriod &&
                  this.state.subscriptionTypePeriod.map((period) => (
                    <option value={period.planDuration}>
                      {period.planDuration}
                    </option>
                  ))}
              </select>
            </div> */}
            {/* <div className="col-12 col-md-3">
              <select
                name="subscriptionStatus"
                value={this.state.subscriptionStatus}
                onChange={this.handleOnChange.bind(this)}
              >
                <option>Select Subscription Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div> */}
            <div className="col-12 col-md-3">

            </div>
            <div className="col-12 col-md-12">
              <div className="search">
                <button
                  onClick={this.handleSearch.bind(this)}
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
        <div className="mermanatable overflsc">
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
                            {row.merchantEmailId}
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Contact Number:</label>
                          <label className="expandemailtext">
                            {row.merchantContactNo}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">
                            Total No. of Transactions:
                        </label>
                          <label className="expandemailtext">
                            {row.merchantTotalTransactionCount}
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
                              {row.merchantTotalTransactionAmount}
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
              dataSource={this.state.merchantData}
              pagination={{
                current: this.state.pagination.current,
                pageSize: this.state.pagination.pageSize,
                total: this.state.pagination.total,
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
              onRow={(row, item) => ({
                onClick: () => this.handleRowClickPage(row.merchantId, row.isAdminApproveMerchant),
              })}
              onChange={this.onShowSizeChange}
            />
          </Spin>
        </div>
        <Modal
          open={this.state.editUser}
          onClose={this.handleEditUserClose.bind(this)}
          modalId="EditUserMerModal"
          overlayId="overlay"
        >
          <img
            src={CloseIcon}
            alt="CloseIcon"
            className="closeicon"
            onClick={this.handleEditUserClose.bind(this)}
          />
          <div className="edituser">
            <h3 className="eduser">Edit Merchant</h3>
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
                <span className="active">Inactive</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <label>Subscription Type</label>
                <input type="text" placeholder="Subscription Type" />
              </div>
              <div className="col-12 col-md-6">
                <label>Subscription Period</label>
                <input type="text" placeholder="Subscription Period" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <label>Subscription Status</label>
                <select>
                  <option>Subscription Status</option>
                  <option>Subscription Status 1</option>
                  <option>Subscription Status 2</option>
                </select>
              </div>
            </div>
            <div className="Editbtn">
              <button className="btn">SAVE</button>
            </div>
          </div>
        </Modal>
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
                    name="merchantId"
                    value={this.state.merchantId}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="merchantName"
                    value={this.state.merchantName}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="merchantEmailId"
                    value={this.state.merchantEmailId}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Contact No."
                    name="merchantContactNo"
                    value={this.state.merchantContactNo}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total No. of Transaction upto"
                    name="merchantTotalTransactionCountTo"
                    value={this.state.merchantTotalTransactionCountTo}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total Amount Transacted upto"
                    name="merchantTotalTransactionAmountTo"
                    value={this.state.merchantTotalTransactionAmountTo}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                {/* <div className="col-12 col-md-3">
                                <label className="Totalamount">Total No. of Transaction upto</label>
                                <div className="slidecontainer">
                                    <input type="range" min="1" max="100" value="50" />
                                </div>
                            </div> */}
                {/* <div className="col-12 col-md-3">
                                <label className="Totalamount">Total Amount Transacted upto</label>
                                <div className="slidecontainer">
                                    <input type="range" min="1" max="100" value="50" />
                                </div>
                            </div> */}
                <div className="col-12 col-md-3">
                  {/* <input type="text" className="calendar" placeholder="Start Date - End Date" /> */}
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
                    <option>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <select
                    name="subscriptionType"
                    value={this.state.subscriptionType}
                    onChange={this.handleOnChange.bind(this)}
                  >
                    <option>Select Subscription Type</option>
                    {this.state.subscriptionTypePeriod &&
                      this.state.subscriptionTypePeriod.map((type) => (
                        <option value={type.planName}>{type.planName}</option>
                      ))}
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <select
                    name="subscriptionPeriod"
                    value={this.state.subscriptionPeriod}
                    onChange={this.handleOnChange.bind(this)}
                  >
                    <option>Select Subscription Period</option>
                    {this.state.subscriptionTypePeriod &&
                      this.state.subscriptionTypePeriod.map((period) => (
                        <option value={period.planDuration}>
                          {period.planDuration}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <select
                    name="subscriptionStatus"
                    value={this.state.subscriptionStatus}
                    onChange={this.handleOnChange.bind(this)}
                  >
                    <option>Select Subscription Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-12 col-md-3">
                  <select
                    name="approvalStatus"
                    value={this.state.approvalStatus}
                    onChange={this.handleOnChange.bind(this)}
                  >
                    <option>Select Approval Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
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
                      onClick={this.handleGetMerchantManagementList.bind(this)}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default adminMerchantManagement;
