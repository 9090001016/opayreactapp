import React, { Component } from "react";
import { Table, Popover, Select } from "antd";
import InfoIcon from "./../../assets/Images/Infoblue.png";
import CSV from "./../../assets/Images/csv.png";
import config from "../../helpers/config";
import { userAuthHeader } from "../../component/User/userAuthHeader";
import axios from "axios";
import Visa from "./../../assets/Images/visa.png";
import MasterCard from "./../../assets/Images/mastercard.png";
import AmericanExpress from "./../../assets/Images/american-express.png";
import DinerClub from "./../../assets/Images/diners-club.png";

class installmentDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installmentsGridData: [],
    };
  }
  componentDidMount() {
    
    const installmentDetails = this.props.location.installmentsDetails;
    if (installmentDetails) {
      this.handleGetInstallmentsGridData(installmentDetails);
    } else {
      this.props.history.push("userDashboard");
    }
  }

  handleGetInstallmentsGridData(installmentDetails) {
    let self = this;

    axios({
      method: "post",
      url:
        config.apiUrl + "UserTransaction/CustomerInstallmentTransactionHistory",
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
            installmentsGridData: data,
          });
        } else {
          self.setState({
            installmentsGridData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const columns = [
      {
        title: "Installment No.",
        dataIndex: "no",
        key: "no",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Transaction ID",
        dataIndex: "transactionId",
        key: "transactionId",
      },
      // {
      //   title: "Expected Payment Date",
      //   dataIndex: "expectedPaymentDate",
      //   key: "expectedPaymentDate",
      // },
      {
        title: "Actual Payment Date",
        dataIndex: "actualPaymentDate",
        key: "actualPaymentDate",
      },
      {
        title: "Amount Transacted",
        dataIndex: "amount",
        key: "amount",
      },
      // {
      //   title: "Payment Processor",
      //   dataIndex: "paymentProcessor",
      //   key: "paymentProcessor",
      // },
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
      },
    ];

    const data = [
      {
        key: "1",
        no: "1",
        transactionid: <label>3690</label>,
        billedamount: <label>Debit</label>,
        cardtype: <label>Sahaj Lad</label>,
        merchantname: <label>xyz</label>,
        datetimestamp: <label>27/11/2020</label>,
        status: <label className="success">success</label>,
      },
      {
        key: "2",
        no: "2",
        transactionid: <label>3369</label>,
        billedamount: <label>Debit</label>,
        cardtype: <label>Jay Wala</label>,
        merchantname: <label>xyz</label>,
        datetimestamp: <label>27/11/2020</label>,
        status: <label className="success">success</label>,
      },
      {
        key: "3",
        no: "3",
        transactionid: <label>3369</label>,
        billedamount: <label>Debit</label>,
        cardtype: <label>Maulik Bhatt</label>,
        merchantname: <label>xyz</label>,
        datetimestamp: <label>27/11/2020</label>,
        status: <label className="success">success</label>,
      },
    ];
    return (
      <div className="instalmentDetail">
        <h3 className="Usermana">installment Details</h3>
        <div className="exfilter">
          <input type="text" placeholder="Search Anything" />
          <label className="csv">
            <img src={CSV} alt="Export" />
            Export to CSV
          </label>
        </div>
        <div className="instalmentDetailtable">
          <Table
            columns={columns}
            dataSource={this.state.installmentsGridData}
            rowClassName={(record, index) =>
              record.transactionId === "-" ? "disabled-row" : ""
            }
            pagination={true}
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

export default installmentDetails;
