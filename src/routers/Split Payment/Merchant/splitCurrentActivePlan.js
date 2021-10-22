import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";

class splitCurrentActivePlan extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            cancelPlan: false,
        }
    }
    handlecancelPlanOpen() {
        this.setState({ cancelPlan: true });
    }
    handlecancelPlanClose() {
        this.setState({ cancelPlan: false });
    }
    render() {
        return (
            <div className="merPlanPayment">
                <h3 className="Usermana">Current Active Plan</h3>
                <div className="row mt-4">
                    <div className="col-12 col-md-9">
                        <div className="card planinput">
                           <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Plan Name</label>
                                        <input type="text" placeholder="One Click & Split Payment Combo" disabled />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Plan Price / Month (AUS)</label>
                                        <input type="text" placeholder="199" disabled />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                           </div>
                           <div className="row">
                                <div className="col-12 col-md-12">
                                    <div className="marginbot">
                                        <label>Plan Description</label>
                                        <input type="text" placeholder="Lorem Ipsum is Simply Dummpy text of printing and typesetting industry." disabled />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                           </div>
                           <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Plan Validity</label>
                                        <select disabled className="m-0">
                                            <option>3 Months</option>
                                            <option>6 Months</option>
                                            <option>9 Months</option>
                                        </select>
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="marginbot">
                                        <label>Amount Payable (AUS)</label>
                                        <input type="text" placeholder="399" disabled />
                                        <span className="Error">Required Field.</span>
                                    </div>
                                </div>
                           </div>
                           <div className="paybtn">
                                <button type="button" className="start" onClick={this.handlecancelPlanOpen.bind(this)}>Cancel Plan</button>
                                <h3>OR</h3>
                                <Link to="/merchant/merchantSubscription">
                                    <button type="button" className="start">Change Plan</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                        open={this.state.cancelPlan}
                        onClose={this.handlecancelPlanClose.bind(this)}
                        modalId="PlanPaymentModal"
                        overlayId="overlay"
                    >
                        <div className="backtext">
                            <h3 className="eduser">Cancel Plan ?</h3>
                            <img src={CloseIcon} alt="CloseIcon" className="closeicon" onClick={this.handlecancelPlanClose.bind(this)} />
                        </div>
                        <div className="edituser">
                            <p>Are you sure you want to cancel plan ?</p>
                            <div className="Editbtn">
                                <Link to="/merchant/merchantSubscription">
                                    <button className="btn">YES</button>
                                </Link>
                            </div>
                        </div>
                    </Modal>
            </div>
        )
    }
}

export default splitCurrentActivePlan
