import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";

///-------------------Css-------------------------------
import "react-notifications/lib/notifications.css";
import "react-responsive-modal/styles.css";
import "antd/dist/antd.css";
import "./assets/css/style.css";
import "./assets/css/custome.css";
import "./assets/css/responsive.css";
import "./assets/css/newDesign.css";
import './assets/css/newResponsive.css'

///--------------------js---------------------------------
import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./../node_modules/jquery/dist/jquery.js";
import "./../node_modules/popper.js/dist/popper.js";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";

import SignIn from "./component/Admin/SignIn";
import AdminForgotPassword from "./component/Admin/ForgotPassword";
import Admin from "./../src/routers/Admin/index";
import Merchant from "./../src/routers/Merchant/index";
import User from "./../src/routers/User/index";
import ResetPassword from "./component/Admin/ResetPassword";
import ChangePassword from "./component/Admin/changePassword";
import home from "./routers/MerchantMarketing/home";
import contactus from "./routers/MerchantMarketing/contactus";
import apiInformation from "./routers/MerchantMarketing/apiInformation";
import signUpHome from "./routers/MerchantMarketing/signUpHome";
import signInHome from "./routers/MerchantMarketing/signInHome";
import signUp from "./routers/MerchantMarketing/signUp";
import merchantLogin from './component/Merchant/merchantLogin';
import MerchantForgotPassword from "./component/Merchant/ForgotPassword";
import MerchantResetPassword from "./component/Merchant/ResetPassword";
import MerchantChangePassword from "./component/Merchant/changePassword";
import UserSignUp from "./routers/User/userSignUp";
import UserLogin from "./routers/User/userLogin";
import MerchantUserLogin from "./routers/User/merchantUserLogin";
import UserChangePassword from "./routers/User/changePassword";
import UserForgotPassword from "./routers/User/ForgotPassword";
import UserResetPassword from "./routers/User/ResetPassword";
import aboutUs from "./routers/MerchantMarketing/aboutUs";
import faq from "./routers/MerchantMarketing/faq";
import termsAndCondition from "./routers/MerchantMarketing/termsAndCondition";
import policies from "./routers/MerchantMarketing/policies";
import setUp from "./routers/MerchantMarketing/setUp";
import help from "./routers/MerchantMarketing/help";
import whyInstant from "./routers/MerchantMarketing/whyInstant";
import SplitSignIn from "./routers/Split Payment/Admin/SignIn";
import SplitHome from "./routers/Split Payment/MerchantMarketing/SplitHomes"
import splitforbusiness from "./routers/Split Payment/MerchantMarketing/SplitBusinesses"
import SplitSignUp from "./routers/Split Payment/MerchantMarketing/splitSignUp"
import SplitUserSignUp from "./routers/Split Payment/MerchantMarketing/splitUserSignUp"
import SplitAboutUs from "./routers/Split Payment/MerchantMarketing/splitAboutUs"
import SplitAPIInformation from "./routers/Split Payment/MerchantMarketing/splitApiInformation"
import SplitContactUs from "./routers/Split Payment/MerchantMarketing/splitContactUs"
import SplitFAQ from "./routers/Split Payment/MerchantMarketing/splitFaq"
import SplitHelp from "./routers/Split Payment/MerchantMarketing/splitHelp"
import SplitPolicies from "./routers/Split Payment/MerchantMarketing/splitPolicies"
import SplitSetUp from "./routers/Split Payment/MerchantMarketing/splitSetUp"
import SplitTermsAndCondition from "./routers/Split Payment/MerchantMarketing/splitTermsAndCondition"
import SplitWhyInstant from "./routers/Split Payment/MerchantMarketing/splitWhyInstant"
import SplitSignInHome from "./routers/Split Payment/MerchantMarketing/splitSignInHome"
import SplitSignUpHome from "./routers/Split Payment/MerchantMarketing/splitSignUpHome"
import SplitAdmin from "./routers/Split Payment/Admin/index"
import oneclick from "./routers/MerchantMarketing/oneclick";
import planPayment from "./routers/MerchantMarketing/planPayment";
import splitpay from "./routers/Split Payment/MerchantMarketing/splitpay";
import splitPlanPayment from "./routers/Split Payment/MerchantMarketing/splitPlanPayment";
import SplitAdminForgotPassword from "./routers/Split Payment/Admin/ForgotPassword";
import SplitResetPassword from "./routers/Split Payment/Admin/ResetPassword";
import SplitChangePassword from "./routers/Split Payment/Admin/changePassword";
import SplitMerchantSignIn from "./routers/Split Payment/Merchant/splitMerchantLogin";
import SplitMerchantLogins from './routers/Split Payment/Merchant/SplitMerchantLogins'
import SplitMerchantForgotPassword from "./routers/Split Payment/Merchant/splitForgotPassword";
import SplitMerchantResetPassword from "./routers/Split Payment/Merchant/splitResetPassword";
import SplitMerchantChangePassword from "./routers/Split Payment/Merchant/splitChangePassword";
import SplitMerchant from "./routers/Split Payment/Merchant/index";
import SplitUser from "./routers/Split Payment/User/index";
import SplitUserLogin from "./routers/Split Payment/User/splitUserLogin";
import SplitUserChangePassword from "./routers/Split Payment/User/splitChangePassword";
import SplitUserForgotPassword from "./routers/Split Payment/User/splitForgotPassword";
import SplitUserResetPassword from "./routers/Split Payment/User/splitResetPassword";
import InstantPayForm from "./routers/InstantPayAPI/instantPayForm";
import onePayForm from "./routers/OnePayAPI/onePayForm";
import MerchantStripeAccount from "./routers/MerchantMarketing/merchantStripeAccount";
import SplitMerchantStripeAccount from "./routers/Split Payment/MerchantMarketing/splitMerchantStripeAccount";
import merchantstrippop from "./routers/MerchantMarketing/merchantstrippop";
import SplitMerchantUserLogin from "./routers/Split Payment/User/splitMerchantUserLogin";
import apiDocMerchant from "./routers/MerchantMarketing/apiDocMerchant";
import splitAPIDoc from "./routers/Split Payment/MerchantMarketing/splitAPIDoc";
import forbusiness from "./routers/MerchantMarketing/forbusiness";

