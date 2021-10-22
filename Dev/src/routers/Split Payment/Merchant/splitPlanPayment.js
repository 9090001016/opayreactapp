import React, { Component } from 'react'
import Check from "./../../../assets/Images/check.png";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";
import leftarrow from "./../../../assets/Images/leftarrow.png";


class splitPlanPayment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            payment: false,
        }
    }
    handlePaymentOpen() {
        this.setState({ payment: true });
    }
    handlePaymentClose() {
        this.setState({ payment: false });
    }
    render() {
        return (
            <div className="merPlanPayment cardplanpaym">
                <h3 className="Usermana"><img src={leftarrow} alt="backarrow" /> Plan Payment</h3>
                <div className="card planinput">
                           <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Card Number</label>
                                        <input type="text" placeholder="Enter Card Number" />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Card Name</label>
                                        <input type="text" placeholder="Enter Card Name" />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                           </div>
                           <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Expiry Date / Month</label>
                                        <input type="text" placeholder="Enter Expiry Date / Month" />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>CVV</label>
                                        <input type="text" placeholder="Enter CVV" />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                           </div>
                           <div className="paybtn">
                                <button type="button" className="start" onClick={this.handlePaymentOpen.bind(this)}>Pay</button>
                                {/* <h3>OR</h3>
                                <button type="button" className="start" onClick={this.handlePaymentOpen.bind(this)}>Pay Using Instant Pay</button> */}
                            </div>
                            {/* <iframe className="ifram" src="http://localhost:3000/onePayMerchant/checkout" title="W3Schools Free Online Web Tutorials">
</iframe> */}
                        </div>
                       







                {/* <div className="row mt-4"> */}
                    {/* <div className="col-12 col-md-9">
                        
                    </div> */}
                    {/* <div className="col-12 col-md-3">
                        <div className="card cardp">
                            <h3>Combo
                                <span>( One Click & Split Payment )</span>
                            </h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                            <h4>AUS 199 / Month</h4>
                            <label className="month">For 3 Months</label>
                            <Link to="/onePayMerchant/merchantSubscription">
                                <button type="button" className="start">Return to All Plans</button>
                            </Link>
                            <div className="cardtext">
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                                <label><img src={Check} alt="Check" />Lorem Ipsum is simply dummy text.</label>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* Add Role */}
                <Modal
                        open={this.state.payment}
                        onClose={this.handlePaymentClose.bind(this)}
                        modalId="PlanPaymentModal"
                        overlayId="overlay"
                    >
                        <div className="backtext">
                            <h3 className="eduser">Payment Confirmed</h3>
                            <img src={CloseIcon} alt="CloseIcon" className="closeicon" onClick={this.handlePaymentClose.bind(this)} />
                        </div>
                        <div className="edituser">
                            <p>Your One Click & Split Payment Combo plan has been activated.</p>
                            <div className="Editbtn">
                                <Link to="/merchant/currentActivePlan">
                                    <button className="btn">OK</button>
                                </Link>
                            </div>
                        </div>
                    </Modal>
            </div>
        )
    }
}

export default splitPlanPayment
