import React, { Component } from "react";
import Total from "./../../../assets/Images/total.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import Visa from "./../../../assets/Images/visa.png";
import MasterCard from "./../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import { Table, Popover } from "antd";
import Modal from "react-responsive-modal";
import config from "../../../helpers/config";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import axios from "axios";
import Down from "./../../../assets/Images/download.png";
import auccessfultransactions from "./../../../assets/Images/auccessfultransactions.png";
import failedtransactions from "./../../../assets/Images/failedtransactions.png";
import successrefunds from "./../../../assets/Images/successrefunds.png";
import moneytransfer from "./../../../assets/Images/moneytransfer.png";
import { NavLink } from "react-router-dom";

class splitUserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashlog: false,
      totalSuccessTransaction: 0,
      totalFailedTransaction: 0,
      totalPendingRefund: 0,
      totalAmountTransaction: 0,
      gridData: [],
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  }
  handledashlogmodalOpen() {
    this.setState({ dashlog: true });
  }
  handledashlogmodalClose() {
    this.setState({ dashlog: false });
  }
  componentDidMount() {
    this.handleGetDashboardCardsData();
    this.handleGetDashboardGridData();
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
  handleGetDashboardCardsData() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "OnePayUserDashboard/CustomerDashboardCarts",
      headers: userAuthHeader(),
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            totalSuccessTransaction: data.totalSuccessTransaction,
            totalFailedTransaction: data.totalFailedTransaction,
            totalPendingRefund: data.totalPendingRefund,
            totalAmountTransaction: data.totalAmountTransaction,
          });
        } else {
          self.setState({
            totalSuccessTransaction: 0,
            totalFailedTransaction: 0,
            totalPendingRefund: 0,
            totalAmountTransaction: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  // handleInstallmentsClickPage(merchantId) {
  //   
  //   let self = this;

  //   setTimeout(function () {
  //     self.props.history.push({
  //       pathname: "adminMerchantManagementDetails",
  //       merchantId: merchantId,
  //     });
  //   }, 1000);
  // }

  handleInstallmentsDetails(installmentsDetails) {
    

    // setTimeout(function () {
    this.props.history.push({
      pathname: "installmentDetails",
      installmentsDetails: installmentsDetails,
    });
    // }, 1000);
  }

  handleGetDashboardGridData(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true
    });
    // let formData = new FormData();
    // formData.append("OrderID", null);
    // formData.append("TransactionID", null);
    // formData.append("TransactionDateFrom", null);
    // formData.append("TransactionDateTo", null);
    // formData.append("TransactionAmount", 0.0);
    // formData.append("UserName", null);
    // formData.append("MerchantName", null);
    // formData.append("PaymentProcessor", null);
    // formData.append("PaymentMethod", null);
    // formData.append("CustomerCard", null);
    // formData.append("PaymentStatus", null);

    // let formData = new FormData();
    // let abc = {
    //   OrderID: null,
    //   TransactionID: null,
    //   TransactionDateFrom: null,
    //   TransactionDateTo: null,
    //   TransactionAmount: 0.0,
    //   UserName: null,
    //   MerchantName: null,
    //   PaymentProcessor: null,
    //   PaymentMethod: null,
    //   CustomerCard: null,
    //   PaymentStatus: null,
    // };
    // formData.append("customertransactionhistory", abc);

    axios({
      method: "post",
      url: config.apiUrl + "OnePayUserDashboard/CustomerTransactionHistory",
      headers: userAuthHeader(),
      data: {
        OrderID: "",
        TransactionID: "",
        TransactionDateFrom: null,
        TransactionDateTo: null,
        TransactionAmount: 0.0,
        UserName: "",
        MerchantName: "",
        PaymentProcessor: "",
        PaymentMethod: "",
        CustomerCard: "",
        PaymentStatus: "",
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "orderID") : "orderID",
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
            gridData: data,
            loading: false,
            pagination: paging
          });
        } else {
          self.setState({
            gridData: [],
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
    this.handleGetDashboardGridData(pagination, sorter)
  }

  render() {
    const merchantinfo = (
      <div className="userDashpopover">
        <div className="subsc">
          <label>Bank Name</label>
          <label>ICICI Bank</label>
        </div>
        <div className="subsc">
          <label>Bank Branch</label>
          <label>Kandivali</label>
        </div>
      </div>
    );
    const columns = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transaction ID",
        dataIndex: "transactionID",
        key: "transactionID",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transaction Date",
        dataIndex: "transactionDate",
        key: "transactionDate",
        className: "mob-none",
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
                this.handleInstallmentsDetails({
                  orderId: item.orderId,
                  merchantId: item.merchantId,
                })
              }
            >
              {item.installment}
            </span>
          ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Amount Transacted (AU$)",
        dataIndex: "transactionAmount",
        key: "transactionAmount",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Processor",
        dataIndex: "paymentProcessor",
        key: "paymentProcessor",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Method ",
        dataIndex: "customerCard",
        key: "customerCard",
        className: "mob-none",
        render: (row, item) =>
          item.customerCard.toLowerCase().trim() === "visa" ? (
            <img src={Visa} alt="icon missing" className="cards-icon" />
          ) : item.customerCard.toLowerCase().trim() === "master card" ? (
            <img src={MasterCard} alt="icon missing" className="cards-icon" />
          ) : item.customerCard.toLowerCase().trim() === "american express" ? (
            <img
              src={AmericanExpress}
              alt="icon missing"
              className="cards-icon"
            />
          ) : item.customerCard.toLowerCase().trim() === "diner club" ? (
            <img src={DinerClub} alt="icon missing" className="cards-icon" />
          ) : (
            item.customerCard
          ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label
                className={
                  item.paymentStatus.toLowerCase().trim() === "failed"
                    ? "failed"
                    : item.paymentStatus.toLowerCase().trim() === "success"
                      ? "success"
                      : item.paymentStatus.toLowerCase().trim() === "progress"
                        ? "custom-link"
                        : "refundtext"
                }
              >
                {item.paymentStatus}
              </label>
              <Popover
                content={
                  <div className="refundpopover">
                    <div className="subsc">
                      <label>Refund Amount</label>
                      <label>{item.refundAmount}</label>
                    </div>
                    <div className="subsc">
                      <label>Refund Date</label>
                      <label>{item.refundedDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Refund Initiated By</label>
                      <label>{item.refundInitiated}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="hover"
              >
                {item.paymentStatus === "Refunded" && (
                  <img src={InfoIcon} alt="InfoIcon" />
                )}
              </Popover>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
    ];

    return (
      <div>
        <div className="Userdashboard">
          <h3 className="dash">Dashboard</h3>
          <div className="row mt-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/onePayUser/userTransaction">
                <div className="card back1">
                  <div className="image">
                    <img src={auccessfultransactions} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Successful Transactions</label>
                    <label>{this.state.totalSuccessTransaction}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/onePayUser/userTransaction">
                <div className="card back2">
                  <div className="image">
                    <img src={failedtransactions} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Failed Transactions</label>
                    <label>{this.state.totalFailedTransaction}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/onePayUser/userTransaction">
                <div className="card back3">
                  <div className="image">
                    <img src={successrefunds} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Success Refunds</label>
                    <label>{this.state.totalPendingRefund}</label>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <NavLink to="/onePayUser/userTransaction">
                <div className="card back4">
                  <div className="image">
                    <img src={moneytransfer} alt="Card1" />
                  </div>
                  <div className="text">
                    <label>Total Amount Spent using One Pay (AU$)</label>
                    <label>{this.state.totalAmountTransaction}</label>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 col-md-12">
              <div className="Userdashtable">
                <Table
                  columns={columns}
                  expandedRowRender={(row) => {
                    return (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Order ID:</label>
                              <label className="expandemailtext">{row.orderId}</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Transaction ID:</label>
                              <label className="expandemailtext">{row.transactionID}</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Transaction Date:</label>
                              <label className="expandemailtext">{row.transactionDate}</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Installments:</label>
                              <label className="expandemailtext">{row.installment}</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Amount Transacted (AU$):</label>
                              <label className="expandemailtext">{row.transactionAmount}</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Merchant:</label>
                              <label className="expandemailtext">{row.merchantName}</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Payment Processor:</label>
                              <label className="expandemailtext">{row.paymentProcessor}</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Payment Method:</label>
                              <label className="expandemailtext">{row.customerCard}</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="mobilevi">
                              <label className="expandemail">Status:</label>
                              <label className="expandemailtext">{row.paymentStatus}</label>
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
                  expandIconColumnIndex={this.state.mobileView ? 10 : -1}
                  expandIconAsCell={false}
                  dataSource={this.state.gridData}
                  // onRow={(row, item) => ({
                  //   onClick:
                  //     row.installment === "-"
                  //       ? null
                  //       : () => this.handleInstallmentsClickPage(row),
                  // })}
                  pagination={{
                    current: this.state.pagination.current,
                    pageSize: this.state.pagination.pageSize,
                    total: this.state.pagination.total,
                    position: ["bottomCenter"],
                    showSizeChanger: true
                  }}
                  onChange={this.onShowSizeChange}
                />
              </div>
            </div>
          </div> */}
          <Modal
            open={this.state.dashlog}
            onClose={this.handledashlogmodalClose.bind(this)}
            modalId="dashmodaluser"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Congratulation!!</h3>
            </div>
            <div className="edituser">
              <p>Add Card Details to enjoy our services.</p>

              <div className="Editbtn">
                <button className="btn">Add</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default splitUserDashboard;
