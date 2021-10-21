import React, { Component } from "react";
import config from "../../../helpers/config";
import axios from "axios";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";
import leftarrow from "./../../../assets/Images/leftarrow.png";
import Down from "./../../../assets/Images/download.png";
import Visa from "./../../../assets/Images/visa.png";
import MasterCard from "./../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import { Table, Popover, DatePicker, Spin } from "antd";

import { NotificationManager } from "react-notifications";

class splitTransactionHistoryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merchantData: {},
      transacion_Id: "",
      order_Id: "",
      user_Id: 0,
      transactionHistoryDetails: {},
      transactionHistoryData: [],
      visible: {}
    };
  }

  componentDidMount() {
    var transactionId = this.props.location.transactionId;
    var orderId = this.props.location.orderId;
    var userId = this.props.location.userId;
    if (orderId) {
      this.setState({
        transacion_Id: transactionId,
        order_Id: orderId,
        user_Id: userId,
      });
      this.handleGetTransactionHistoryDetailsList(
        transactionId,
        orderId,
        userId
      );
    } else {
      this.props.history.push("transaction-history");
    }
  }

  handleGetTransactionHistoryDetailsList(transactionIds, orderId, userId) {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "OnePayMerchantTransaction/TransactionHistoryDetails",
      headers: merchantAuthHeader(),
      data: {
        TransactionId: transactionIds,
        OrderId: orderId,
        UserId: userId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            transactionHistoryDetails: data[0],
            transactionHistoryData: data
          });
        } else {
          self.setState({
            transactionHistoryDetails: {},
            transactionHistoryData: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleBack = () => {
    this.props.history.push("transaction-history");
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

  // handleMerchantRefund(orderId, merchantOrderId, transactionID) {
  //   
  //   let self = this;
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "OnePayMerchantTransaction/merchanrapporveRefund",
  //     headers: authHeader(),
  //     data: {
  //       OrderId: orderId,
  //       merchantOrderID: merchantOrderId
  //     },
  //   })
  //     .then(function (res) {
  //       
  //       let status = res.data.message;
  //       let responseData = res.data.responseData;
  //       if (status === "Success") {
  //         NotificationManager.success("Record refunded successfully.");     
  //         // self.setState({
  //         //   userData: data,
  //         //   userTransactionDetails: data.userTransactions,
  //         // });
  //       } else {
  //         NotificationManager.error(responseData);
  //         // self.setState({
  //         //   userData: {},
  //         //   userTransactionDetails: [],
  //         // });
  //       }
  //       self.hide(
  //         this,
  //         "merchant_" + transactionID
  //       ) 
  //       self.handleGetTransactionHistoryList();
  //     })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  render() {
    const columns = [
      // {
      //   title: "Merchant Order Id",
      //   dataIndex: "merchantOrderID",
      //   key: "merchantOrderID",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // }, 
      {
        title: "Transaction Id",
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
        render: (row, item) => {
          return(
            <div>
              <label>{!item.isRefundSuccess ? item.transactionDate: "-"}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']

      },
      {
        title: "Expected Payment Date",
        dataIndex: "expectedPaymentDate",
        key: "expectedPaymentDate",
        render: (row, item) => {
          return(
            <div>
              <label>{!item.isRefundSuccess ? item.expectedPaymentDate: "-"}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']

      },
      {
        title: "Refund Date",
        dataIndex: "refundedDate",
        key: "refundedDate",
        render: (row, item) => {
          return(
            <div>
              <label>{item.isRefundSuccess ? item.refundDate: "-"}</label>
            </div>
          );
        },
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
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
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
      {
        title: "Payment Mode",
        dataIndex: "customerCard",
        key: "customerCard",
        className: "mob-none",
        render: (row, item) =>
          item.customerCard.toLowerCase().trim() === "visa" ? (
            <img src={Visa} alt="icon missing" className="cards-icon" />
          ) : item.customerCard.toLowerCase().trim() === "mastercard" ? (
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
        title: "Card Number",
        dataIndex: "customerCardNumber",
        key: "customerCardNumber",
        sorter: (a, b) => {
          return a.customerCardNumber.localeCompare(b.customerCardNumber)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Status",
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
            } else if (item.paymentStatus.toLowerCase().trim() === "success" || item.paymentStatus.toLowerCase().trim() === "succeeded") {
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
      // {
      //   title: "Refund Transaction ID",
      //   dataIndex: "refundTransID",
      //   key: "refundTransID",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Action",
      //   key: "refundStatus",
      //   dataIndex: "refundStatus",
      //   render: (row, item) => {
      //     return (item.transactionID !== ""?((item.isMerchantRefundinitiated == false &&
      //       item.isRefundSuccess == false) ?
      //       (<Popover content={
      //         <div className="deletepopover text-center" id={"merchant_" + item.transactionID}>
      //           <h3>Are you sure to refund ?</h3>
      //           <button className="delete" onClick={() =>
      //             this.hide(
      //               this,
      //               "merchant_" + item.transactionID
      //             )}>Cancel</button>
      //           <button className="delete"
      //             onClick={this.handleMerchantRefund.bind(this, item.orderId, item.merchantOrderID, item.transactionID)}
      //             >Refund</button>
      //         </div>
      //       }
      //         placement="left"
      //         trigger="click"
      //         visible={this.state.visible["merchant_" + item.transactionID] == undefined ? false :
      //           this.state.visible["merchant_" + item.transactionID]}
      //       >
      //         <div className="approve">
      //           <button onClick={() =>
      //             this.show(this, "merchant_" + item.transactionID)
      //           } >Refund</button>
      //         </div>
      //       </Popover>) :
      //       (item.isMerchantRefundinitiated == true &&
      //       item.isRefundSuccess == false) ? "Refund Failed" : "Refund Success"):null)
      //   }
      // }
    ];

    return (
      <div className="mermanadetail">
        <h3 className="Usermana" onClick={this.handleBack}><img src={leftarrow} alt="backarrow" /> Transaction History Details</h3>
        <div className="row mt-3 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Name</label>
            <label>{this.state.transactionHistoryDetails.userName}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Email</label>
            <label>{this.state.transactionHistoryDetails.emailId}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Contact No.</label>
            <label>{this.state.transactionHistoryDetails.contactNumber}</label>
          </div>
        </div>
        <div className="row usdetailtext">
          <div className="col-12 col-md-4">
            <label>Order Id</label>
            <label>{this.state.transactionHistoryDetails.orderId}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Order Id</label>
            <label>{this.state.transactionHistoryDetails.merchantOrderID}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Order Amount</label>
            <label>{"$"}{this.state.transactionHistoryDetails.actualAmount}</label>
          </div>
        </div>
          {/* <div className="col-12 col-md-4">
            <label>Refund Transaction Id</label>
            <label>{this.state.transactionHistoryDetails.refundTransID !== ""?
                   this.state.transactionHistoryDetails.refundTransID:"-"}</label>
          </div> */}
        {this.state.transactionHistoryDetails.paymentStatus &&
          this.state.transactionHistoryDetails.paymentStatus
            .toLowerCase()
            .trim() === "refunded" && (
            <div className="row mb-4 usdetailtext">
              <div className="col-12 col-md-4">
                <label>Refunded Date</label>
                <label>{this.state.transactionHistoryDetails.refundDate}</label>
              </div>
            </div>
          )}
          <div className="MerchantrHistorytable">
          {/* <Spin spinning={this.state.loading}> */}
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
              rowClassName={(record) => record.isRefundSuccess ? 'ant-table-row active-row1' : 'ant-table-row' }
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
            />
          {/* </Spin> */}
        </div>
      </div>
    );
  }
}

export default splitTransactionHistoryDetails;
