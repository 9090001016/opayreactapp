import React, { Component } from "react";
import { Table, Popover } from "antd";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import CSV from "./../../../../assets/Images/csv.png";
import config from "../../../../helpers/config";
import { authHeader } from "../../helpers/splitAuthHeader";
import axios from "axios";
import Visa from "./../../../../assets/Images/visa.png";
import MasterCard from "./../../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../../assets/Images/american-express.png";
import DinerClub from "./../../../../assets/Images/diners-club.png";
import leftarrow from "./../../../../assets/Images/leftarrow.png";
import { CSVLink } from "react-csv";
import visa from "./../../../../assets/Images/visa.png";
import mastercard from "./../../../../assets/Images/mastercard.png";
import americanexpress from "./../../../../assets/Images/american-express.png";

class splitInstallmentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installmentsGridData: [],
      userTransactionDetails: [],
      merchantorid: null,
      orderrid: null,
    };
  }
  componentDidMount() {
    
    const installmentDetails = this.props.location.installmentsDetails;
    if (installmentDetails) {
      this.handleGetInstallmentsGridData(installmentDetails);
    } else {
      this.props.history.push("paymentManagement");
    }
  }

  handleGetInstallmentsGridData(installmentDetails) {
    let self = this;
    debugger;
    axios({
      method: "post",
      url:
        config.apiUrl +
        "OnePayPaymentManagement/CustomerInstallmentTransactionManagement",
      headers: authHeader(),
      data: {
        OrderId: installmentDetails.orderId,
        MerchantId: installmentDetails.merchantId,
        UserId: installmentDetails.userId,
      },
    })
      .then(function (res) {
        debugger;
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          let merchantorid = data.customerInstallmentTransactionManagement[0].merchantOrderID;
          let orderrid = data.customerInstallmentTransactionManagement[0].orderId;
          self.setState({
            installmentsGridData: data,
            userTransactionDetails: data.customerInstallmentTransactionManagement,
            merchantorid,
            orderrid
          });
        } else {
          self.setState({
            installmentsGridData: [],
            userTransactionDetails: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleBack = () => {
    this.props.history.push("paymentManagement");
  }

  render() {
    const columns = [
      // {
      //   title: "Order ID",
      //   dataIndex: "orderId",
      //   key: "orderId",
      //   sorter: (a, b) => {
      //     return a.orderId.localeCompare(b.orderId)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      {
        title: "Transaction ID",
        dataIndex: "transactionId",
        key: "transactionId",
        sorter: (a, b) => {
          return a.transactionId.localeCompare(b.transactionId)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Merchant Order ID",
      //   dataIndex: "merchantOrderID",
      //   key: "merchantOrderID",
      //   sorter: (a, b) => {
      //     return a.merchantOrderID.localeCompare(b.merchantOrderID)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
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
        sorter: (a, b) => new Date(a.expectedPaymentDate) - new Date(b.expectedPaymentDate),
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Actual Payment Date",
        dataIndex: "actualPaymentDate",
        key: "actualPaymentDate",
        render: (row, item) => {
          return(
            <div>
              <label>{!item.isRefundSuccess ? item.actualPaymentDate: "-"}</label>
            </div>
          );
        },
        sorter: (a, b) => new Date(a.actualPaymentDate) - new Date(b.actualPaymentDate),
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Refund Date",
        dataIndex: "refundedDate",
        key: "refundedDate",
        render: (row, item) => {
          return(
            <div>
              <label>{item.isRefundSuccess ? item.refundedDate: "-"}</label>
            </div>
          );
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Amount Transacted",
        dataIndex: "amount",
        key: "amount",
        render: (row, item) => {
          return (
            <div>
              <label>{item.isRefundSuccess ? "- $": "$" }{item.amount}</label>
              {/* <label>{"$"}{item.amount}</label> */}
            </div>
          );
        },
        sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Processor",
        dataIndex: "paymentProcessor",
        key: "paymentProcessor",
        sorter: (a, b) => {
          return a.paymentProcessor.localeCompare(b.paymentProcessor)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Method ",
        dataIndex: "customerCard",
        key: "customerCard",
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
        sorter: (a, b) => {
          return a.customerCard.localeCompare(b.customerCard)
        },
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
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label
                className={
                  item.status.toLowerCase().trim() === "failed"
                    ? "failed"
                    : item.status.toLowerCase().trim() === "success"
                      ? "success"
                      : item.status.toLowerCase().trim() === "progress"
                        ? "custom-link"
                        : "refundtext"
                }
              >
                {item.status}
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
                      <label>{item.refundInitiatedBy}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="hover"
              >
                {item.status === "Refunded" && (
                  <img src={InfoIcon} alt="InfoIcon" />
                )}
              </Popover>
            </div>
          );
        },
        sorter: (a, b) => {
          return a.status.localeCompare(b.status)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Refund Transaction ID",
      //   dataIndex: "refundTransId",
      //   key: "refundTransId",
      //   sorter: (a, b) => {
      //     return a.refundTransId.localeCompare(b.refundTransId)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Refund Status",
      //   dataIndex: "refundTransId",
      //   key: "refundTransId",
      //   sorter: (a, b) => {
      //     return a.refundTransId.localeCompare(b.refundTransId)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
    ];
    const headers = [
      { label: "Transaction ID", key: "transactionId" },
      { label: "Expected Payment Date", key: "expectedPaymentDate" },
      { label: "Actual Payment Date", key: "actualPaymentDate" },
      { label: "Amount Transacted", key: "amount" },
      { label: "Payment Processor", key: "paymentProcessor" },
      { label: "Payment Method", key: "customerCard" },
      { label: "Status", key: "status" },
    ];
    const userDetails = this.state.installmentsGridData;
    return (
      <div className="instalmentDetail">
        <h3 className="Usermana" onClick={this.handleBack}><img src={leftarrow} alt="backarrow" /> Customer Details</h3>
        <div className="row mt-3 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Name</label>
            <label>{userDetails.userName}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Email</label>
            <label>{userDetails.userEmailId}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Contact No.</label>
            <label>{userDetails.userContactNumber}</label>
          </div>
        </div>
        <div className="row usdetailtext">
          {/* <div className="col-12 col-md-4">
            <label>DOB</label>
            <label>09-10-2020</label>
          </div> */}
          <div className="col-12 col-md-4">
            <label>Address</label>
            <label>
              {userDetails.userAddress}
            </label>
          </div>
          <div className="col-12 col-md-4">
            <label>Saved Cards</label>
            {/* <img className="visaind" src={visa} alt="visa" />
            <img className="visaind" src={mastercard} alt="visa" />
            <img className="visaind" src={americanexpress} alt="visa" /> */}
            {/* {(() => {
              if (userDetails.customerCard !== undefined) {
                return (
                  userDetails.customerCard.toLowerCase().trim() === "visa" ? (
                    <img className="visaind" src={visa} alt="visa" />
                  ) : userDetails.customerCard.toLowerCase().trim() === "master card" ? (
                    <img className="visaind" src={mastercard} alt="visa" />
                  ) : userDetails.customerCard.toLowerCase().trim() === "american express" ? (
                    <img className="visaind" src={americanexpress} alt="visa" />
                  ) : userDetails.customerCard.toLowerCase().trim() === "diner club" ? (
                    <img className="visaind" src={DinerClub} alt="visa" />
                  ) : (
                            userDetails.customerCard
                          )
                )
              }

            })()} */}
            {(() => {
              if (userDetails.customerCard !== undefined && userDetails.customerCard !== null) {
                if (userDetails.customerCard.toLowerCase().trim().includes("visa")) {
                  return (
                    <img className="visaind" src={visa} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined && userDetails.customerCard !== null) {
                if (userDetails.customerCard.toLowerCase().trim().includes("mastercard")) {
                  return (
                    <img className="visaind" src={mastercard} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined && userDetails.customerCard !== null) {
                if (userDetails.customerCard.toLowerCase().trim().includes("american express")) {
                  return (
                    <img className="visaind" src={americanexpress} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined && userDetails.customerCard !== null) {
                if (userDetails.customerCard.toLowerCase().trim().includes("diner club")) {
                  return (
                    <img className="visaind" src={DinerClub} alt="visa" />
                  )
                }
              }
            })()}
            {/* <label>1.Master Card ending with 4567</label>
            <label>2.Credit Card ending with 9087</label> */}
          </div>
          <div className="col-12 col-md-4">
            <label>Total No. of Transactions</label>
            <label>{userDetails.userTotalTransactionCount}</label>
          </div>
        </div>
        <div className="row mb-4 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Total Amount Transacted (AU$)</label>
            <label>{userDetails.userTotalTransactionAmount}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Status</label>
            <label>{userDetails.status == true ? "Active" : "Inactive"}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Order Amount</label>
            <label>{"$"}{userDetails.useractualamount}</label>
          </div>
        </div>
        <div className="row mb-4 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Order Id</label>
            <label>{this.state.orderrid ? this.state.orderrid:null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Order Id</label>
            <label>{this.state.merchantorid ? this.state.merchantorid:null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Name</label>
            <label>{userDetails.userMerchantName}</label>
          </div>
        </div>
        <div className="exfilter">
          {/* <input type="text" placeholder="Search Anything" /> */}
          <CSVLink
            data={this.state.userTransactionDetails}
            headers={headers}
            filename={"Installment Details.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
        </div>
        <div className="instalmentDetailtable">
          <Table
            columns={columns}
            dataSource={this.state.userTransactionDetails}
            rowClassName={(record, index) =>
              record.transactionId === "-" ? "disabled-row" : record.isRefundSuccess ? "active-row1" : ""
            }
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default splitInstallmentDetails;
