import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import email from "./../../../assets/Images/smallicons/email.png";
import avatar from "./../../../assets/Images/smallicons/user.png";
import lock from "./../../../assets/Images/smallicons/password.png";
import eye from "./../../../assets/Images/smallicons/password-eye-2.png";
import hidepassword from "./../../../assets/Images/smallicons/eye_hidden.png";
import Phone from "./../../../assets/Images/smallicons/phone.png"
import config from "../../../helpers/config"
import axios from "axios"
import { authHeader } from "../helpers/splitAuthHeader"
import { NotificationContainer, NotificationManager } from "react-notifications";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import address from "./../../../assets/Images/smallicons/location.png";
import post from "./../../../assets/Images/smallicons/postcode.png";
import country from "./../../../assets/Images/smallicons/map.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";
import rightsmalllogo from './../../../assets/Images/sign-UP-BG-image/main-logo 3.png';

class splitUserSignUp extends Component {
    constructor(props) {
        super(props)

        this.options = countryList().getData()

        this.state = {
            isVerifyMob: false,
            isVerifyEmail: false,
            firstName: "",
            lastName: "",
            mobileNo: "",
            emailId: "",
            password: "",
            confirmPassword: "",
            area: "",
            country: "",
            state: "",
            // city: "",
            pincode: "",
            errors: {},
            mobileOTP: "",
            emailOTP: "",
            isMobileOtpVerified: false,
            isEmailOtpVerified: false,
            isOTPVerifySend: false,
            isEmailOTPVerifySend: false,
            isRevealPassword: false,
            isRevealConfirmPassword: false,
            options: this.options,
            value: {
                value: "AU",
                label: "Australia"
            },
            minute: 0,
            second: 0,
            emailMinute: 0,
            emailSecond: 0,
            addressLine1: "",
            addressLine2: "",
            suburb: "",
            loading: false
        }
    }
    componentDidMount(){
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    handleVerifyMobileFieldClick = () => {
        let self = this;
        let errors = this.state.errors;

        if (this.state.mobileNo) { // if (this.state.mobileNo.length == 10) {
            errors["mobileNo"] = ""
            axios({
                method: "post",
                url: config.apiUrl + "OnePayMerchantMarketing/UserMobileOTP",
                headers: authHeader("no"),
                data: {
                    MobileNo: this.state.mobileNo
                }
            }).then(function (res) {

                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") { // if (data.otp !== undefined) {
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

            }).catch((data) => {
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
            url: config.apiUrl + "OnePayMerchantMarketing/UserMobileOTPVerification",
            headers: authHeader("no"),
            data: {
                MobileNo: this.state.mobileNo,
                OTP: this.state.mobileOTP
            }
        }).then(function (res) {

            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
                self.setState({ isMobileOtpVerified: true });
            } else {
                errors["mobileOTP"] = "Invalid Mobile OTP."
                self.setState({ isMobileOtpVerified: false });
            }
        }).catch((data) => {
            console.log(data);
        });

        this.setState({ errors: errors });
    }

    handleVerifyEmailFieldClick = () => { // this.setState({ isVerifyEmail: !this.state.isVerifyEmail });

        let self = this;

        // this.setState({ isEmailOTPVerifySend: true, emailTime: 30, isVerifyEmail: true });

        axios({
            method: "post",
            url: config.apiUrl + "OnePayMerchantMarketing/UserEmailOTP",
            headers: authHeader("no"),
            data: {
                Name: this.state.firstName,
                EmailId: this.state.emailId
            }
        }).then(function (res) {

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
        }).catch((data) => {
            console.log(data);
        });
    }

    initiateEmail = () => {
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
            url: config.apiUrl + "OnePayMerchantMarketing/UserEmailOTPVerification",
            headers: authHeader("no"),
            data: {
                EmailId: this.state.emailId,
                OTP: this.state.emailOTP
            }
        }).then(function (res) {

            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
                self.setState({ isEmailOtpVerified: true });
                NotificationManager.success(status);
            } else {
                errors["emailOTP"] = "Invalid Email OTP."
                self.setState({ isEmailOtpVerified: false });
            }
        }).catch((data) => {
            console.log(data);
        });

        this.setState({ errors: errors });
    }

    handleOnChange(e) {

        if (e.target.name === "mobileNo") {
            if (!isNaN(e.target.value)) {
                this.setState({ [e.target.name]: e.target.value });
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleValidation() {

        let errors = {};
        let formIsValid = true;
        if (!this.state.firstName.trim()) {
            formIsValid = false;
            errors["firstName"] = "Please enter first name.";
        }

        if (!this.state.lastName.trim()) {
            formIsValid = false;
            errors["lastName"] = "Please enter last name.";
        }

        if (!this.state.mobileNo.trim()) {
            formIsValid = false;
            errors["mobileNo"] = "Please enter mobile number.";
        }
        // else {
        //     if (this.state.isMobileOtpVerified === false) {
        //         formIsValid = false;
        //         NotificationManager.error("Please verified mobile number OTP.")
        //     }

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

        // if (!this.state.addressLine2.trim()) {
        //     formIsValid = false;
        //     errors["addressLine2"] = "Please enter address line-2.";
        // }

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

        if (!this.state.pincode.trim()) {
            formIsValid = false;
            errors["pincode"] = "Please enter pincode.";
        }

        if (this.state.isMobileOtpVerified === false && this.state.isEmailOtpVerified === false) {
            formIsValid = false;
            NotificationManager.error("Please Verify Mobile Number OTP Or Email OTP.")
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleUserSignUP() {

        let self = this;

        if (this.handleValidation()) {
            self.setState({
                loading: true,
            });
            axios({
                method: "post",
                url: config.apiUrl + "OnePayMerchantMarketing/InsertUserSignUp",
                headers: authHeader("no"),
                data: {
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    MobileNumber: this.state.mobileNo,
                    emailid: this.state.emailId,
                    Password: this.state.password,
                    AddressLine1: this.state.addressLine1,
                    AddressLine2: this.state.addressLine2,
                    Country: this.state.value.label,
                    State: this.state.state,
                    Suburb: this.state.suburb,
                    Pincode: this.state.pincode
                }
            }).then(function (res) {

                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    NotificationManager.success("Record Saved Successfully");
                    NotificationManager.success(data);
                    setTimeout(function () {
                        self.props.history.push({ pathname: "/customer" });
                    }, 1000);
                    self.setState({
                        loading: false,
                    });
                } else {
                    NotificationManager.error(data);
                    self.setState({
                        loading: false,
                    });
                }
            }).catch((data) => {
                self.setState({
                    loading: false,
                });
                console.log(data);
            });
        }
    }

    togglePassword = event => {
        this.setState({
            isRevealPassword: !this.state.isRevealPassword
        });
    }

    toggleConfirmPassword = event => {
        this.setState({
            isRevealConfirmPassword: !this.state.isRevealConfirmPassword
        });
    }

    changeHandler = value => {
        this.setState({ value, state: "" })
    }

    handleMerchantBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="outer-sign-in signup">
                <NotificationContainer />

                <NavLink to="/" className='small_logo'>
                    <img src={rightsmalllogo} alt="signup_logo" className='sml_logo' />
                </NavLink>
                <p className='create_acct'>Create Your Account</p>

                <div className="sign-in-card">

                    <div className="signup_credential_part new_signup">
                        <div className='common_input'>
                            <div className="mersign">
                                <div className="input-cntr">
                                    <div className="input-icons">
                                        <img src={avatar}
                                            alt="icon missing" />
                                    </div>
                                    <input type="text" placeholder="First Name *" name="firstName"
                                        value={
                                            this.state.firstName
                                        }
                                        onChange={
                                            this.handleOnChange.bind(this)
                                        } />
                                </div>
                                <span className="Error">
                                    {
                                        this.state.errors["firstName"]
                                    }</span>
                            </div>

                            <div className="mersign">
                                <div className="input-cntr">
                                    <div className="input-icons">
                                        <img src={avatar}
                                            alt="icon missing" />
                                    </div>
                                    <input type="text" placeholder="Last Name *" name="lastName"
                                        value={
                                            this.state.lastName
                                        }
                                        onChange={
                                            this.handleOnChange.bind(this)
                                        } />
                                </div>
                                <span className="Error">
                                    {
                                        this.state.errors["lastName"]
                                    }</span>
                            </div>
                        </div>
                        <div className='common_input'>
                            <div className="mersign countrtselect">
                                <div className="input-cntr margin">
                                    <div className="input-icons">
                                        <img src={country} alt="icon missing" />
                                    </div>
                                    {/* <input type="text" placeholder="Country *"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.handleOnChange.bind(this)}
                                /> */}
                                    <Select options={
                                        this.state.options
                                    }
                                        value={
                                            this.state.value
                                        }
                                        onChange={
                                            this.changeHandler
                                        }
                                        className="select-country"
                                    // style={{ width: "364px" }}
                                    />
                                </div>
                                <span className="Error">
                                    {
                                        this.state.errors["country"]
                                    }</span>
                            </div>
                            <div className="mersign">
                                <div className="input-cntr">
                                    <div className="input-icons">
                                        <img src={address}
                                            alt="icon missing" />
                                    </div>
                                    {/* <input type="text" placeholder="State *" name="state"
                                    value={
                                        this.state.state
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    } /> */}
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
                                <span className="Error">
                                    {
                                        this.state.errors["state"]
                                    }</span>
                            </div>
                        </div>


                        {
                            this.state.isVerifyMob ? (
                                <>
                                    <div className="mersign">
                                        <div>
                                            <div className="input-cntr margin">
                                                <div className="input-icons">
                                                    <img src={Phone}
                                                        alt="icon missing" />
                                                </div>
                                                <input type="text" placeholder="Enter Mobile OTP" name="mobileOTP"
                                                    value={
                                                        this.state.mobileOTP
                                                    }
                                                    onChange={
                                                        this.handleOnChange.bind(this)
                                                    }
                                                    disabled={
                                                        !this.state.isMobileOtpVerified ? false : true
                                                    } />
                                            </div>
                                            {/* <p className="Verify" onClick={this.handleConfirmMobileOTP.bind(this)}>Confirm</p> */}
                                            {
                                                this.state.isMobileOtpVerified ? (
                                                    <p className="Verify"></p>
                                                ) : ((this.state.minute == 0 && this.state.second == 0) ? (
                                                    <p className="Verify"
                                                        onClick={
                                                            this.handleVerifyMobileFieldClick
                                                        }>Resend OTP</p>
                                                ) : (
                                                    <p className="Verify"
                                                        onClick={
                                                            this.handleConfirmMobileOTP
                                                        }>Confirm
                                                        <label style={
                                                            { paddingLeft: "12px" }
                                                        }>
                                                            {
                                                                this.state.minute
                                                            }
                                                            {" : "}
                                                            {
                                                                this.state.second
                                                            }</label>
                                                    </p>
                                                ))
                                            } </div>
                                        <span className="Error">
                                            {
                                                this.state.errors["mobileOTP"]
                                            }</span>
                                    </div>
                                </>
                            ) : null
                        }
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
                            <PhoneInput country={this.state.value.value.toLowerCase()}
                                value={
                                    this.state.mobileNo
                                }
                                onChange={
                                    mobileNo => this.setState({ mobileNo })
                                }
                                disabled={
                                    !this.state.isMobileOtpVerified ? ((this.state.minute > 0 || this.state.second > 0) ? true : false) : true
                                }
                            // maxLength="10"
                            /> {/* </div> */}
                            <span className="Error">
                                {
                                    this.state.errors["mobileNo"]
                                }</span>
                        </div>
                        {/* {this.state.isMobileOtpVerified ?
                            (<p className="Verify">Verified</p>) :
                            (<p className="Verify" onClick={this.handleVerifyMobileFieldClick.bind(this)}>Verify OTP</p>)} */}

                        {
                            this.state.isMobileOtpVerified ? (
                                <p className="Verify">Verified</p>
                            ) : (this.state.isOTPVerifySend ? ((this.state.minute > 0 || this.state.second > 0) ? (
                                <p className="Verify">OTP Sent</p>
                            ) : (
                                <p className="Verify"></p>
                            )) : (
                                <p className="Verify"
                                    onClick={
                                        this.handleVerifyMobileFieldClick
                                    }>Verify OTP</p>
                            ))
                        }


                        <div className="mersign">
                            <div className="input-cntr margin">
                                <div className="input-icons">
                                    <img src={email}
                                        alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Email Id *" name="emailId"
                                    value={
                                        this.state.emailId
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    }
                                    disabled={
                                        !this.state.isEmailOtpVerified ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? true : false) : true
                                    }
                                    autoComplete="email"
                                />
                            </div>
                            <span className="Error">
                                {
                                    this.state.errors["emailId"]
                                }</span>
                        </div>
                        {/* {this.state.isEmailOtpVerified ?
                            (<p className="Verify">Verified</p>) :
                            (<p className="Verify" onClick={this.handleVerifyEmailFieldClick.bind(this)}>Verify OTP</p>)} */}

                        {
                            this.state.isEmailOtpVerified ? (
                                <p className="Verify">Verified</p>
                            ) : (this.state.isEmailOTPVerifySend ? ((this.state.emailMinute > 0 || this.state.emailSecond > 0) ? (
                                <p className="Verify">OTP Sent</p>
                            ) : (
                                <p className="Verify"></p>
                            )) : (
                                <p className="Verify"
                                    onClick={
                                        this.handleVerifyEmailFieldClick
                                    }>Verify OTP</p>
                            ))
                        }

                        {
                            this.state.isVerifyEmail ? <div>
                                <div className="input-cntr margin">
                                    <div className="input-icons">
                                        <img src={email}
                                            alt="icon missing" />
                                    </div>
                                    <input type="text" placeholder="Enter Email OTP" name="emailOTP"
                                        value={
                                            this.state.emailOTP
                                        }
                                        onChange={
                                            this.handleOnChange.bind(this)
                                        }
                                        disabled={
                                            !this.state.isEmailOtpVerified ? false : true
                                        } />
                                </div>
                                {/* <p className="Verify" onClick={this.handleConfirmEmailOTP.bind(this)}>Confirm</p> */}

                                {
                                    this.state.isEmailOtpVerified ? (
                                        <p className="Verify"></p>
                                    ) : ((this.state.emailMinute == 0 && this.state.emailSecond == 0) ? (
                                        <p className="Verify"
                                            onClick={
                                                this.handleVerifyEmailFieldClick
                                            }>Resend OTP</p>
                                    ) : (
                                        <p className="Verify"
                                            onClick={
                                                this.handleConfirmEmailOTP
                                            }>Confirm
                                            <label style={
                                                { paddingLeft: "12px" }
                                            }>
                                                {
                                                    this.state.emailMinute
                                                }
                                                {" : "}
                                                {
                                                    this.state.emailSecond
                                                }</label>
                                        </p>
                                    ))
                                } </div> : null
                        }
                        <div className='common_input'>
                            <div className="mersign">
                                <div className="input-cntr">
                                    <div className="input-icons">
                                        <img src={lock}
                                            alt="icon missing" />
                                    </div>
                                    <input type={
                                        this.state.isRevealPassword ? "text" : "password"
                                    }
                                        placeholder="Password *"
                                        name="password"
                                        value={
                                            this.state.password
                                        }
                                        onChange={
                                            this.handleOnChange.bind(this)
                                        }
                                        autoComplete="new-password"
                                    />
                                    <div className="input-icons cursor-pointer m-0 ml-2"
                                        onClick={
                                            this.togglePassword
                                        }>
                                        {
                                            this.state.isRevealPassword ? <img src={eye}
                                                alt="icon missing" /> : <img src={hidepassword}
                                                    alt="icon missing" />
                                            // <i class="fa fa-eye-slash icon-eye-slash" aria-hidden="true"></i>
                                        } </div>
                                </div>
                                <span className="Error">
                                    {
                                        this.state.errors["password"]
                                    }</span>
                            </div>

                            <div className="mersign">
                                <div className="input-cntr">
                                    <div className="input-icons">
                                        <img src={lock}
                                            alt="icon missing" />
                                    </div>
                                    <input type={
                                        this.state.isRevealConfirmPassword ? "text" : "password"
                                    }
                                        placeholder="Confirm Password *"
                                        name="confirmPassword"
                                        value={
                                            this.state.confirmPassword
                                        }
                                        onChange={
                                            this.handleOnChange.bind(this)
                                        } />
                                    <div className="input-icons cursor-pointer m-0 ml-2"
                                        onClick={
                                            this.toggleConfirmPassword
                                        }>
                                        {
                                            this.state.isRevealConfirmPassword ? <img src={eye}
                                                alt="icon missing" /> : <img src={hidepassword}
                                                    alt="icon missing" />
                                            // <i class="fa fa-eye-slash icon-eye-slash" aria-hidden="true"></i>
                                        } </div>
                                </div>
                                <span className="Error">
                                    {
                                        this.state.errors["confirmPassword"]
                                    }</span>
                            </div>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address}
                                        alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Address Line-1 *" name="addressLine1"
                                    value={
                                        this.state.addressLine1
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    } />
                            </div>
                            <span className="Error">
                                {
                                    this.state.errors["addressLine1"]
                                }</span>
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address}
                                        alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Address Line-2" name="addressLine2"
                                    value={
                                        this.state.addressLine2
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    } />
                            </div>
                            {/* <span className="Error">
                                {
                                    this.state.errors["addressLine2"]
                                }</span> */}
                        </div>

                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={address}
                                        alt="icon missing" />
                                </div>
                                <input type="text" placeholder="Suburb *" name="suburb"
                                    value={
                                        this.state.suburb
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    } />
                            </div>
                            <span className="Error">
                                {
                                    this.state.errors["suburb"]
                                }</span>
                        </div>



                        <div className="mersign">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    <img src={post}
                                        alt="icon missing" />
                                </div>
                                <input type="text" placeholder="PostCode *" name="pincode"
                                    value={
                                        this.state.pincode
                                    }
                                    onChange={
                                        this.handleOnChange.bind(this)
                                    } />
                            </div>
                            <span className="Error">
                                {
                                    this.state.errors["pincode"]
                                }</span>
                        </div>


                        <div className="resbtncss flrx_btn_part">
                            <p onClick={this.handleMerchantBack} className="goback">Go Back</p>
                            <button className="butn lefbtn" onClick={this.handleUserSignUP.bind(this)}
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
                            <p className="already">
                                <NavLink to="/customer">Login</NavLink>
                            </p>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default splitUserSignUp