ReactDOM.render(
  <Router>
    <Route exact path="/instantPayAdminLogin" component={SignIn} />
    <Route exact path="/instantPayAdminForgotPassword" component={AdminForgotPassword} />
    <Route exact path="/instantPayAdminResetPassword" component={ResetPassword} />
    <Route exact path="/instantPayAdminChangePassword" component={ChangePassword} />
    <Route path="/instantPayAdmin" component={Admin} />
    <Route path="/instantPayMerchant" component={Merchant} />
    <Route path="/instantPayUser" component={User} />
    {/* MerchantMarketing Pages */}
    <Route exact path="/merchantHome" component={home} />
    <Route exact path="/instantPayforbusiness" component={forbusiness} />
    <Route exact path="/instantPayContactUs" component={contactus} />
    <Route exact path="/instantPayApiInformation" component={apiInformation} />
    <Route exact path="/instantPaySignUpHome" component={signUpHome} />
    <Route exact path="/instantPaySignInHome" component={signInHome} />
    <Route exact path="/instantPaySignUp" component={signUp} />
    <Route exact path="/instantPay" component={oneclick} />
    <Route exact path="/instantPayPlanPayment" component={planPayment} />
    <Route exact path="/onePay" component={splitpay} />
    <Route exact path="/onePayPlanPayment" component={splitPlanPayment} />
    {/* Merchant Pages */}
    <Route exact path="/instantPayMerchantLogin" component={merchantLogin} />
    <Route exact path="/instantPayMerchantForgotPassword" component={MerchantForgotPassword} />
    <Route exact path="/instantPayMerchantResetPassword" component={MerchantResetPassword} />
    <Route exact path="/instantPayMerchantChangePassword" component={MerchantChangePassword} />
    {/* User Pages */}
    <Route exact path="/instantPayUserSignUp" component={UserSignUp} />
    <Route exact path="/instantPayUserLogin" component={UserLogin} />
    <Route exact path="/instantPayLogin" component={MerchantUserLogin} />
    <Route exact path="/instantPayUserChangePassword" component={UserChangePassword} />
    <Route exact path="/instantPayUserForgotPassword" component={UserForgotPassword} />
    <Route exact path="/instantPayUserResetPassword" component={UserResetPassword} />
    <Route exact path="/instantPayAboutUs" component={aboutUs} />
    <Route exact path="/instantPayFaq" component={faq} />
    <Route exact path="/instantPayPolicies" component={policies} />
    <Route exact path="/instantPayTermsAndCondition" component={termsAndCondition} />
    <Route exact path="/instantPaySetUp" component={setUp} />
    <Route exact path="/instantPayHelp" component={help} />
    <Route exact path="/instantPayWhyInstant" component={whyInstant} />
    <Route exact path="/apiDocMerchant" component={apiDocMerchant} />
    {/* Split Admin Pages */}
    <Route path="/onePayAdmin" component={SplitAdmin} />
    <Route exact path="/admin" component={SplitSignIn} />
    <Route exact path="/onePayAdminForgotPassword" component={SplitAdminForgotPassword} />
    <Route exact path="/onePayAdminResetPassword" component={SplitResetPassword} />
    <Route exact path="/onePayAdminChangePassword" component={SplitChangePassword} />
    {/* Split Merchant Marketing Pages */}
    <Route exact path="/" component={SplitHome} />
    <Route exact path="/onePayforbusiness" component={splitforbusiness} />
    <Route exact path="/onePaySignUp" component={SplitSignUp} />
    <Route exact path="/onePayUserSignUp" component={SplitUserSignUp} />
    <Route exact path="/onePayAboutUs" component={SplitAboutUs} />
    <Route exact path="/onePayApiInformation" component={SplitAPIInformation} />
    <Route exact path="/onePayContactUs" component={SplitContactUs} />
    <Route exact path="/onePayFAQ" component={SplitFAQ} />
    <Route exact path="/onePayHelp" component={SplitHelp} />
    <Route exact path="/onePayPolicies" component={SplitPolicies} />
    <Route exact path="/onePaySetUp" component={SplitSetUp} />
    <Route exact path="/onePayTermsAndCondition" component={SplitTermsAndCondition} />
    <Route exact path="/onePayWhyInstant" component={SplitWhyInstant} />
    <Route exact path="/onePaySignInHome" component={SplitSignInHome} />
    <Route exact path="/onePaySignUpHome" component={SplitSignUpHome} />
    <Route exact path="/splitAPIDoc" component={splitAPIDoc} />
    {/* Split Merchant Pages */}
    <Route path="/onePayMerchant" component={SplitMerchant} />
    <Route exact path="/merchant" component={SplitMerchantSignIn} />
    <Route exact path="/merchants" component={SplitMerchantLogins} />
    <Route exact path="/onePayMerchantForgotPassword" component={SplitMerchantForgotPassword} />
    <Route exact path="/onePayMerchantResetPassword" component={SplitMerchantResetPassword} />
    <Route exact path="/onePayMerchantChangePassword" component={SplitMerchantChangePassword} />
    {/* Split Customer Pages */}
    <Route path="/onePayUser" component={SplitUser} />
    <Route exact path="/customer" component={SplitUserLogin} />
    <Route exact path="/onePayUserForgotPassword" component={SplitUserForgotPassword} />
    <Route exact path="/onePayUserResetPassword" component={SplitUserResetPassword} />
    <Route exact path="/onePayUserChangePassword" component={SplitUserChangePassword} />
    <Route exact path="/onePayLogin" component={SplitMerchantUserLogin} />

    <Route exact path="/instantPayForm" component={InstantPayForm} />
    <Route exact path="/onePayForm" component={onePayForm} />
    <Route exact path="/instantPayMerchantStripeAccount" component={MerchantStripeAccount} />
    <Route exact path="/onePayMerchantStripeAccount" component={SplitMerchantStripeAccount} />
    <Route exact path="/merchantstrippop" component={merchantstrippop} />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
