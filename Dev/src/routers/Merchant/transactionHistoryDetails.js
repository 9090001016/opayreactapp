import React, { Component } from "react";
import config from "../../helpers/config";
import axios from "axios";
import { merchantAuthHeader } from "../../component/Merchant/merchantAuthHeader";
import leftarrow from "./../../assets/Images/leftarrow.png";

class transactionHistoryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merchantData: {},
      transacion_Id: "",
      order_Id: "",
      user_Id: 0,
      transactionHistoryDetails: {},
    };
  }

  componentDidMount() {
    var transactionId = this.props.location.transactionId;
    var orderId = this.props.location.orderId;
    var userId = this.props.location.userId;
    if (transactionId) {
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
      url: config.apiUrl + "MerchantTransaction/TransactionHistoryDetails",
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
          });
        } else {
          self.setState({
            transactionHistoryDetails: {},
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

  render() {
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
            <label>{this.state.transactionHistoryDetails.transactionID}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Transaction Id</label>
            <label>{this.state.transactionHistoryDetails.transactionID}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Transaction Date</label>
            <label>
              {this.state.transactionHistoryDetails.transactionDate}
            </label>
          </div>
        </div>
        <div className="row usdetailtext">
          <div className="col-12 col-md-4">
            <label>Total Amount Transacted</label>
            <label>{this.state.transactionHistoryDetails.amount}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Peyment Details</label>
            <label>{this.state.transactionHistoryDetails.customerCard}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Payment Status</label>
            <label>{this.state.transactionHistoryDetails.paymentStatus}</label>
          </div>
        </div>
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
      </div>
    );
  }
}

export default transactionHistoryDetails;
