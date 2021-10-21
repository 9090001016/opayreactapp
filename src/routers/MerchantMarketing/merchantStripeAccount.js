import React, { Component } from "react";
import custom from "../../../src/assets/css/custome.css";
import Cookies from "universal-cookie";
import lock from "./../../assets/Images/lock.png";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import NotificationManager from "react-notifications/lib/NotificationManager";

const cookies = new Cookies();
class merchantStripeAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            loading: false
        };
    }

    componentDidMount() {
        
        var url = window.location.href;
        var merchantId = this.handleGetParameterByName('code', url)
        if (merchantId !== null || merchantId !== "") {
            this.handleUpdateMerchantAccount(merchantId)
        }
        // var cookie = this.state.cookie;
        // var _cookietoken = cookies.get("token");
        // var _token = window.localStorage.getItem("token");
        // var url = window.location.href;
        // window.localStorage.setItem("iframeUrl", url);
        // if (_token === null || _token === "" || _token === undefined) { // window.localStorage.clear();
        //     window.location.href = "/instantPayLogin";
        // } else {
        //     cookie["token"] = _token
        //     this.setState({cookie})
        //     this.handleMerchantValidator(_token);
        // }
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

    handleUpdateMerchantAccount(merchantId) {
        
        var self = this;
        self.setState({
            loading: true
        });
        axios({
            method: "post",
            url: config.apiUrl + "MerchantMarketing/updatemerchantaccount",
            headers: authHeader('no'),
            params: {
                MerchantID: merchantId
            }
        }).then(function (res) {
            
            var data = res.data.responseData;
            var message = res.data.message
            if (message == "Success") {
                self.setState({
                    loading: false,
                    message: "Your stripe account has been activated. Please login to k2 portal."
                });
                setTimeout(
                    window.location.href = "./instantPayMerchantLogin"
                , 1000);
            } else {
                self.setState({
                    loading: false,
                    message
                })
            }
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
                    <label className="mt-1">Merchant Registration Is In Process<br />Dont Refresh or Click Back</label>
                </div>):null}
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

export default merchantStripeAccount;
{ /* <textarea className="wdtextarea txt-cookie-token"
                                        value={
                                            this.state.cookie.token
                                        }/> */
} { /* <textarea
                        className="txt-cookie-token"
                        value={this.state.cookie.token}
                    /> */
}
