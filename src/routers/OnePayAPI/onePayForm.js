import React, {Component} from "react";
import custom from "../../../src/assets/css/custome.css";
import Cookies from "universal-cookie";
import lock from "./../../assets/Images/lock.png";
import axios from "axios";
import config from "../../helpers/config";
import { Link } from "react-router-dom";

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
            cookie["token"] = _token
            this.setState({cookie})
            this.handleMerchantValidator(_token);
        }
    }

    handleGetParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (! results) 
            return null;
        

        if (! results[2]) 
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
            url: config.onePayApiUrl + "OnePay/MerchantValidator",
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
            url: config.onePayApiUrl + "OnePay/customervalidator",
            headers: {
                "X-Authorized-Token": token,
                "X-Authorized-FirstlevelToken": firstlevelToken
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Valid user") {
                self.handleGetLoanDuration(token, data);
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

    handleGetLoanDuration(token, data) {
        
        var self = this;
        var url = window.location.href;
        var amount = this.handleGetParameterByName('amt', url);
        // var orderId = this.handleGetParameterByName('orderId',url);
        // var appKey = this.handleGetParameterByName('appKey', url);
        axios({
            method: "post",
            url: config.onePayApiUrl + "OnePay/getloanduration",
            headers: {
                "X-Authorized-Token": token
            },
            data: {
                LoanAmount: parseFloat(amount)

            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            // var message = "Success";
            var message = res.data.message
            if (message == "Success") {
                self.setState({ // message: "Your payment has done successfully with transaction id : " + data.balanceTransactionId
                    durationData: data,
                    loading: false
                })
            } else {
                self.setState({
                    message: data
                })
            }
            console.log(res);
        }).catch((data) => {
            console.log(data);
        });
    }

    handleGetInstallmentDetails(loanPeriod, duration) {
        
        var self = this;
        var url = window.location.href;
        var amount = this.handleGetParameterByName('amt', url);
        this.setState({totalAmount: amount})
        // var orderId = this.handleGetParameterByName('orderId',url);
        // var appKey = this.handleGetParameterByName('appKey', url);
        axios({
            method: "post",
            url: config.onePayApiUrl + "OnePay/getinstallmentdetail",
            headers: {
                "X-Authorized-Token": this.state.cookie.token
            },
            data: {
                LoanAmount: parseFloat(amount),
                InterestRate: 20,
                LoanPeriod: parseInt(loanPeriod),
                EMIType: duration
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Success") {
                self.setState({ // message: "Your payment has done successfully with transaction id : " + data.balanceTransactionId
                    installmentDetails: data,
                    totalAmount: amount,
                })
            } else {
                self.setState({message: "Unable to process your payment.", loading: false})
            }
            console.log(res);
        }).catch((data) => {
            console.log(data);
        });
    }

    handleSaveInstallmentDetails() {
        
        var self = this;
        var url = window.location.href;
        var amount = this.handleGetParameterByName('amt', url);
        var orderId = this.handleGetParameterByName('orderId', url);
        var appKey = this.handleGetParameterByName('appKey', url);
        var installmentDetails = [];
        this.state.installmentDetails.map((item) => {
            installmentDetails.push({Period: item.period, PayDate: item.payDate, Amount: item.amount})
        })
        self.setState({
            loading: true
        });
        axios({
            method: "post",
            url: config.onePayApiUrl + "OnePay/saveinstallmentdetails",
            headers: {
                "X-Authorized-Token": this.state.cookie.token,
                "X-Authorized-appkey": appKey
            },
            data: {
                OrderID: orderId,
                ActualAmount: parseFloat(amount),
                InstallmentDetails: installmentDetails
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Success") {
                self.setState({
                    message: "Your payment has done successfully.",
                    loading: false
                    // installmentDetails: data
                })
            } else {
                self.setState({
                    message: "Unable to process your payment.",
                    loading: false
                })
            }
            console.log(res);
        }).catch((data) => {
            console.log(data);
        });
    }

    handleOnChange(id,duration, e) {
        
        var rdDuration = {};
        rdDuration[id] = true;
        this.setState({rdDuration, loanPeriod: e.target.value, duration})
        this.handleGetInstallmentDetails(e.target.value, duration);
    }

    render() {
        return (
            <div className={this.state.loading ? "oopasity" : ""}>
                {this.state.loading ? (
                <div className="lodivone">
                    <div className="loderdiv">
                        <div class="loader"></div>
                    </div>
                    <label className="mt-1">Processing Payment <br/>Dont Refresh or Click Back</label>
                </div>) : null}
            <div className="marketingApi">
                <header>
                    <h3>ONE PAY</h3>
                </header>
                <div className="onepaydiv">
                

                    {
                    this.state.message == false ? (
                        <> 
                        <div className="fromonepay">
                        {
                            
                            this.state.durationData.map((item, i) => (
                                <>
                                <span className="radiooo">
                                    <input type="radio"
                                        id={
                                            "dur" + (
                                                i + 1
                                            )
                                        }
                                        value={
                                            item.period
                                        }
                                        checked={
                                            this.state.rdDuration["dur" + (
                                                    i + 1
                                                )]
                                        }
                                        onClick={
                                            this.handleOnChange.bind(this, "dur" + (
                                                i + 1
                                            ),item.duration)
                                    }></input>
                                    <label>{
                                        item.period + "" + item.duration
                                    }</label>
                                    </span>
                                </>
                                
                            ))
                        }</div>
                            {
                            this.state.installmentDetails.length > 0 && (
                                <div className="onepayform">
                                <>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Installment Count
                                            </th>
                                            <th>
                                                Installment Date
                                            </th>
                                            <th>
                                                Amount
                                            </th>
                                            {/* <th>
                                                Current Balance
                                            </th> */}
                                        </tr>
                                        </thead>
                                        {
                                        this.state.installmentDetails.map((item) => (
                                            <tbody >
                                            <tr>

                                                <td> {
                                                    item.period
                                                } </td>
                                                <td> {
                                                    item.payDate
                                                } </td>
                                                <td> {
                                                    item.amount
                                                } </td>
                                                {/* <td> {
                                                    item.currentbalance
                                                } </td> */}
                                            </tr>
                                            </tbody>
                                        ))
                                    } </table>
                                     <div>
                                                <h4 className="amtcss">Total</h4>
                                                <label class="totalamt">
                                                    {
                                                    this.state.totalAmount
                                                }</label>
                                            </div>
                                            <Link to="onepatForm">
                                            <button className="pay mb-3" >Pay</button></Link>
                                    <button className="pay mb-3" onClick={
                                        this.handleSaveInstallmentDetails.bind(this)
                                    }>Pay</button>
                                </>
                                </div>
                            )
                        } </>
                    ) : <label> {
                            this.state.message
                        } </label>
                } </div>
                <p className="textcenter mbtom10"><img className="lockpng"
                        src={lock}
                        alt="visa"/>
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

export default onePayForm;
{ /* <textarea className="wdtextarea txt-cookie-token"
                                        value={
                                            this.state.cookie.token
                                        }/> */
} { /* <button>Pay</button> */
} { /* <label>
                                        {this.state.message}
                                    </label> */
} { /* <textarea
                        className="txt-cookie-token"
                        value={this.state.cookie.token}
                    /> */
}
