import React, { Component } from "react";
import Filter from "./../../../assets/Images/filter.png";
import CSV from "./../../../assets/Images/csv.png";
import WhiteDropdown from "./../../../assets/Images/WhiteDropdown.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import { Table, Popover, DatePicker, Spin } from "antd";
import config from "../../../helpers/config";
import axios from "axios";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";
import { CSVLink } from "react-csv";
import { Drawer } from "antd";
import Down from "./../../../assets/Images/download.png";
import Visa from "./../../../assets/Images/visa.png";
import MasterCard from "./../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import moment from 'moment';
import { NotificationManager } from "react-notifications";

const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";

class splitTransactionHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
      transactionHistoryData: [],
      orderId: "",
      merchantorderId: "",
      customerName: "",
      emailId: "",
      contactNo: "",
      startDate: null,
      endDate: null,
      transactionAmountFrom: "",
      transactionAmountTo: "",
      CustomerName: "",
      MerchantId: "",
      visibleFilter: false,
      placement: "bottom",
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      transactionCSVData: [],
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
  handleFilterbuttonClick = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };

  componentDidMount() {
    this.handleGetTransactionHistoryList();
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

  handleValidation() {
    let errors = {};
    let formIsValid = true;
    if (
      this.state.transactionAmountFrom !== "" &&
      this.state.transactionAmountTo !== ""
    ) {
      if (
        parseInt(this.state.transactionAmountFrom) >
        parseInt(this.state.transactionAmountTo)
      ) {
        formIsValid = false;
        errors["transactionAmountFrom"] =
          "Transaction from should be less than transaction to.";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleGetTransactionHistoryList(pagination, sorter) {
    
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    self.setState({
      loading: true
    });
    if (this.handleValidation()) {
      axios({
        method: "post",
        url: config.apiUrl + "OnePayMerchantTransaction/TransactionHistory",
        headers: merchantAuthHeader(),
        data: {
          OrderId: this.state.orderId,
          MerchantOrderID: this.state.merchantorderId,
          CustomerName: this.state.customerName,
          StartDate: startDate,
          EndDate: endDate,
          TransactionAmountFrom:
            this.state.transactionAmountFrom == ""
              ? 0
              : parseInt(this.state.transactionAmountFrom),
          TransactionAmountTo:
            this.state.transactionAmountTo == ""
              ? 0
              : parseInt(this.state.transactionAmountTo),
          EmailId: this.state.emailId,
          ContactNumber: this.state.contactNo,
          // SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "createdDate") : "createdDate",
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
            self.setState({
              transactionHistoryData: data,
              loading: false,
              pagination: paging
            });
          } else {
            paging.total = 0
            self.setState({
              transactionHistoryData: [],
              loading: false,
              pagination: paging
            });
          }

          self.handleGetTransactionHistoryCSV(pagination, sorter);
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }

  handleGetTransactionHistoryCSV(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantTransaction/TransactionHistory",
      headers: merchantAuthHeader(),
      data: {
        OrderId: this.state.orderId,
        StartDate: startDate,
        EndDate: endDate,
        TransactionAmountFrom:
          this.state.transactionAmountFrom == ""
            ? 0
            : parseInt(this.state.transactionAmountFrom),
        TransactionAmountTo:
          this.state.transactionAmountTo == ""
            ? 0
            : parseInt(this.state.transactionAmountTo),
        EmailId: this.state.emailId,
        ContactNumber: this.state.contactNo,
        //SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "createdDate") : "createdDate",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            transactionCSVData: data
          });
        } else {
          self.setState({
            transactionCSVData: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleRowClickPage(transactionID, orderID, userID) {
    
    let self = this;

    setTimeout(function () {
      self.props.history.push({
        pathname: "transaction-history-details",
        transactionId: transactionID,
        orderId: orderID,
        userId: userID,
      });
    }, 1000);
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDateOnChange = (dates, dateStrings) => {
    if (dates !== null) {
      this.setState({ startDate: dates[0]._d, endDate: dates[1]._d });
    } else {
      this.setState({ startDate: null, endDate: null });
    }
    // this.setState({ startDate: dateStrings[0], endDate: dateStrings[1] });
  };

  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.setState({ visible: {} })
    this.handleGetTransactionHistoryList(pagination, sorter)
  }

  handleSearch() {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetTransactionHistoryList(pagination)
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

  handleMerchantRefund(orderId, merchantOrderId) {
    
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantTransaction/merchanrapporveRefund",
      headers: merchantAuthHeader(),
      data: {
        OrderId: orderId,
        merchantOrderID: merchantOrderId
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let responseData = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Record refunded successfully.");
          // self.setState({
          //   userData: data,
          //   userTransactionDetails: data.userTransactions,
          // });
        } else {
          NotificationManager.error(responseData);
          // self.setState({
          //   userData: {},
          //   userTransactionDetails: [],
          // });
        }
        self.hide(
          this,
          "merchant_" + orderId
        )
        self.handleGetTransactionHistoryList();
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
    const merchantinfo = (
      <div className="merrefunfpopover">
        <div className="subsc">
          <label>Refund</label>
          <label>xyz Refund</label>
        </div>
        <div className="subsc">
          <label>Refund</label>
          <label>xyz Refund</label>
        </div>
        <div className="subsc">
          <label>Refund</label>
          <label>xyz Refund</label>
        </div>
      </div>
    );
    const DeleteUser = (
      <div className="deletepopover text-center">
        <h3>Are you sure to refund ?</h3>
        <button className="delete">Cancel</button>
        <button className="refundbt">Refund</button>
      </div>
    );

    const headers = [
      { label: "Transaction Date", key: "transactionDate" },
      { label: "Order Id", key: "orderId" },
      { label: "Customer Name", key: "userName" },
      { label: "Merchant Order Id", key: "merchantOrderID" },
      { label: "Transaction Id", key: "transactionID" },
      { label: "Transaction Value (AU$)", key: "amount" },
      { label: "Email", key: "emailId" },
      { label: "Contact Number", key: "contactNumber" },
      { label: "Payment Details", key: "customerCard" },
      { label: "Status", key: "paymentStatus" },
    ];

    const columns = [
      {
        title: "Order Id",
        dataIndex: "orderId",
        key: "orderId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']

      },
      {
        title: "Installments",
        dataIndex: "installment",
        key: "installment",
        className: "mob-none",
        render: (row, item) =>
          item.installment === "-" ? (
            item.installment
          ) : (
              <span
                className="custom-link"
                onClick={() =>
                  this.handleRowClickPage(
                    item.transactionID,
                    item.orderId,
                    item.userID
                  )
                }
              >
                {item.installment}
              </span>
            ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Customer Name",
        dataIndex: "userName",
        key: "userName",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']

      },
      {
        title: "Merchant Order Id",
        dataIndex: "merchantOrderID",
        key: "merchantOrderID",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']

      },
      {
        title: "Transaction Value (AU$)",
        dataIndex: "amount",
        key: "amount",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div>
              <label>{"$"}{item.amount}</label>
              {/* <label>{item.isRefundSuccess ? "-$" : "$"}{item.amount}</label> */}
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Action",
        key: "refundStatus",
        dataIndex: "refundStatus",
        render: (row, item) => {
          return (item.paymentStatus == "Success" && item.blockStatus == "Success" ?
            ((item.isMerchantRefundinitiated == false &&
              item.isRefundSuccess == false) ?
              (<Popover content={
                <div className="deletepopover text-center" id={"merchant_" + item.orderId}>
                  <h3>Are you sure to refund ?</h3>
                  <button className="delete" onClick={(e) => {
                    e.stopPropagation();
                    this.hide(
                      this,
                      "merchant_" + item.orderId
                    )
                  }}>Cancel</button>
                  <button className="delete"
                    onClick={(e) => { e.stopPropagation(); this.handleMerchantRefund(item.orderId, item.merchantOrderID) }}
                  >Refund</button>
                </div>
              }
                placement="left"
                trigger="click"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                visible={this.state.visible["merchant_" + item.orderId] == undefined ? false :
                  this.state.visible["merchant_" + item.orderId]}
              >
                <div className="approve">
                  <button onClick={() =>
                    this.show(this, "merchant_" + item.orderId)
                  } >Refund</button>
                </div>
              </Popover>) :
              (item.isMerchantRefundinitiated == true &&
                item.isRefundSuccess == false) ? "Refund Failed" : "Refund Success") : null)
        }
      }
      // {
      //   title: "Email",
      //   dataIndex: "emailId",
      //   key: "emailId",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Contact Number",
      //   dataIndex: "contactNumber",
      //   key: "contactNumber",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },

    ];

    return (
      <div className="MerTraHistory">
        <h3 className="Usermana">Transaction History</h3>
        <div className="exfilter">
          <CSVLink
            data={this.state.transactionCSVData}
            headers={headers}
            filename={"Transaction History.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label
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
                placeholder="Enter Order Id"
                name="orderId"
                value={this.state.orderId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Merchant Order Id"
                name="merchantorderId"
                value={this.state.merchantorderId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter customer Name"
                name="customerName"
                value={this.state.customerName}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Email"
                name="emailId"
                value={this.state.emailId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Contact No."
                name="contactNo"
                value={this.state.contactNo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <RangePicker
                className="calendar"
                format={dateFormat}
                onChange={this.handleDateOnChange}
                disabledDate={disabledDate}
              ></RangePicker>
            </div> */}
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total Amount Txn From"
                name="transactionAmountFrom"
                value={this.state.transactionAmountFrom}
                onChange={this.handleOnChange.bind(this)}
              />
              <span className="Error">
                {this.state.errors["transactionAmountFrom"]}
              </span>
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total Amount Txn To"
                name="transactionAmountTo"
                value={this.state.transactionAmountTo}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            <div className="col-12 col-md-3">
              <div className="search text-left">
                <button className="m-0"
                  onClick={this.handleSearch.bind(this)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="MerchantrHistorytable">
          <Spin spinning={this.state.loading}>
            <Table
              columns={columns}
              // rowClassName={(record) => record.isRefundSuccess ? 'ant-table-row active-row1' : 'ant-table-row' }
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Date:</label>
                          <label className="expandemailtext">{row.transactionDate}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Order Id:</label>
                          <label className="expandemailtext">{row.orderId}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Transaction Id:</label>
                          <label className="expandemailtext">{row.transactionID}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Transaction Value (AU$):</label>
                          <label className="expandemailtext">{row.amount}</label>
                        </div>
                      </div>
                    </div>
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
                          <label className="expandemailtext">{row.contactNumber}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Payment Details:</label>
                          <label className="expandemailtext">{row.customerCard}</label>
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
              dataSource={this.state.transactionHistoryData}
              pagination={{
                current: this.state.pagination.current,
                pageSize: this.state.pagination.pageSize,
                total: this.state.pagination.total,
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
              onRow={(row, item) => ({
                onClick: () =>
                  this.handleRowClickPage(
                    row.transactionID,
                    row.orderId,
                    row.userID
                  ),
              })}
              onChange={this.onShowSizeChange}
            />
          </Spin>
        </div>
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
                    placeholder="Enter Order Id"
                    name="orderId"
                    value={this.state.orderId}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="emailId"
                    value={this.state.emailId}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Contact No."
                    name="contactNo"
                    value={this.state.contactNo}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <RangePicker
                    className="calendar"
                    format={dateFormat}
                    onChange={this.handleDateOnChange}
                    disabledDate={disabledDate}
                  ></RangePicker>
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total Amount Transacted From"
                    name="transactionAmountFrom"
                    value={this.state.transactionAmountFrom}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total Amount Transacted To"
                    name="transactionAmountTo"
                    value={this.state.transactionAmountTo}
                    onChange={this.handleOnChange.bind(this)}
                  />
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
                      onClick={this.handleGetTransactionHistoryList.bind(this)}
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

export default splitTransactionHistory;
