import React, { Component } from "react";
import custom from "../../../src/assets/css/custome.css";
import Cookies from "universal-cookie";
import lock from "./../../assets/Images/lock.png";
import axios from "axios";
import config from "../../helpers/config";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { NotificationManager } from "react-notifications";
import { Modal } from 'react-responsive-modal';

import GreenCheck from "./../../assets/Images/check.png";
import OnePayLogo from "./../../assets/Images/allicons/main-logo 1.png";

const cookies = new Cookies();
class onePayForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cookie: {},
      amount: 0,
      orderId: "",
      appKey: "",
      message: "",
      durationData: [],
      rdDuration: {},
      loanPeriod: "",
      installmentDetails: [],
      loading: false,
      duration: "",
      totalAmount: 0,
      successModal: false,
      isPaymentFalied: false
    };
  }

  componentDidMount() {
    var cookie = this.state.cookie;
    var _cookietoken = cookies.get("onepayusertoken");
    var _token = window.localStorage.getItem("onepayusertoken");
    var url = window.location.href;
    window.localStorage.setItem("iframeUrl", url);
    if (_token === null || _token === "" || _token === undefined) {
      window.location.href = "/onePayLogin";
    } else {
      cookie["token"] = _token;
      this.setState({ cookie });
      this.handleMerchantValidator(_token);
    }
  }

  handleGetParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;

    if (!results[2]) return "";

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  handleMerchantValidator(token) {
    var self = this;
    var url = window.location.href;
    var appKey = this.handleGetParameterByName("appKey", url);
    self.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.onePayApiUrl + "OnePay/MerchantValidator",
      headers: {
        "X-Authorized-Token": token,
        "X-Authorized-appkey": appKey,
      },
    })
      .then(function (res) {
        var data = res.data.responseData;
        var message = res.data.message;
        if (message == "Valid user") {
          self.handleCustomerValidator(token, data.firstLevelToken);
        } else {
          self.setState({
            loading: false,
            message: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCustomerValidator(token, firstlevelToken) {
    var self = this;
    axios({
      method: "post",
      url: config.onePayApiUrl + "OnePay/customervalidator",
      headers: {
        "X-Authorized-Token": token,
        "X-Authorized-FirstlevelToken": firstlevelToken,
      },
    })
      .then(function (res) {
        var data = res.data.responseData;
        var message = res.data.message;
        if (message == "Valid user") {
          self.handleGetLoanDuration(token, data);
        } else {
          self.setState({
            loading: false,
            message: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetLoanDuration(token, data) {
    var self = this;
    var url = window.location.href;
    var amount = this.handleGetParameterByName("amt", url);
    this.setState({ totalAmount: amount });
    var orderId = this.handleGetParameterByName("orderId", url);
    var appKey = this.handleGetParameterByName("appKey", url);
    axios({
      method: "post",
      url: config.onePayApiUrl + "OnePay/getloanduration",
      headers: {
        "X-Authorized-Token": token,
      },
      data: {
        LoanAmount: parseFloat(amount),
      },
    })
      .then(function (res) {
        var data = res.data.responseData;
        // var message = "Success";
        var message = res.data.message;
        if (message == "Success") {
          self.setState({
            // message: "Your payment has done successfully with transaction id : " + data.balanceTransactionId
            durationData: data,
            loading: false,
          });
        } else {
          self.setState({
            message: data,
          });
          window.location.href(
            `${"https://opayweb.brainvire.net/instantPayForm?amt="}${parseFloat(
              amount
            )}&order=${orderId}&appkey=${appKey}`,
            "_blank"
          );
        }
        console.log(res);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetInstallmentDetails(loanPeriod, duration) {
    var self = this;
    var url = window.location.href;
    var amount = this.handleGetParameterByName("amt", url);
    var orderId = this.handleGetParameterByName("orderId", url);
    var appKey = this.handleGetParameterByName("appKey", url);
    var redirect_url = this.handleGetParameterByName("redirect_url", url);
    axios({
      method: "post",
      url: config.onePayApiUrl + "OnePay/getinstallmentdetail",
      headers: {
        "X-Authorized-Token": this.state.cookie.token,
      },
      data: {
        LoanAmount: parseFloat(amount),
        InterestRate: 20,
        LoanPeriod: parseInt(loanPeriod),
        EMIType: duration,
      },
    })
      .then(function (res) {
        var data = res.data.responseData;
        var res_message = res.data.message;
        if (res_message == "Success") {
          self.setState({
            // res_message: "Your payment has done successfully with transaction id : " + data.balanceTransactionId
            totalAmount: amount,
            installmentDetails: data,
          });
        } else {
          self.setState({ message: res_message, loading: false });
        }
        console.log(res);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSaveInstallmentDetails() {
    var self = this;
    var url = window.location.href;
    var amount = this.handleGetParameterByName("amt", url);
    var orderId = this.handleGetParameterByName("orderId", url);
    var appKey = this.handleGetParameterByName("appKey", url);
    var redirect_url = this.handleGetParameterByName("redirect_url", url);
    var installmentDetails = [];
    this.state.installmentDetails.map((item) => {
      installmentDetails.push({
        Period: item.period,
        PayDate: item.payDate,
        Amount: item.amount,
      });
    });
    self.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.onePayApiUrl + "OnePay/saveinstallmentdetails",
      headers: {
        "X-Authorized-Token": this.state.cookie.token,
        "X-Authorized-appkey": appKey,
      },
      data: {
        OrderID: orderId,
        ActualAmount: parseFloat(amount),
        InstallmentDetails: installmentDetails,
      },
    })
      .then(function (res) {
        var data = res.data.responseData;
        var message = res.data.message;
        var finalurl = "";
        var result = data.result;
        if (message == "Success") {
          var status = res.data.status;
          if (redirect_url && result) {
            if (redirect_url.includes("?")) {
              finalurl = redirect_url + "&";
            } else {
              finalurl = redirect_url + "?";
            }

            finalurl +=
              "Payment=OnePay&OrderId=" + orderId + "&TransactionID=" + result;

            setTimeout(() => {
              window.location.href = finalurl;
            }, 1000);
          }
          self.setState({
            // message: "Your payment has done successfully.",
            loading: false,
            successModal: true,
            // installmentDetails: data
          });
        } else if (message == "Invalid") {
          if (redirect_url) {
            if (redirect_url.includes("?")) {
              finalurl = redirect_url + "&";
            } else {
              finalurl = redirect_url + "?";
            }

            finalurl += "Payment=OnePay&OrderId=" + orderId + "&TransactionID=";

            setTimeout(() => {
              window.location.href = finalurl;
            }, 1000);
          }
          self.setState({
            message: data,
            loading: false,
            isPaymentFalied: true
          });
        } else {
          self.setState({
            message: "Unable to process your payment.",
            loading: false,
          });
          if (redirect_url) {
            if (redirect_url.includes("?")) {
              finalurl += redirect_url + "&";
            } else {
              finalurl += redirect_url + "?";
            }

            finalurl +=
              "Payment=OnePay&OrderId=" + orderId + "&TransactionID=" + "";

            setTimeout(() => {
              window.location.href = finalurl;
            }, 1000);
          }
        }
        console.log(res);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOnChange(id, duration, e) {
    var rdDuration = {};
    rdDuration[id] = true;
    this.setState({ rdDuration, loanPeriod: e.target.value, duration });
    this.handleGetInstallmentDetails(e.target.value, duration);
  }
  handleclosesuccessPop = () => {
    this.setState({
      successModal: false
    })
    window.location.href = "/"
  }

  handleclosefailedPop = () => {
    this.setState({
      isPaymentFalied: false
    })
    window.location.href = "/"
  }
  render() {
    return (
      <div className={this.state.loading ? "oopasity" : ""}>
        {this.state.loading ? (
          <div className="lodivone">
            <div className="loderdiv">
              <div class="loader"></div>
            </div>
            <label className="mt-1">
              Processing Payment
              <br />
              Dont Refresh or Click Back
            </label>
          </div>
        ) : null}
        <div className="marketingApi">
          <header>
            <h3>ONE PAY</h3>
          </header>
          <div className="onepaydiv">
            {!this.state.message ? (
              <>
                <div className="fromonepay">
                  {this.state.durationData.map((item, i) => (
                    <>
                      <span className="radiooo">
                        <input
                          type="radio"
                          id={"dur" + (i + 1)}
                          value={item.period}
                          checked={this.state.rdDuration["dur" + (i + 1)]}
                          onClick={this.handleOnChange.bind(
                            this,
                            "dur" + (i + 1),
                            item.duration
                          )}
                        ></input>
                        <label>{item.period + "" + item.duration}</label>
                      </span>
                    </>
                  ))}
                </div>
                {this.state.installmentDetails.length > 0 && (
                  <div className="onepayform">
                    <>
                      <table>
                        <thead>
                          <tr>
                            <th>Installment Count</th>
                            <th>Installment Date</th>
                            <th>Amount</th>
                            {/* <th>
                                                Current Balance
                                            </th> */}
                          </tr>
                        </thead>
                        {this.state.installmentDetails.map((item) => (
                          <tbody>
                            <tr>
                              <td> {item.period} </td>
                              <td> {item.payDate} </td>
                              <td> {item.amount} </td>
                              {/* <td> {
                                                    item.currentbalance
                                                } </td> */}
                            </tr>
                          </tbody>
                        ))}{" "}
                      </table>
                      <div className="amt">
                        <table>
                          <tfoot>
                            <tr>
                              <td></td>
                              <td></td>
                              <td className="totalfntsize">Total</td>
                              <td className="totalfntsize">
                                {this.state.totalAmount}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                        {/* <h4 className="dinb totalamt">Total</h4>
                                                <h4 class="dinb totalamt mright">
                                                    {
                                                    this.state.totalAmount
                                                }</h4> */}
                      </div>
                      <div className="row">
                        <button
                          className="pay mb-3 mright"
                          onClick={() => window.location.reload()}
                        >
                          Back
                        </button>
                        <button
                          className="pay mb-3"
                          onClick={this.handleSaveInstallmentDetails.bind(this)}
                        >
                          Pay
                        </button>
                      </div>
                    </>
                  </div>
                )}{" "}
              </>
            ) : (
              <>

                

                <Modal
                  open={this.state.isPaymentFalied}
                  onClose={this.handleclosefailedPop}
                  modalId="openModalId"
                  overlayId="overlay"
                  classNames={{
                    modal: 'contant__modal'
                  }}
                >

                  <div className="col-md-12 mx-auto">
                    <div className="form__fields p-4 m-4">
                      <div className="input__block text-center">
                        <img src={OnePayLogo} width={80} alt="img" />
                      </div>

                      <div className="input__block text-center mt-4">
                        <i class="fa fa-times-circle-o cross__red" aria-hidden="true"></i>
                        <p className="mt-4">{this.state.message}</p>
                      </div>

                    </div>
                  </div>


                </Modal>

              </>
            )}{" "}
          </div>
          <Modal
                  open={this.state.successModal}
                  onClose={this.handleclosesuccessPop}
                  modalId="openModalId"
                  overlayId="overlay"
                  classNames={{
                    modal: 'contant__modal'
                  }}
                >
                  <div className="col-md-12 mx-auto">
                    <div className="form__fields p-4 m-4">
                      <div className="input__block text-center">
                        <img src={OnePayLogo} width={80} alt="img" />
                      </div>

                      <div className="input__block text-center mt-4">
                        <img src={GreenCheck} width={40} alt="img" />
                        <p className="mt-4">Congratulations! <br /> Your Order is Completed and have been placed successfully</p>
                      </div>

                    </div>
                  </div>

                </Modal>
          <p className="textcenter mbtom10">
            <img className="lockpng" src={lock} alt="visa" />
            This payment is secured by K2.
          </p>
          <div className="ftdiv">
            <footer>
              <h3></h3>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default onePayForm;
{
  /* <textarea className="wdtextarea txt-cookie-token"
                                        value={
                                            this.state.cookie.token
                                        }/> */
}
{
  /* <button>Pay</button> */
}
{
  /* <label>
                                        {this.state.message}
                                    </label> */
}
{
  /* <textarea
                        className="txt-cookie-token"
                        value={this.state.cookie.token}
                    /> */
}
