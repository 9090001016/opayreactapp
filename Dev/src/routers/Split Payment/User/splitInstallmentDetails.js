import React, { Component } from "react";
import { Table, Popover, Select } from "antd";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import CSV from "./../../../assets/Images/csv.png";
import config from "../../../helpers/config";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import axios from "axios";
import Visa from "./../../../assets/Images/visa.png";
import MasterCard from "./../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import { CSVLink } from "react-csv";
import leftarrow from "./../../../assets/Images/leftarrow.png";

class splitInstallmentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installmentsGridData: [],
      installmentsCSVData: [],
      merchantorderId: null,
      actualAmount: null,
      orderId: null,
      merchantAddress: null,
      merchantContactNumber: null,
      merchantEmailId: null,
      merchantName: null
    };
  }
  componentDidMount() {
    
    const installmentDetails = this.props.location.installmentsDetails;
    if (installmentDetails) {
      this.handleGetInstallmentsGridData(installmentDetails);
    } else {
      this.props.history.push("userTransaction");
    }
  }

  handleGetInstallmentsGridData(installmentDetails) {
    let self = this;

    axios({
      method: "post",
      url:
        config.apiUrl + "OnePayUserTransaction/CustomerInstallmentTransactionHistory",
      headers: userAuthHeader(),
      data: {
        OrderId: installmentDetails.orderId,
        MerchantId: installmentDetails.merchantId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          let merchantorderId = data[0].merchantOrderId;
          let actualAmount = data[0].actualamount;
          let orderId = data[0].orderId;
          let merchantAddress = data[0].merchantAddress;
          let merchantContactNumber = data[0].merchantContactNumber;
          let merchantEmailId = data[0].merchantEmailId;
          let merchantName = data[0].merchantName;
          self.setState({
            installmentsGridData: data,
            merchantorderId,
            actualAmount,
            orderId,
            merchantAddress,
            merchantContactNumber,
            merchantEmailId,
            merchantName,
          });
        } else {
          self.setState({
            installmentsGridData: [],
          });
        }
        self.handleGetInstallmentsCSVData(installmentDetails);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetInstallmentsCSVData(installmentDetails) {
    let self = this;

    axios({
      method: "post",
      url:
        config.apiUrl + "OnePayUserTransaction/CustomerInstallmentTransactionHistory",
      headers: userAuthHeader(),
      data: {
        OrderId: installmentDetails.orderId,
        MerchantId: installmentDetails.merchantId,
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            installmentsCSVData: data,
          });
        } else {
          self.setState({
            installmentsCSVData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleBack = () => {
    this.props.history.push("userTransaction");
  }

  render() {
    const columns = [
      {
        title: "Transaction ID",
        dataIndex: "transactionId",
        key: "transactionId",
        sorter: (a, b) => {
          return a.transactionId.localeCompare(b.transactionId)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Expected Payment Date",
        dataIndex: "expectedPaymentDate",
        key: "expectedPaymentDate",
        render: (row, item) => {
          return(
            <div>
              <label>{!item.refundStatus ? item.expectedPaymentDate: "-"}</label>
            </div>
          );
        },
        sorter: (a, b) => {
          return a.expectedPaymentDate.localeCompare(b.expectedPaymentDate)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Actual Payment Date",
        dataIndex: "actualPaymentDate",
        key: "actualPaymentDate",
        render: (row, item) => {
          return(
            <div>
              <label>{!item.refundStatus ? item.actualPaymentDate: "-"}</label>
            </div>
          );
        },
        sorter: (a, b) => {
          return a.actualPaymentDate.localeCompare(b.actualPaymentDate)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Refund Date",
        dataIndex: "refundedDate",
        key: "refundedDate",
        render: (row, item) => {
          return(
            <div>
              <label>{item.refundStatus ? item.refundedDate: "-"}</label>
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
              <label>{item.refundStatus ? "- $": "$" }{item.amount}</label>
            </div>
          );
        },
        sorter: (a, b) => {
          return a.amount.localeCompare(b.amount)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      // {
      //   title: "Payment Processor",
      //   dataIndex: "paymentProcessor",
      //   key: "paymentProcessor",
      //   sorter: (a, b) => {
      //     return a.paymentProcessor.localeCompare(b.paymentProcessor)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // },
      {
        title: "Payment Method",
        dataIndex: "customerCard",
        key: "customerCard",
        render: (row, item) => {
          return (
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
            )
          )
        },
        sorter: (a, b) => {
          return a.customerCard.localeCompare(b.customerCard)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
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
      // {
      //   title: "Actual Amount",
      //   dataIndex: "actualamount",
      //   key: "actualamount",
      //   sorter: (a, b) => {
      //     return a.actualamount.localeCompare(b.actualamount)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // },
      // {
      //   title: "Refund Transaction ID",
      //   dataIndex: "refundTransID",
      //   key: "refundTransID",
      //   sorter: (a, b) => {
      //     return a.refundTransID.localeCompare(b.refundTransID)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // },
      // {
      //   title: "Merchant Order ID",
      //   dataIndex: "merchantOrderId",
      //   key: "merchantOrderId",
      //   sorter: (a, b) => {
      //     return a.merchantOrderId.localeCompare(b.merchantOrderId)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // },
      // {
      //   title: "Refund Status",
      //   dataIndex: "refundStatus",
      //   key: "refundStatus",
      // },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label
                className={
                  item.status !== null && item.status !== "" && item.status !== "-" ? (
                    item.status.toLowerCase().trim() === "failed"
                      ? "failed"
                      : (item.status.toLowerCase().trim() === "success" || item.paymentStatus.toLowerCase().trim() === "succeeded")
                        ? "success"
                        : item.status.toLowerCase().trim() === "progress"
                          ? "custom-link"
                          : "refundtext"
                  ) : null
                }
              >
                {item.status !== "" && item.status !== "-" ?
                  item.status :
                  "Pending"}
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
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
    ];

    const headers = [
      { label: "Transaction ID", key: "transactionId" },
      { label: "Expected Payment Date", key: "expectedPaymentDate" },
      { label: "Actual Payment Date", key: "actualPaymentDate" },
      { label: "Amount Transacted", key: "amount" },
      { label: "Payment Processor", key: "paymentProcessor" },
      { label: "Payment Method", key: "customerCard" },
      { label: "Status", key: "status" }
    ];

    return (
      <div className="instalmentDetail">
        <h3 className="Usermana" onClick={this.handleBack}><img src={leftarrow} alt="backarrow" />installment Details</h3>
        <div className="row mt-3 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Order Id</label>
            <label>{this.state.orderId ? this.state.orderId : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Order Id</label>
            <label>{this.state.merchantorderId ? this.state.merchantorderId : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Actual Order Amount</label>
            <label>{"$"}{this.state.actualAmount ? this.state.actualAmount : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Address</label>
            <label>{this.state.merchantAddress ? this.state.merchantAddress : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Email</label>
            <label>{this.state.merchantEmailId ? this.state.merchantEmailId : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Contact Number</label>
            <label>{this.state.merchantContactNumber ? this.state.merchantContactNumber : null}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Merchant Name</label>
            <label>{this.state.merchantName ? this.state.merchantName : null}</label>
          </div>
        </div>
        <div className="exfilter">
          {/* <input type="text" placeholder="Search Anything" /> */}
          <CSVLink
            data={this.state.installmentsCSVData}
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
            dataSource={this.state.installmentsGridData}
            rowClassName={(record, index) =>
              record.refundStatus ? "active-row1" : record.transactionId === "-" ? "disabled-row" :  ""
            }
            pagination={{
              position: ["bottomCenter"],
              showSizeChanger: true
            }}
          />
        </div>
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

export default splitInstallmentDetails;
