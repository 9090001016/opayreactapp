import React, { Component } from 'react';
import { Link } from "react-router-dom";
import email from "./../../assets/Images/emailBl.png";
import avatar from "./../../assets/Images/avatar.png";
import lock from "./../../assets/Images/lock.png";
import eye from "./../../assets/Images/eye.png";
import Phone from "./../../assets/Images/smartphone.png";
import config from "./../../helpers/config"
import axios from "axios"
import { authHeader } from "./../../helpers/authHeader"
import hidepassword from "./../../assets/Images/hidepassword.png";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import url from "./../../assets/Images/url.png";
import address from "./../../assets/Images/address.png";
import post from "./../../assets/Images/post.png";
import country from "./../../assets/Images/country.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

class signUp extends Component {
    constructor(props) {
        super(props)

        this.options = countryList().getData()

        this.state = {
            isVerifyMob: false,
            isVerifyEmail: false,
            firstName: "",
            lastName: "",
            merchantUrl: "",
            mobileNo: "",
            emailId: "",
            password: "",
            confirmPassword: "",
            country: "",
            state: "",
            // city: "",
            abnNumber: "",
            businessType: 0,
            mobileOTP: "",
            emailOTP: "",
            errors: {},
            isMobileOtpVerified: false,
            isEmailOtpVerified: false,
            businessTypeData: [],
            isOTPVerifySend: false,
            isEmailOTPVerifySend: false,
            isRevealPassword: false,
            isRevealConfirmPassword: false,
            options: this.options,
            value: { value: "AU", label: "Australia" },
            minute: 0,
            second: 0,
            emailMinute: 0,
            emailSecond: 0,
            addressLine1: "",
            addressLine2: "",
            suburb: "",
            postcode: "",
            loading: false
        }
    }

    componentDidMount() {
        this.handleBusinessTypeList();
    }

    handleVerifyMobileFieldClick = () => {
        
        let self = this;
        let errors = this.state.errors;

        if (this.state.mobileNo) {
            // if (this.state.mobileNo.length == 10) {
            errors["mobileNo"] = ""
            axios({
                method: "post",
                url: config.apiUrl + "MerchantMarketing/MerchantMobileOTP",
                headers: authHeader("no"),
                data: {
                    MobileNo: this.state.mobileNo
                }
            })
                .then(function (res) {
                    let status = res.data.message;
                    let data = res.data.responseData;
                    if (status === "Success") {
                        // if (data.otp !== undefined) {
                        NotificationManager.success("SMS Send Successfully");
                        self.setState({
                            mobileOTP: data.otp,
                            isVerifyMob: true,
                            isOTPVerifySend: true,
                            minute: 5,
                            second: 0
                        });
                        self.id = setInterval(self.initiate, 1000);
                        // }
                    } else {
                        NotificationManager.error(data);
                        self.setState({
                            mobileOTP: "",
                            isVerifyMob: false,
                            isOTPVerifySend: false,
                            minute: 0,
                            second: 0
                        });
                    }
                })
                .catch((data) => {
                    console.log(data);
                });
            // } else {
            //     errors["mobileNo"] = "Please enter 10 digit mobile number.";
            // }
        } else {
            errors["mobileNo"] = "Please enter mobile number.";
        }
        this.setState({ errors: errors });

    }

    initiate = () => {
        if (this.state.minute !== 0 && this.state.second == 0) {
            this.setState((prevState, prevProps) => ({
                minute: prevState.minute - 1,
                second: 60
            }));
        }
        if (this.state.second !== 0) {
            this.setState((prevState, prevProps) => ({
                second: prevState.second - 1
            }));
            if (this.state.minute === 0 && this.state.second == 0) {
                clearInterval(this.id);
                this.setState({ complete: true });
            }
        }


    };

    handleConfirmMobileOTP = () => {
        let self = this;
        let errors = this.state.errors;
        errors["mobileOTP"] = ""

        axios({
            method: "post",
            url: config.apiUrl + "MerchantMarketing/MerchantMobileOTPVerification",
            headers: authHeader("no"),
            data: {
                MobileNo: this.state.mobileNo,
                OTP: this.state.mobileOTP
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    self.setState({
                        isMobileOtpVerified: true
                    });
                } else {
                    errors["mobileOTP"] = "Invalid mobile OTP."
                    self.setState({
                        isMobileOtpVerified: false
                    });
                }
            })
            .catch((data) => {
                console.log(data);
            });

        this.setState({ errors: errors });
    }

