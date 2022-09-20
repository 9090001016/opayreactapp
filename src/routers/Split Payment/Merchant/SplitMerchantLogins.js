import React,{useState,useEffect} from 'react'
import { NavLink, NavNavLink } from 'react-router-dom'
import signinImg from '../../../assets/Images/sign-UP-BG-image/signin_img.png'
import MerchantLogins from '../MerchantMarketing/MerchantLogins'
import avatar from "./../../../assets/Images/avatar.png";
import lock from "./../../../assets/Images/lock.png";
import eye from "./../../../assets/Images/eye.png";
import hidepassword from "./../../../assets/Images/hidepassword.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Cookies from "universal-cookie";
import config from "../../../helpers/config";
import axios from "axios";
import { encryption } from "../../../helpers/Encryption";
import { merchantAuthHeader } from "../../Split Payment/Merchant/splitMerchantAuthHeader";

const SplitMerchantLogins = (props) => {
  const cookies = new Cookies();
  const [ credential,setCredentials ] = useState({
      userName: "",
      password: "",
      loading: false,
      isRevealPassword: false,
  })
  useEffect(() => {
    document.getElementsByTagName("meta")[3].content =
    "Connect your customers with OnePay | For Merchants";
  document.getElementsByTagName("meta")[4].content =
    "Say goodbye to cart abandonment by giving your customers a reliable Buy Now Pay Later option from OnePay. Thinking about becoming one of our partners? Sign up now. ";
  }, [])
  
  const handleFinaleSubmit = (e) =>{
    e.preventDefault();

    const { userName, password } = credential;
    // var X_Authorized_userId = encryption(userName, "enc");

    // let X_Authorized_password = encryption(password, "enc");

    // let X_Authorized_Domainname = encryption(window.location.origin, "enc");
    if (userName && password) {
      setCredentials({
        loading: true,
      });
      axios({
        method: "get",
        url: config.apiUrl + "OnePayAccount/merchantLogin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-Authorized-userId": userName.toLocaleLowerCase().trim(),
          "X-Authorized-password": encryption(password, "enc"),
        },
      })
        .then(function (res) {
          let resValid = res.data.message;
          if (resValid === "Valid Login") {
            let decryptedToken = encryption(res.data.responseData.token, "dec");
            window.localStorage.setItem(
              "onepaymerchanttoken",
              res.data.responseData.token
            );
            // setTimeout(function () {
            //   self.props.history.push("/instantPayMerchant/dashboard");
            // }, 100);
            setCredentials({
              loading: false,
            });
            cookies.set("onepaymerchanttoken", res.data.responseData.token, {
              path: "/",
              maxAge: 86400,
            });
            handleGetRolesPermissionsList();
          } else {
            NotificationManager.error(res.data.responseData.message, "", 1500);
            setCredentials({
              loading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
          setCredentials({
            loading: false,
          });
        });
    } else {
      NotificationManager.error("The credentials cannot be empty.", "", 1500);
    }
  }
  const handleGetRolesPermissionsList =()=> {
    var rolesPermissionsData = [];
    setCredentials({
      loading: true,
    });
    axios({
      method: "get",
      url: config.apiUrl + "OnePayMerchantSetting/merchantrolepermissionsbyid",
      headers: merchantAuthHeader(),
      // params: {
      //   searchBy: search,
      // },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // data.map((item) => {
          // if (item.roleName == "Admin") {
          window.localStorage.setItem(
            "OnePayMerchantModule",
            data.mappedModuleName
          );
          window.localStorage.setItem(
            "OnePayMerchanSubModule",
            data.mappedSubModuleName
          );
          // } else if (item.roleName == "User") {
          //   window.localStorage.setItem("Module", item.mappedModuleName);
          //   window.localStorage.setItem("SubModule", item.mappedSubModuleName);
          //   // self.setState({
          //   //   rolesPermissionsData: [],
          //   //   loading: false
          //   // });
          // }
          // })

          // if (search = "Admin") {
          if (
            window.localStorage
              .getItem("OnePayMerchantModule")
              .includes("Dashboard")
          ) {
            setTimeout(function () {
              props.history.push("/onePayMerchant/dashboard");
            }, 100);
          } else if (
            window.localStorage
              .getItem("OnePayMerchantModule")
              .includes("Transaction History")
          ) {
            setTimeout(function () {
              props.history.push("/onePayMerchant/transaction-history");
            }, 100);
          } else if (
            window.localStorage
              .getItem("OnePayMerchantModule")
              .includes("Subscription")
          ) {
            setTimeout(function () {
              props.history.push("/onePayMerchant/merchantSubscription");
            }, 100);
          } else if (
            window.localStorage
              .getItem("OnePayMerchantModule")
              .includes("Settings")
          ) {
            setTimeout(function () {
              props.history.push("/onePayMerchant/merchantSetting");
            }, 100);
          }

          // } else if (search = "User") {
          //   setTimeout(function () {
          //     self.props.history.push("/user/dashboard");
          //   }, 100);
          // } else if (search = "Merchant") {
          //   setTimeout(function () {
          //     self.props.history.push("/merchant/dashboard");
          //   }, 100);
          // } else if (search = "Customer") {
          //   setTimeout(function () {
          //     self.props.history.push("/user/userdashboard");
          //   }, 100);
          // }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  const handleClearCookies =()=> {
    localStorage.clear();
  }
   const handleInputOnchange = (e) => {
    setCredentials({
      [e.target.name]: e.target.value,
    });
  };
  const togglePassword = (event) => {
    setCredentials({ isRevealPassword: !credential.isRevealPassword });
  };
  return (
    <div>
      <MerchantLogins />
      <div className='sign_in_page'>
        <div className='sign_in_image_part'>
          <img src={signinImg} alt="signin_img" className='image_only' />
        </div>
        <div className='credential_part'>
          <form name="sign-in-form" onSubmit={handleFinaleSubmit}>
            <div className="input-cntr">
              <div className="input-icons">
                <img src={avatar} alt="icon missing" />
              </div>
              <input
                type="text"
                placeholder="Enter Email ID"
                name="userName"
                value={credential.userName}
                maxLength={100}
                autoComplete="off"
                onChange={handleInputOnchange}
              />
            </div>
            <div className="input-cntr">
              <div className="input-icons">
                <img src={lock} alt="icon missing" />
              </div>
              <input
                type={credential.isRevealPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={credential.password}
                maxLength={25}
                autoComplete="off"
                onChange={handleInputOnchange}
              />
              <div
                className="input-icons cursor-pointer m-0 ml-2"
                onClick={togglePassword}
              >
                {credential.isRevealPassword ? (
                  <img src={eye} alt="icon missing" />
                ) : (
                  // <i
                  //   class="fa fa-eye-slash icon-eye-slash"
                  //   aria-hidden="true"
                  // ></i>
                  <img src={hidepassword} alt="icon missing" />
                )}
              </div>
            </div>
            <div className="flex-parted">
              <span></span>
              <NavLink
                to="onePayMerchantForgotPassword"
                className="font-14-500 color-dark-blue"
              >
                Forgot Password ?
              </NavLink>
            </div>
            <button
              type="submit"
              className="butn mx-auto"
              disabled={credential.loading}
              onClick={handleFinaleSubmit}
            >
              {credential.loading && (
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faCircleNotch}
                  size="sm"
                  spin
                />
              )}
              Sign In
            </button>
            <NavLink to="onePaySignUp">
              <p className="mtop10 fsize14">Sign Up</p>
            </NavLink>
          </form>

        </div>
      </div>
    </div>
  )
}

export default SplitMerchantLogins