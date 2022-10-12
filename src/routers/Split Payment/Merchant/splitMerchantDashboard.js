import React, { Component } from "react";
import Total from "./../../../assets/Images/total.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import { Table, Popover, Spin } from "antd";
import config from "./../../../helpers/config";
import axios from "axios";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";
import Down from "./../../../assets/Images/download.png";
import TotalUsers from "./../../../assets/Images/TotalUsers.png";
import sales from "./../../../assets/Images/sales.png";
import salesuseonepay from "./../../../assets/Images/salesuseonepay.png";
import moneytransfer from "./../../../assets/Images/moneytransfer.png";
import { NavLink } from "react-router-dom";
import dashboard from "./../../../assets/Images/dashboard.png";
import merchant from "./../../../assets/Images/merchant.png";
import user from "./../../../assets/Images/user.png";

class splitMerchantDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMonthSales: 0,
      dailySales: 0,
      numberofUsersCount: 0,
      totalOrder: 0,
      transactionHistoryData: [],
      mobileView: false,
      loading: false,
      module: "",
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  }

  componentDidMount() {
    var module = window.localStorage.getItem("OnePayMerchantModule");
    this.handleGetMerchantDashboard();
    this.handleGetTransactionHistoryList();
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
        module
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
  }

  handleGetMerchantDashboard() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayMerchantDashboard/DashboardCarts",
      headers: merchantAuthHeader(),
    })
      .then(function (res) {

        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            currentMonthSales: data.currentMonthSales,
            dailySales: data.dailySales,
            numberofUsersCount: data.numberofUsersCount,
            totalOrder: data.totalOrder,
          });
        } else {
          self.setState({
            currentMonthSales: 0,
            dailySales: 0,
            numberofUsersCount: 0,
            totalOrder: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetTransactionHistoryList(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true
    });
    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantDashboard/transactionhistorydashboard",
      headers: merchantAuthHeader(),
      data: {
        OrderId: "",
        StartDate: null,
        EndDate: null,
        TransactionAmountFrom: 0,
        TransactionAmountTo: 0,
        EmailId: "",
        ContactNumber: "",
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "userName") : "userName",
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
          paging.total = 0;
          self.setState({
            transactionHistoryData: [],
            loading: false,
            pagination: paging
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  onShowSizeChange = (pagination, pagesize, sorter) => {
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

  render() {
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
    const columns = [
      {
        title: "Date",
        dataIndex: "transactionDate",
        key: "transactionDate",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Order Id",
        dataIndex: "orderId",
        key: "orderId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transaction Id",
        dataIndex: "transactionID",
        key: "transactionID",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transaction Value (AU$)",
        dataIndex: "amount",
        key: "amount",
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
        title: "Contact Number",
        dataIndex: "contactNumber",
        key: "contactNumber",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Details",
        dataIndex: "customerCard",
        key: "customerCard",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        className: "mob-none",
        render: (row, item) => {
          return (() => {
            if (item.paymentStatus.toLowerCase().trim() === "refunded") {
              return (
                <div className="amazontext">
                  <label className="refundtext">{item.paymentStatus}</label>
                  <Popover
                    content={
                      <div className="merrefunfpopover">
                        <div className="subsc">
                          <label>Refunded Date:</label>
                          <label>{item.refundDate}</label>
                        </div>
                      </div>
                    }
                    placement="bottom"
                    trigger="click"
                  >
                    <img src={InfoIcon} alt="InfoIcon" />
                  </Popover>
                </div>
              );
            } else if (item.paymentStatus.toLowerCase().trim() === "success") {
              return (
                <div className="amazontext">
                  <label className="success">{item.paymentStatus}</label>
                </div>
              );
            } else if (item.paymentStatus.toLowerCase().trim() === "failed") {
              return (
                <div className="amazontext">
                  <label className="failed">{item.paymentStatus}</label>
                </div>
              );
            } else if (item.paymentStatus.toLowerCase().trim() === "progress") {
              return (
                <div className="amazontext">
                  <label className="custom-link">{item.paymentStatus}</label>
                </div>
              );
            } else if (
              item.paymentStatus.toLowerCase().trim() === "refund init"
            ) {
              return (
                <div className="amazontext">
                  <label className="refundtext">{item.paymentStatus}</label>
                </div>
              );
            }
          })();
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
    ];

    return (
      <div>
        <div className="blue_line">
        </div>
        <div className="Merchantdashboard">
          <div className="dash_link">
            <ul className="header-left">
              {(() => {
                if (this.state.module.includes('Dashboard')) {
                  return (
                    <li>
                      <NavLink to="/onePayMerchant/dashboard">
                        <div className="header-icons">
                          <img src={dashboard} alt="icon missing" />
                        </div>
                        <span className="ml-2">Dashboard</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {(() => {
                if (this.state.module.includes('Transaction History')) {
                  return (
                    <li>
                      <NavLink to="/onePayMerchant/transaction-history">
                        <div className="header-icons">
                          <img src={user} alt="icon missing" />
                        </div>
                        <span className="ml-2">Transaction History</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
              {/* <li>
          <Link to="/merchant/salesReport">
            <div className="header-icons">
              <img src={merchant} alt="icon missing" />
            </div>
            <span className="ml-2">Sales Report</span>
          </Link>
        </li> */}
              {(() => {
                if (this.state.module.includes('Subscription')) {
                  return (
                    <li>
                      <NavLink to="/onePayMerchant/merchantSubscription">
                        <div className="header-icons">
                          <img src={merchant} alt="icon missing" />
                        </div>
                        <span className="ml-2">Subscription</span>
                      </NavLink>
                    </li>
                  )
                }
              })()}
            </ul>
          </div>
          <h3 className="dash">Dashboard</h3>
          <div className="row mt-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <NavLink to="/onePayMerchant/transaction-history">
                <div className="card back1">
                  <div className="image">
                    <img src={salesuseonepay} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Daily Sales Using One Pay (AU$)</label>
                    <label>{this.state.dailySales}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <NavLink to="/onePayMerchant/transaction-history">
                <div className="card back2">
                  <div className="image">
                    <img src={sales} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Current Month Sales (AU$)</label>
                    <label>{this.state.currentMonthSales}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <NavLink to="/onePayMerchant/transaction-history">
                <div className="card back3">
                  <div className="image">
                    <img src={TotalUsers} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Number of Customers Count</label>
                    <label>{this.state.numberofUsersCount}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
              <NavLink to="/onePayMerchant/transaction-history">
                <div className="card back4">
                  <div className="image">
                    <img src={moneytransfer} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Orders Using One Pay</label>
                    <label>{this.state.totalOrder}</label>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 col-md-12">
              <div className="Merchantdashtable">
                <Spin spinning={this.state.loading}>
                  <Table
                    columns={columns}
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
                    onChange={this.onShowSizeChange}
                  />
                </Spin>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default splitMerchantDashboard;
