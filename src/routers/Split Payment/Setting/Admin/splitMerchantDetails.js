import React, { Component } from "react";
import CSV from "./../../../../assets/Images/csv.png";
import { Table, Spin } from "antd";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import { CSVLink } from "react-csv";
import leftarrow from "./../../../../assets/Images/leftarrow.png";

class splitMerchantDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merchantData: {},
      merchant_Id: 0,
      merchantTransactionDetails: [],
      loading: false,
    };
  }

  componentDidMount() {
    var merchantId = this.props.location.merchantId;
    if (merchantId) {
      this.setState({ merchant_Id: merchantId });
      this.handleGetMerchantManagementDetails(merchantId, "");
    } else {
      this.props.history.push("paymentManagement");
    }
  }

  handleGetMerchantManagementDetails(merchantId, searchAny) {
    let self = this;
    self.setState({
      loading: true
    });
    axios({
      method: "post",
      url: config.apiUrl + "OnePayTransaction/MerchantManagementTransactionDetails",
      headers: authHeader(),
      data: {
        userid: merchantId,
        SearchBy: searchAny
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            merchantData: data,
            merchantTransactionDetails: data.merchantTransactions,
            loading: false,
          });
        } else {
          self.setState({
            merchantData: {},
            merchantTransactionDetails: [],
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleMerchantDataSearch(e) {
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    this.handleGetMerchantManagementDetails(
      this.state.merchant_Id,
      e.target.value
    );
  }

  handleBack = () => {
    this.props.history.push("paymentManagement");
  }

  render() {
    const headers = [
      { label: "Transactions Id", key: "merchantTransactionId" },
      { label: "Transactions Date", key: "merchantTransactionDate" },
      { label: "Amount Transacted", key: "merchantTransactionAmount" },
      // { label: "Transacted By", key: "merchantTransactionUser" },
      { label: "Transacted Via", key: "merchantTransactionPaymentMethod" },
      { label: "Status", key: "merchantTransactionStatus" },
    ];

    const columns = [
      {
        title: "Transactions Id",
        dataIndex: "merchantTransactionId",
        key: "merchantTransactionId",
        sorter: true
      },
      {
        title: "Transactions Date",
        dataIndex: "merchantTransactionDate",
        key: "merchantTransactionDate",
        sorter: true
      },
      {
        title: "Amount Transacted",
        key: "merchantTransactionAmount",
        dataIndex: "merchantTransactionAmount",
        sorter: true
      },
      {
        title: "Trasacted Via",
        key: "merchantTransactionPaymentMethod",
        dataIndex: "merchantTransactionPaymentMethod",
        sorter: true
      },
      {
        title: "Status",
        key: "merchantTransactionStatus",
        dataIndex: "merchantTransactionStatus",
        sorter: true
      },
    ];

    const merchantDetails = this.state.merchantData;

    return (
      <div className="mermanadetail">
        <h3 className="Usermana" onClick={this.handleBack}><img src={leftarrow} alt="backarrow" /> Merchant Details</h3>
        <div className="row mt-3 usdetailtext">
          <div className="col-12 col-md-4">
            <label>Name</label>
            <label>{merchantDetails.merchantName}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Email</label>
            <label>{merchantDetails.merchantEmailId}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Contact No.</label>
            <label>{"+"}{merchantDetails.merchantContactNo}</label>
          </div>
        </div>
        <div className="row usdetailtext">
          <div className="col-12 col-md-4">
            <label>Address</label>
            <label>{merchantDetails.merchantAddress}</label>
          </div>
          {/* <div className="col-12 col-md-4">
            <label>Total No. of Transactions</label>
            <label>{merchantDetails.merchantTotalTransactionCount}</label>
          </div> */}
          <div className="col-12 col-md-4">
            <label>Total Amount Transacted</label>
            <label>{merchantDetails.merchantTotalTransactionAmount}</label>
          </div>

        </div>
        <div className="row usdetailtext">
          <div className="col-12 col-md-4">
            <label>Status</label>
            <label>
              {merchantDetails.status == true ? "Active" : "Inactive"}
            </label>
          </div>
          <div className="col-12 col-md-4">
            <label>Subscription Type</label>
            <label>{merchantDetails.subscriptionType}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Subscription Period</label>
            <label>{merchantDetails.subscriptionPeriod}</label>
          </div>
        </div>
        <div className="row mb-4 usdetailtext">
          {/* <div className="col-12 col-md-4">
            <label>Subscription Status</label>
            <label>
              {merchantDetails.subscriptionStatus == true
                ? "Active"
                : "Inactive"}
            </label>
          </div> */}
          <div className="col-12 col-md-4">
            <label>Created on</label>
            <label>{merchantDetails.createdDate}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Subscription Start-Date</label>
            <label>{merchantDetails.subscriptionStartDate}</label>
          </div>
          <div className="col-12 col-md-4">
            <label>Subscription End-Date</label>
            <label>{merchantDetails.subscriptionEndDate}</label>
          </div>
        </div>
        <div className="exfilter">
          <input
            type="text"
            placeholder="Search Anything"
            onChange={this.handleMerchantDataSearch.bind(this)}
          />
          <CSVLink
            data={this.state.merchantTransactionDetails}
            headers={headers}
            filename={"Merchant Details.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
        </div>
        <div className="merchmanadetailtable">
          {/* <Spin spinning={this.state.loading}> */}
          <Table
            columns={columns}
            dataSource={this.state.merchantTransactionDetails}
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

export default splitMerchantDetails;