    handleVerifyEmailFieldClick = () => {
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "MerchantMarketing/MerchantEmailOTP",
            headers: authHeader("no"),
            data: {
                Name: this.state.firstName,
                EmailId: this.state.emailId
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    NotificationManager.success(data);
                    self.setState({ isEmailOTPVerifySend: true, emailMinute: 5, emailSecond: 0, isVerifyEmail: true });
                    self.id = setInterval(self.initiateEmail, 1000);

                } else {
                    NotificationManager.error(data);
                    self.setState({ isEmailOTPVerifySend: false, emailMinute: 0, emailSecond: 0, isVerifyEmail: false });
                }
            })
            .catch((data) => {
                console.log(data);
            });

    }

    initiateEmail = () => {
        // if (this.state.emailTime !== 0) {
        //     this.setState((prevState, prevProps) => ({
        //         emailTime: prevState.emailTime - 1
        //     }));
        //     if (this.state.emailTime === 0) {
        //         clearInterval(this.id);
        //         this.setState({ complete: true });
        //     }
        // }

        if (this.state.emailMinute !== 0 && this.state.emailSecond == 0) {
            this.setState((prevState, prevProps) => ({
                emailMinute: prevState.emailMinute - 1,
                emailSecond: 60
            }));
        }
        if (this.state.emailSecond !== 0) {
            this.setState((prevState, prevProps) => ({
                emailSecond: prevState.emailSecond - 1
            }));
            if (this.state.emailMinute === 0 && this.state.emailSecond == 0) {
                clearInterval(this.id);
                this.setState({ complete: true });
            }
        }
    };

    handleConfirmEmailOTP = () => {
        let self = this;
        let errors = this.state.errors;
        errors["emailOTP"] = ""

        axios({
            method: "post",
            url: config.apiUrl + "MerchantMarketing/MerchantEmailOTPVerification",
            headers: authHeader("no"),
            data: {
                Otp: this.state.emailOTP,
                EmailID: this.state.emailId,
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    self.setState({
                        isEmailOtpVerified: true
                    });
                } else {
                    errors["emailOTP"] = "Invalid Email OTP."
                    self.setState({
                        isEmailOtpVerified: false
                    });
                }
            })
            .catch((data) => {
                console.log(data);
            });

        this.setState({ errors: errors });
    }

    handleOnChange(e) {
        if (e.target.name === "mobileNo") {
            if (!isNaN(e.target.value)) {
                this.setState({
                    [e.target.name]: e.target.value,
                });
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;
        if (!this.state.firstName.trim()) {
            formIsValid = false;
            errors["firstName"] = "Please enter merchant first name.";
        }

        if (!this.state.lastName.trim()) {
            formIsValid = false;
            errors["lastName"] = "Please enter merchant last name.";
        }

        if (!this.state.merchantUrl.trim()) {
            formIsValid = false;
            errors["merchantUrl"] = "Please enter merchant url.";
        }

        if (!this.state.mobileNo.trim()) {
            formIsValid = false;
            errors["mobileNo"] = "Please enter mobile number.";
        }
        // else {


        // if (this.state.mobileNo.length < 10) {
        //     formIsValid = false;
        //     errors["mobileNo"] = "Please enter 10 digit mobile number."
        // }
        // }

        if (!this.state.emailId.trim()) {
            formIsValid = false;
            errors["emailId"] = "Please enter email id.";
        } else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.emailId.trim()) === false) {
                formIsValid = false;
                errors["emailId"] = "Invalid email id.";
            }

            // if (this.state.isEmailOtpVerified === false) {
            //     formIsValid = false;
            //     NotificationManager.error("Please verified email OTP.")
            // }
        }

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "Please enter password.";
        } else {
            if (this.state.password.length < 8) {
                formIsValid = false;
                errors["password"] = "Password length must be atleast 8 characters";
            } else {
                var reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
                if (reg.test(this.state.password) === false) {
                    formIsValid = false;
                    errors["password"] = "Password must have atleast one alphabet, one numeric and one special character.";
                }
            }
        }

        if (!this.state.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "Please enter confirm password.";
        } else {
            if (this.state.password !== this.state.confirmPassword) {
                formIsValid = false;
                errors["confirmPassword"] = "Password and Confirm Password does not match.";
            }
        }

        if (!this.state.addressLine1.trim()) {
            formIsValid = false;
            errors["addressLine1"] = "Please enter address line-1.";
        }

        if (!this.state.addressLine2.trim()) {
            formIsValid = false;
            errors["addressLine2"] = "Please enter address line-2.";
        }

        if (!this.state.postcode.trim()) {
            formIsValid = false;
            errors["postcode"] = "Please enter postcode.";
        }

        if (!this.state.value.label) {
            formIsValid = false;
            errors["country"] = "Please enter country.";
        }

        if (!this.state.state.trim()) {
            formIsValid = false;
            errors["state"] = "Please enter state.";
        }

        if (!this.state.suburb.trim()) {
            formIsValid = false;
            errors["suburb"] = "Please enter suburb.";
        }

        if (!this.state.abnNumber.trim()) {
            formIsValid = false;
            errors["abnNumber"] = "Please enter ABN number.";
        }

        if (!parseInt(this.state.businessType)) {
            formIsValid = false;
            errors["businessType"] = "Please enter business type.";
        }

        if (this.state.isMobileOtpVerified === false && this.state.isEmailOtpVerified === false) {
            formIsValid = false;
            NotificationManager.error("Please Verify Mobile Number OTP Or Email OTP.")
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleMerchantSignUP() {
        
        let self = this;

        if (this.handleValidation()) {
            self.setState({
                loading: true,
            });
            axios({
                method: "post",
                url: config.apiUrl + "MerchantMarketing/MerchantSignUp",
                headers: authHeader("no"),
                data: {
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    MobileNumber: this.state.mobileNo,
                    emailid: this.state.emailId,
                    Password: this.state.password,
                    MerchantUrl: this.state.merchantUrl,
                    AddressLine1: this.state.addressLine1,
                    AddressLine2: this.state.addressLine2,
                    Country: this.state.value.label,
                    State: this.state.state,
                    Suburb: this.state.suburb,
                    PostCode: this.state.postcode,
                    ABNNumber: this.state.abnNumber,
                    BusinessType: parseInt(this.state.businessType)
                }
            })
                .then(function (res) {
                    let status = res.data.message;
                    let data = res.data.responseData;
                    if (status === "Success") {
                        NotificationManager.success("Record Saved Successfully");
                        // NotificationManager.success(data);
                        // setTimeout(function () {
                        //     self.props.history.push({
                        //         pathname: "/instantPayMerchantLogin"
                        //     });
                        // }, 1000);
                        self.setState({
                            loading: false,
                        });
                        if (data.paymentGateway.toLowerCase().trim() == "stripe") {
                            window.location.href = data.stripeAccountURI;
                        }
                    } else {
                        NotificationManager.error(data);
                        self.setState({
                            loading: false,
                        });
                    }
                })
                .catch(function (res) {
                    
                    self.setState({
                        loading: false,
                    });
                    // console.log(data);
                });
        }
    }

    handleBusinessTypeList() {
        let self = this;

        axios({
            method: "get",
            url: config.apiUrl + "MerchantMarketing/MerchantBusinessType",
            headers: authHeader("no")
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    self.setState({
                        businessTypeData: data
                    })
                }
            })
            .catch((data) => {
                console.log(data);
            });
    }

    togglePassword = event => {
        this.setState({ isRevealPassword: !this.state.isRevealPassword });
    }

    toggleConfirmPassword = event => {
        this.setState({ isRevealConfirmPassword: !this.state.isRevealConfirmPassword });
    }

    changeHandler = value => {
        this.setState({ value, state: "" })
    }

    handleMerchantBack = () => {
        this.props.history.push("instantPaySignUpHome");
    }

    render() {
        return (
            <div className="outer-sign-in signup">
                <NotificationContainer />
                <div className="text-center w-100">
                <Link to="/instantPayHome">
                    <img src={InstantLogo} width="150px" className="logo__img" />
                </Link>
                    
                    <div className="sign-in-card">
                        <label className="sign-in">Sign Up</label>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={avatar} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Merchant First Name *"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleOnChange.bind(this)}
                                />

                            </div>
                            <span className="Error">{this.state.errors["firstName"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={avatar} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Merchant Last Name *"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["lastName"]}</span>
                        </div>

                        <div className="mersign countrtselect">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={country} alt="icon missing" />
                                </div>
                                {/* <input type="text" placeholder="Country *"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.handleOnChange.bind(this)}
                                /> */}
                                <Select
                                    options={this.state.options}
                                    value={this.state.value}
                                    onChange={this.changeHandler}
                                    className="select-country"
                                // style={{ width: "364px" }}
                                />
                            </div>
                            <span className="Error">{this.state.errors["country"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={url} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Merchant Url *"
                                    name="merchantUrl"
                                    value={this.state.merchantUrl}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["merchantUrl"]}</span>
                        </div>

                        {this.state.isVerifyMob ?
                            (<><div>
                                <div className="input-cntr margin">
                                    <div className="input-icons">
                                        <img src={Phone} alt="icon missing" />
                                    </div>
                                    <input type="text" placeholder="Enter Mobile OTP"
                                        name="mobileOTP"
                                        value={this.state.mobileOTP}
                                        onChange={this.handleOnChange.bind(this)}
                                        disabled={!this.state.isMobileOtpVerified ? false : true}
                                    />
                                </div>

                                {this.state.isMobileOtpVerified ?
                                    (<p className="Verify"></p>) :
                                    ((this.state.minute == 0 && this.state.second == 0) ? (<p className="Verify" onClick={this.handleVerifyMobileFieldClick}>Resend OTP</p>) :
                                        (<p className="Verify" onClick={this.handleConfirmMobileOTP}>Confirm <label style={{ paddingLeft: "12px" }}>{this.state.minute}{" : "}{this.state.second}</label></p>))}
                            </div>
                                <span className="Error">{this.state.errors["mobileOTP"]}</span></>)
                            : null}
                        <div className="mersign phonepincode">
                            {/* <div className="input-cntr margin"> */}
                            {/* <div className="input-icons">
                                    <img src={Phone} alt="icon missing" />

                                </div> */}
                            {/* <input type="text" placeholder="Mobile No. *"
                                    name="mobileNo"
                                    value={this.state.mobileNo}
                                    onChange={this.handleOnChange.bind(this)}
                                    disabled={!this.state.isMobileOtpVerified ? (this.state.time > 0 ? true : false) : true}
                                    maxLength="10"
                                /> */}
                            <PhoneInput
                                country={this.state.value.value.toLowerCase()}
                                value={this.state.mobileNo}
                                onChange={mobileNo => this.setState({ mobileNo })}
                                disabled={!this.state.isMobileOtpVerified ? ((this.state.minute > 0 || this.state.second > 0) ? true : false) : true}
                                maxLength="10"
                            />
                            {/* </div> */}
                            <span className="Error">{this.state.errors["mobileNo"]}</span>
                        </div>

                        {this.state.isMobileOtpVerified ?
                            (<p className="Verify">Verified</p>) :
                            (this.state.isOTPVerifySend ? ((this.state.minute > 0 || this.state.second > 0) ? (<p className="Verify">OTP Sent</p>) : (<p className="Verify"></p>)) :
                                (<p className="Verify" onClick={this.handleVerifyMobileFieldClick}>Verify OTP</p>))}


                        <div className="mersign">
                            <div className="input-cntr margin">
                                <div className="input-icons">
                                    <img src={email} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Email Id *"
                                    name="emailId"
                                    value={this.state.emailId}
                                    onChange={this.handleOnChange.bind(this)}
                                    disabled={!this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true}
                                    autoComplete="email"
                                />
                            </div>
                            <span className="Error">{this.state.errors["emailId"]}</span>
                        </div>

                        {this.state.isEmailOtpVerified ?
                            (<p className="Verify">Verified</p>) :
                            (this.state.isEmailOTPVerifySend ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? (<p className="Verify">OTP Sent</p>) : (<p className="Verify"></p>)) :
                                (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Verify OTP</p>))}

                        {this.state.isVerifyEmail ?
                            (<><div className="mersign">
                                <div>
                                    <div className="input-cntr margin">
                                        <div className="input-icons">
                                            <img src={email} alt="icon missing" />
                                        </div>
                                        <input type="text" placeholder="Enter Email OTP"
                                            name="emailOTP"
                                            value={this.state.emailOTP}
                                            onChange={this.handleOnChange.bind(this)}
                                            disabled={!this.state.isEmailOtpVerified ? false : true}
                                        />
                                    </div>

                                    {this.state.isEmailOtpVerified ?
                                        (<p className="Verify"></p>) :
                                        ((this.state.emailMinute == 0 && this.state.emailSecond == 0) ? (<p className="Verify" onClick={this.handleVerifyEmailFieldClick}>Resend OTP</p>) :
                                            (<p className="Verify" onClick={this.handleConfirmEmailOTP}>Confirm <label style={{ paddingLeft: "12px" }}>{this.state.emailMinute}{" : "}{this.state.emailSecond}</label></p>))}
                                </div>
                                <span className="Error">{this.state.errors["emailOTP"]}</span>
                            </div></>)
                            : null}

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={lock} alt="icon missing" />
                                </div>
                                <input type={this.state.isRevealPassword ? "text" : "password"}
                                    placeholder="Password *"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange.bind(this)}
                                    maxLength="20"
                                    autoComplete="new-password"
                                />
                                <div className="input-icons cursor-pointer m-0 ml-2" onClick={this.togglePassword}>
                                    {this.state.isRevealPassword ?
                                        <img src={eye} alt="icon missing" /> :
                                        <img src={hidepassword} alt="icon missing" />
                                        // <i class="fa fa-eye-slash icon-eye-slash" aria-hidden="true"></i>
                                    }

                                </div>

                            </div>
                            <span className="Error">{this.state.errors["password"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={lock} alt="icon missing" />
                                </div>
                                <input type={this.state.isRevealConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password *"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                                <div className="input-icons cursor-pointer m-0 ml-2" onClick={this.toggleConfirmPassword}>
                                    {this.state.isRevealConfirmPassword ?
                                        <img src={eye} alt="icon missing" /> :
                                        <img src={hidepassword} alt="icon missing" />
                                        // <i class="fa fa-eye-slash icon-eye-slash" aria-hidden="true"></i>
                                    }
                                </div>
                            </div>
                            <span className="Error">{this.state.errors["confirmPassword"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Address Line-1 *"
                                    name="addressLine1"
                                    value={this.state.addressLine1}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["addressLine1"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Address Line-2"
                                    name="addressLine2"
                                    value={this.state.addressLine2}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["addressLine2"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Suburb *"
                                    name="suburb"
                                    value={this.state.suburb}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["suburb"]}</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address} alt="icon missing" />
                                </div>
                                {this.state.value.value === "AU" ? (
                                    <select
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleOnChange.bind(this)}
                                    >
                                        <option value={0}>Select State</option>
                                        <option value={'NSW'}>NSW</option>
                                        <option value={'ACT'}>ACT</option>
                                        <option value={'VIC'}>VIC</option>
                                        <option value={'SA'}>SA</option>
                                        <option value={'NT'}>NT</option>
                                        <option value={'TAS'}>TAS</option>
                                        <option value={'QLD'}>QLD</option>
                                        <option value={'WA'}>WA</option>
                                    </select>) : (<input type="text" placeholder="State *"
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleOnChange.bind(this)}
                                    />)}
                            </div>
                            <span className="Error">{this.state.errors["state"]}</span>
                        </div>

                        <div className="mersign ">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={post} alt="icon missing" />
                                </div>
                                <input type="text" placeholder="PostCode *"
                                    name="postcode"
                                    value={this.state.postcode}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["postcode"]}</span>
                        </div>

                        

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    {/* <img src={avatar} alt="icon missing" /> */}
                                </div>
                                <input type="text" placeholder="ABN Number *"
                                    name="abnNumber"
                                    value={this.state.abnNumber}
                                    onChange={this.handleOnChange.bind(this)}
                                />
                            </div>
                            <span className="Error">{this.state.errors["abnNumber"]}</span>
                        </div>

                        <div className="mersign bustype">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    {/* <img src={avatar} alt="icon missing" /> */}
                                </div>
                                {/* <input type="text" placeholder="Business Type"
                                    name="businessType"
                                    value={this.state.businessType}
                                    onChange={this.handleOnChange.bind(this)}
                                /> */}
                                <select
                                    id="businessType"
                                    name="businessType"
                                    value={this.state.businessType}
                                    onChange={this.handleOnChange.bind(this)}
                                >
                                    <option value={0}>Select Business Type</option>
                                    {this.state.businessTypeData !== null &&
                                        this.state.businessTypeData.map((item, i) => (
                                            <option
                                                key={i}
                                                value={item.businessTypeId}
                                                className="select-category-placeholder"
                                            >
                                                {item.businessTypeName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <span className="Error">{this.state.errors["businessType"]}</span>
                        </div>
                        <div className="resbtncss">
                            <button className="butn lefbtn" onClick={this.handleMerchantSignUP.bind(this)}
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <FontAwesomeIcon
                                        className="mr-2"
                                        icon={faCircleNotch}
                                        size="sm"
                                        spin
                                    />
                                )}Sign Up</button>
                            <button className="butn rgtbtn" onClick={this.handleMerchantBack}>Back</button>
                        </div>
                        <p className="already"><Link to="/merchant">Login</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default signUp
