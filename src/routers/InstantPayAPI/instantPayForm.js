import React, { Component } from "react";
import custom from "../../../src/assets/css/custome.css";
import Cookies from "universal-cookie";
import lock from "./../../assets/Images/lock.png";
import axios from "axios";
import config from "./../../helpers/config";

const cookies = new Cookies();
class instantPayForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cookie: {},
            amount: 0,
            orderId: "",
            appKey: "",
            message: "",
            loading: false
        };
    }

    componentDidMount() {
        
        var cookie = this.state.cookie;
        var _cookietoken = cookies.get("instantusertoken");
        var _token = window.localStorage.getItem("instantusertoken");
        var url = window.location.href;
        window.localStorage.setItem("iframeUrl", url);
        if (_token === null || _token === "" || _token === undefined) { // window.localStorage.clear();
            window.location.href = "/instantPayLogin";
        } else {
            cookie["token"] = _token
            this.setState({ cookie })
            this.handleMerchantValidator(_token);
        }
    }

    handleGetParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results)
            return null;


        if (!results[2])
            return '';


        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    handleMerchantValidator(token) {
        
        var self = this;
        var url = window.location.href;
        var appKey = this.handleGetParameterByName('appKey', url);
        self.setState({
            loading: true
        });
        axios({
            method: "post",
            url: config.instantApiUrl + "InstantPay/MerchantValidator",
            headers: {
                "X-Authorized-Token": token,
                "X-Authorized-appkey": appKey
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Valid user") {
                self.handleCustomerValidator(token, data.firstLevelToken);
            } else {
                self.setState({
                    loading: false,
                    message: data
                })
            }
        }).catch((data) => {
            console.log(data);
        });
    }

    handleCustomerValidator(token, firstlevelToken) {
        
        var self = this;
        axios({
            method: "post",
            url: config.instantApiUrl + "InstantPay/customervalidator",
            headers: {
                "X-Authorized-Token": token,
                "X-Authorized-FirstlevelToken": firstlevelToken
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Valid user") {
                self.handleCustomerPayment(token, data);
            } else {
                self.setState({
                    loading: false,
                    message: data
                })
            }
        }).catch((data) => {
            console.log(data);
        });
    }

    handleCustomerPayment(token, data) {
        
        var self = this;
        var url = window.location.href;
        var amount = this.handleGetParameterByName('amt', url);
        var orderId = this.handleGetParameterByName('orderId', url);
        var appKey = this.handleGetParameterByName('appKey', url);
        axios({
            method: "post",
            url: config.instantApiUrl + "InstantPay/customerpayment",
            headers: {
                "X-Authorized-Token": token
            },
            data: {
                // StripeId: data.customerId,
                // StripeId: "cus_Infxw1uEyrDQdQ",
                MerchantOrderId: orderId,
                SecondlevelToken: data.secondLevelToken,
                Amount: parseFloat(amount),
                APPKey: appKey
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Success") {
                self.setState({
                    loading: false,
                    message: "Your payment has done successfully with transaction id : " + data.balanceTransactionId + " and order id : " + orderId
                })
            } else {
                self.setState({
                    loading: false,
                    message: data
                })
            }
            console.log(res);
        }).catch((data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className={this.state.loading ? "oopasity" : ""}>
                {this.state.loading ? (
                    <div className="lodivone">
                        <div className="loderdiv">
                            <div class="loader"></div>
                        </div>
                        <label className="mt-1">Processing Payment<br />Dont Refresh or Click Back</label>
                    </div>) : null}
                <div className="marketingApi">
                    <header>
                        <h3>INSTANT PAY</h3>
                    </header>
                    <div className="inpaydiv">
                        <label> {
                            this.state.message
                        } </label>
                    </div>
                    <p className="textcenter mbtom10"><img className="lockpng"
                        src={lock}
                        alt="visa" />
                        This payment is secured by K2.</p>
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

export default instantPayForm;
{ /* <textarea className="wdtextarea txt-cookie-token"
                                        value={
                                            this.state.cookie.token
                                        }/> */
} { /* <textarea
                        className="txt-cookie-token"
                        value={this.state.cookie.token}
                    /> */
}
