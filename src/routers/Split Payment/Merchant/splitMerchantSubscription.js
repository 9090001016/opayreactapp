import React, { Component } from 'react';
import Check from "./../../../assets/Images/check.png";
import { Link } from "react-router-dom";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import dashboard from "./../../../assets/Images/dashboard.png";
import merchant from "./../../../assets/Images/merchant.png";
import user from "./../../../assets/Images/user.png";
import { NavLink } from "react-router-dom";

export class splitMerchantSubscription extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subscriptionPlan: [],
            selectedPlan: 0,
            activePlan: [],
            module: "",
        }
    }

    componentDidMount() {
        var module = window.localStorage.getItem("OnePayMerchantModule");
        this.handleGetSubsciptionPlan();
        this.handleGetActiveMerchantPlan();
        this.setState({
            module
        })
    }

    handleGetSubsciptionPlan() {

        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "OnePaySubscription/getsubscriptionplan",
            headers: merchantAuthHeader(),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {

                    self.setState({
                        subscriptionPlan: data
                    })
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    // NotificationManager.error("Failed");
                    // self.setState({
                    //     loading: false,
                    // });
                }
            })
            .catch(function (res) {

                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: [parseInt(e.target.value)]
        })
    }

    handleChoosePlan = () => {
        if (this.state.selectedPlan !== 0 && this.state.selectedPlan[0] !== 0) {
            if (this.state.activePlan == null || this.state.activePlan.length == 0) {
                window.localStorage.setItem("subscriptionId", this.state.selectedPlan);
                this.props.history.push({
                    pathname: "cardDetails",
                })
            } else {
                NotificationManager.error("You already have an active plan.")
            }
        } else {
            NotificationManager.error("Please select plan.")
        }
    }

    handleGetActiveMerchantPlan() {

        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "OnePayPlanSubscription/getactivemerchantPlan",
            headers: merchantAuthHeader(),
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {

                    self.setState({
                        activePlan: data
                    })
                    // NotificationManager.success("Record Saved Successfully");
                    // NotificationManager.success(data);
                    // setTimeout(function () {
                    //     self.props.history.push({
                    //         pathname: "/instantPayHome"
                    //     });
                    // }, 1000);
                    // self.setState({
                    //     loading: false,
                    // });
                } else {
                    // NotificationManager.error("Failed");
                    self.setState({
                        activePlan: []
                    })
                }
            })
            .catch(function (res) {

                // self.setState({
                //     loading: false,
                // });
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                <div className="blue_line">
                </div>
                <div className="merSubsc mersubcard">
                    <div className="dash_link">
                        <ul className="header-left">
                            {(() => {
                                if (this.state.module.includes('Dashboard')) {
                                    return (
                                        <li>
                                            <NavLink to="/onePayMerchant/dashboard">
                                                {/* <div className="header-icons">
                                                    <img src={dashboard} alt="icon missing" />
                                                </div> */}
                                                <span className="ml-2">Dashboard</span>
                                            </NavLink>
                                        </li>
                                    )
                                }
                            })()}
                            {(() => {
                                if (this.state.module.includes('Transaction History')) {
                                    return (
                                        <li>
                                            <NavLink to="/onePayMerchant/transaction-history">
                                                {/* <div className="header-icons">
                                                    <img src={user} alt="icon missing" />
                                                </div> */}
                                                <span className="ml-2">Transaction History</span>
                                            </NavLink>
                                        </li>
                                    )
                                }
                            })()}
                            {/* <li>
          <Link to="/merchant/salesReport">
            <div className="header-icons">
              <img src={merchant} alt="icon missing" />
            </div>
            <span className="ml-2">Sales Report</span>
          </Link>
        </li> */}
                            {(() => {
                                if (this.state.module.includes('Subscription')) {
                                    return (
                                        <li>
                                            <NavLink to="/onePayMerchant/merchantSubscription">
                                                {/* <div className="header-icons">
                                                    <img src={merchant} alt="icon missing" />
                                                </div> */}
                                                <span className="ml-2">Subscription</span>
                                            </NavLink>
                                        </li>
                                    )
                                }
                            })()}
                        </ul>
                    </div>
                    <div className="card">
                        <h3>One Pay</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                        <h4>Current Active Plan</h4>
                        {(this.state.activePlan !== null && this.state.activePlan.length > 0) ?
                            (<><label className="textleft">Subscription Plan : {this.state.activePlan[0].planName}</label>
                                {/* <label>{this.state.activePlan[0].planName}</label> */}
                                <label className="textleft">Subscription Price : $ {this.state.activePlan[0].subscriptionPrice}</label>
                                {/* <label>{this.state.activePlan[0].subscriptionPrice}</label> */}
                                <label className="textleft">Subscription Duration : {this.state.activePlan[0].durationPlan}</label>
                                {/* <label>{this.state.activePlan[0].durationPlan}</label> */}
                            </>
                            ) : (<label>NA</label>)}
                        <select
                            name="selectedPlan"
                            value={this.state.selectedPlan}
                            onChange={this.handleOnChange.bind(this)}
                        >
                            <option>Select Plan</option>
                            {this.state.subscriptionPlan.map((item) => (
                                <option value={item.subscriptionId}>{item.validity} / {item.subscriptionName} </option>
                            ))}
                        </select>
                        {/* <Link to="/instantPayMerchant/planPayment"> */}
                        <button type="button" className="start" onClick={this.handleChoosePlan.bind(this)}>Choose Plan</button>
                        {/* </Link> */}
                        {/* <div className="cardtext">
                        <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                        <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                        <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                    </div> */}
                    </div>
                    {/* <h3 className="Usermana">Choose New Plan</h3> */}
                    {/* <div className="row mt-4"> */}
                    {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div className="card">
                            <h3>Free</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                            <h4>AUS 0 / Month</h4>
                            <select style={{visibility:"hidden"}}>
                                <option>Select Validity</option>
                                <option>Select Validity 1</option>
                                <option>Select Validity 2</option>
                            </select>
                            <button type="button" className="start">Start with Free</button>
                            <div className="cardtext">
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        
                    </div> */}
                    {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div className="card">
                            <h3>Split Payment</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                            <h4>AUS 149 / Month</h4>
                            <select>
                                <option>Select Validity</option>
                                <option>Select Validity 1</option>
                                <option>Select Validity 2</option>
                            </select>
                            <button type="button" className="start">Choose Plan</button>
                            <div className="cardtext">
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div className="card active">
                            <h3>Combo
                                <span>( One Click & Split Payment )</span>
                            </h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                            <h4>AUS 199 / Month</h4>
                            <select>
                                <option>Select Validity</option>
                                <option>Select Validity 1</option>
                                <option>Select Validity 2</option>
                            </select>
                            <button type="button" className="start">Active Plan</button>
                            <div className="cardtext">
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            </div>
                        </div>
                    </div> */}
                    {/* </div> */}
                </div>
            </div>
        )
    }
}

export default splitMerchantSubscription
