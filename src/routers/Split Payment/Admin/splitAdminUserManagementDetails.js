import React, { Component } from "react";
import CSV from "./../../../assets/Images/csv.png";
import InfoIcon from "./../../../assets/Images/info-icon.png";
import { Table, Popover } from "antd";
import config from "./../../../helpers/config";
import axios from "axios";
import { authHeader } from "../helpers/splitAuthHeader";
import { CSVLink } from "react-csv";
import leftarrow from "./../../../assets/Images/leftarrow.png";
import visa from "./../../../assets/Images/visa.png";
import mastercard from "./../../../assets/Images/mastercard.png";
import americanexpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import moment from 'moment';
import { NotificationManager } from "react-notifications";

class splitAdminUserManagementDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      user_Id: 0,
      userTransactionDetails: [],
      search: "",
      visible: {}
    };
  }

  componentDidMount() {
    var userId = this.props.location.userId;
    if (document.getElementById("splitEndCustomerMmt")) {
      document.getElementById("splitEndCustomerMmt").classList.add("active");
      document.getElementById("splitMerchantMmt").classList.remove("active");
    }
    if (userId) {
      this.setState({ user_Id: userId });
      this.handleGetUserManagementDetails(userId, "");
    } else {
      this.props.history.push("adminUserManagement");
    }
  }

  handleGetUserManagementDetails(userId, searchAny) {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "OnePayTransaction/UserManagementTransactionDetails",
      headers: authHeader(),
      data: {
        Userid: userId,
        SearchBy: searchAny == "" ? null : searchAny
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {

          self.setState({
            userData: data,
            userTransactionDetails: data.userTransactions,
          });
        } else {
          self.setState({
            userData: {},
            userTransactionDetails: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUserDataSearch(e) {
    this.setState({
      search: e.target.value,
    });
    this.handleGetUserManagementDetails(this.state.user_Id, e.target.value);
  }

  handleBack = () => {
    this.props.history.push("adminUserManagement");
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
      { label: "Transactions Id", key: "userTransactionId" },
      { label: "Transactions Date", key: "userTransactionDate" },
      { label: "Amount Transacted (AU$)", key: "userTransactionAmount" },
      { label: "Transacted Against", key: "userTransactionMerchant" },
      { label: "Payment Method", key: "userTransactionPaymentMethod" },
      { label: "Status", key: "userTransactionStatus" },
    ];

    const columns = [
      {
        title: "Order Id",
        dataIndex: "userOrderId",
        key: "userOrderId",
        sorter: (a, b) => {
          return a.userOrderId.localeCompare(b.userOrderId)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant Order Id",
        dataIndex: "merchantOrderID",
        key: "merchantOrderID",
        sorter: (a, b) => {
          return a.merchantOrderID.localeCompare(b.merchantOrderID)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transactions Id",
        dataIndex: "userTransactionId",
        key: "userTransactionId",
        sorter: (a, b) => {
          return a.userTransactionId.localeCompare(b.userTransactionId)
        },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transactions Date",
        dataIndex: "userTransactionDate",
        key: "userTransactionDate",
        render: (row, item) => {
          return (
              <label>{item.userTransactionDate !== '-' ? !item.isRefundSuccess ? moment(item.userTransactionDate).format('DD-MM-YYYY') : "-" : item.userTransactionDate}</label>
            );
        },
        sorter: (a, b) => new Date(a.userTransactionDate !== '-' ? a.userTransactionDate : null) - new Date(b.userTransactionDate !== '-' ? b.userTransactionDate : null),
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Refund Date",
        dataIndex: "refundDate",
        key: "refundDate",
        render: (row, item) => {
          return(
            <div>
              <label>{item.isRefundSuccess ? item.refundDate: "-"}</label>
            </div>
          );
        },
      },
      {
        title: "Amount Transacted (AU$)",
        key: "userTransactionAmount",
        dataIndex: "userTransactionAmount",
        render: (row, item) => {
          return (
            <div>
              <label>{"$"}{item.userTransactionAmount}</label>
            </div>
          );
        },
        sorter: (a, b) => parseFloat(a.userTransactionAmount) - parseFloat(b.userTransactionAmount),
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transacted Against",
        key: "userTransactionMerchant",
        dataIndex: "userTransactionMerchant",
        render: (row, item) => {
          return (
            <span className="amazontext">
              <label>{item.userTransactionMerchant}</label>
              <Popover
                content={
                  <div>
                    <ul>
                      <li>
                        <p>Email</p>
                        <p>{item.merchantEmailId}</p>
                      </li>
                      <li>
                        <p>Contact Number</p>
                        <p>{item.merchantMobileNo}</p>
                      </li>
                      {/* <li>
                        <p>Total No. of Transactions</p>
                        <p></p>
                      </li>
                      <li>
                        <p>Subscription Type</p>
                        <p></p>
                      </li>
                      <li>
                        <p>Subscription Period</p>
                        <p></p>
                      </li>
                      <li>
                        <p>Subscription Status</p>
                        <p></p>
                      </li> */}
                    </ul>
                  </div>
                }
                placement="bottom"
              >
                <img className="info-icon" src={InfoIcon} alt="info-icon" />
              </Popover>
            </span>
          );
        },
        sorter: (a, b) => { return a.userTransactionMerchant.localeCompare(b.userTransactionMerchant) },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Method",
        key: "userTransactionPaymentMethod",
        dataIndex: "userTransactionPaymentMethod",
        sorter: (a, b) => { return a.userTransactionPaymentMethod.localeCompare(b.userTransactionPaymentMethod) },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Method",
        dataIndex: "customercard",
        key: "customercard",
        render: (row, item) =>
          item.customercard.toLowerCase().trim() === "visa" ? (
            <img src={visa} alt="icon missing" className="cards-icon" />
          ) : item.customercard.toLowerCase().trim() === "mastercard" ? (
            <img src={mastercard} alt="icon missing" className="cards-icon" />
          ) : item.customercard.toLowerCase().trim() === "american express" ? (
            <img
              src={americanexpress}
              alt="icon missing"
              className="cards-icon"
            />
          ) : item.customercard.toLowerCase().trim() === "diner club" ? (
            <img src={DinerClub} alt="icon missing" className="cards-icon" />
          ) : (
                    item.customercard
                  ),
        sorter: (a, b) => {
          return a.customercard.localeCompare(b.customercard)
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
        title: "Payment Status",
        key: "userTransactionStatus",
        dataIndex: "userTransactionStatus",
        render: (row, item) => {
          // return (() => {
          //   if (item.userTransactionStatus == "Pending") {
          //     return (
          //       <label className="pending">{item.userTransactionStatus}</label>
          //     );
          //   } else if (item.userTransactionStatus == "Failed") {
          //     return (
          //       <label className="failed">{item.userTransactionStatus}</label>
          //     );
          //   } else if (item.userTransactionStatus == "Success") {
          //     return (
          //       <label className="success">{item.userTransactionStatus}</label>
          //     );
          //   }
          // })();
          return (<label
            className={
              item.userTransactionStatus.toLowerCase().trim() === "failed"
                ? "failed"
                : (item.userTransactionStatus.toLowerCase().trim() === "success" || item.userTransactionStatus.toLowerCase().trim() === "succeeded")
                  ? "success"
                  : item.userTransactionStatus.toLowerCase().trim() === "progress"
                    ? "custom-link"
                    : "refundtext"
            }
          >
            {item.userTransactionStatus}
          </label>
          )

          // return (
          //   <label className="pending">Pending</label>
          //   <label className="failed">Failed</label>
          //   <label className="success">Success</label>
          // );
        },
        sorter: (a, b) => { return a.userTransactionStatus.localeCompare(b.userTransactionStatus) },
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Refund Transaction ID",
      //   key: "refundTransId",
      //   dataIndex: "refundTransId",
      //   sorter: (a, b) => {
      //     return a.refundTransId.localeCompare(b.refundTransId)
      //   },
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Refund Status",
      //   key: "refundStatus",
      //   dataIndex: "refundStatus",
      //   render: (row, item) => {
      //     return ((item.isMerchantRefundinitiated == true &&
      //       item.isRefundSuccess == true) ?
      //       "Refund Success" :
      //       (item.isMerchantRefundinitiated == true &&
      //         item.isRefundSuccess == false) ? "Refund Failed" : null)
      //   }
      // }
    ];

    const userDetails = this.state.userData;
    return (
      <div className="usermanadetail">
        <h3 className="Usermana" onClick={this.handleBack}><img src={leftarrow} alt="backarrow" /> End Customer Details</h3>
        {/* <h3 className="backbtndetial">Back</h3> */}
        {/* <h3 className="clear"></h3> */}
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
            <label>{"+"}{userDetails.userContactNumber}</label>
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
            <label></label>
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
              if (userDetails.customerCard !== undefined) {
                if (userDetails.customerCard.toLowerCase().trim().includes("visa")) {
                  return (
                    <img className="visaind" src={visa} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined) {
                if (userDetails.customerCard.toLowerCase().trim().includes("mastercard")) {
                  return (
                    <img className="visaind" src={mastercard} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined) {
                if (userDetails.customerCard.toLowerCase().trim().includes("american express")) {
                  return (
                    <img className="visaind" src={americanexpress} alt="visa" />
                  )
                }
              }
            })()}
            {(() => {
              if (userDetails.customerCard !== undefined) {
                if (userDetails.customerCard.toLowerCase().trim().includes("diner club")) {
                  return (
                    <img className="visaind" src={DinerClub} alt="visa" />
                  )
                }
              }
            })()}
          </div>
          <div className="col-12 col-md-4">
            <label>Status</label>
            <label>{userDetails.status == true ? "Active" : "Inactive"}</label>
          </div>
        </div>
        <div className="row mb-4 usdetailtext">
          {/* <div className="col-12 col-md-4">
            <label>Total No. of Transactions</label>
            <label>{userDetails.userTotalTransactionCount}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Total Amount Transacted (AU$)</label>
            <label>{userDetails.userTotalTransactionAmount}</label>
          </div> */}
          {/* <div className="col-12 col-md-4">
            <label>Status</label>
            <label>{userDetails.status == true ? "Active" : "Inactive"}</label>
          </div> */}
        </div>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleUserDataSearch.bind(this)}
          />
          <CSVLink
            data={this.state.userTransactionDetails}
            headers={headers}
            filename={"User Details.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
        </div>
        <div className="usermanadetailtable overflsc">
          <Table
            columns={columns}
            dataSource={this.state.userTransactionDetails}
            rowClassName={(record) => record.isRefundSuccess ? 'ant-table-row active-row1' : 'ant-table-row' }
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

export default splitAdminUserManagementDetails;
