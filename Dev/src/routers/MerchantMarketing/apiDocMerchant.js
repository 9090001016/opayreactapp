import React, { Component } from 'react'
import { Tabs } from 'antd';
import { Table, Tag, Space } from 'antd';
import { Card } from 'antd';
import leftarrow from "./../../assets/Images/leftarrow.png";
import Header from "./../MerchantMarketing/header";
import InstantLogo from "./../../assets/Images/Instant-logo.png";
import { Link } from "react-router-dom";

class apiDocMerchant extends Component {
    render() {
        
        return (
            <div className="apibg">
                <Header />
                <div className="back__btn mt-3 mb-3" >
                    <a href="./instantPayHome"><img src={leftarrow} alt="backarrow" /></a>
                </div>
                

                {/* rahul */}


                <section class="container-fluid apitab__section">
                    <div class="row">
                        <div class="container">
                            <div class="row">  
                            <div class="col-md-3"> 
                                <div class="left__menu">
                                    <ul class="nav nav-tabs d-block">
                                        <li class="main__menu selected">
                                            <a data-toggle="collapse" data-target="#overviewblock" aria-expanded="false" aria-controls="collapseExample">
                                                <i class="fa fa-chevron-down" aria-hidden="true"></i><span>Overview</span>
                                            </a>
                                        </li>
                                        <div class="collapse collapse__menu" id="overviewblock">
                                            <ul class="nav-tabs sub__menu">
                                                <li><a class="active" href="#about-overview" data-toggle="tab">About Instant Pay</a></li>
                                                <li><a href="#purpose-overview" data-toggle="tab">Purpose</a></li>
                                            </ul>
                                        </div>

                                        <li class="main__menu">
                                            <a data-toggle="collapse" data-target="#apiblock" aria-expanded="false" aria-controls="collapseExample">
                                            <i class="fa fa-chevron-down" aria-hidden="true"></i><span>API Calls</span>
                                            </a>
                                        </li>
                                        <div class="collapse collapse__menu" id="apiblock">
                                            <ul class="nav-tabs sub__menu">
                                                <li><a href="#api-calls" data-toggle="tab">API Configuration and Setup</a></li>
                                                <li><a href="#merchant-login" data-toggle="tab">Merchant Login</a></li>
                                                <li><a href="#customer-validator" data-toggle="tab">Customer Validator</a></li>
                                                <li><a href="#customer-authorization" data-toggle="tab">Customer Payment Authorization</a></li>
                                                <li><a href="#refund" data-toggle="tab">Refund</a></li>
                                            </ul>
                                        </div>

                                        <li class="main__menu">
                                            <a data-toggle="collapse" data-target="#response-codes" aria-expanded="false" aria-controls="collapseExample">
                                            <i class="fa fa-chevron-down" aria-hidden="true"></i><span>Response Codes</span>
                                            </a>
                                        </li>
                                        <div class="collapse collapse__menu" id="response-codes">
                                            <ul class="nav-tabs sub__menu">
                                                <li><a href="#success" data-toggle="tab">Response Codes</a></li>
                                            </ul>
                                        </div>
                                        <li class="main__menu">
                                            <a data-toggle="collapse" data-target="#errors-bloc" aria-expanded="false" aria-controls="collapseExample">
                                            <i class="fa fa-chevron-down" aria-hidden="true"></i><span>Error Handling</span>
                                            </a>
                                        </li>
                                        <div class="collapse collapse__menu" id="errors-bloc">
                                            <ul class="nav-tabs sub__menu">
                                                <li><a href="#error-handling" data-toggle="tab">Error Handling</a></li>
                                            </ul>
                                        </div>
                                        
                                        
                                        
                                    </ul>
                                </div>
                            </div>

                            <div class="col-md-9">
                                <div class="tab-content right__content">
                                    <div class="tab-pane active" id="about-overview">
                                        <h3>About Instant Pay</h3>
                                        <p>Instant Pay is a quick payment checkout option facility that allows the end users of multiple online merchants to instantly checkout when shopping online by choosing Instant Pay as their mode of payment. Merchants can register to the Instant Pay services using the customized APIs which can be called upon to facilitate the quicker checkout for the end customers.</p>
                                        <p>Instant is one click One Pay solution that saves your billing and shipping information, so you don&rsquo;t need to waste your time filling text boxes in the different online store check-outs</p>
                                        </div>
                                    <div class="tab-pane" id="purpose-overview">
                                        <h3>Purpose</h3>
                                        <p>The objective of this document is to enable users to work with the various API frameworks and help them understand our system environment.</p>
                                        <p>These API's will help you execute/monitor your Subscriptions and information related to it can be traced in real time.</p>
                                        <p>Our REST API's has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
                                    </div>
                                    <div class="tab-pane" id="api-calls">
                                    <h3>API Calls</h3>
                                    <p>Instant pay offers <strong>Sandbox</strong> and <strong>Production</strong> environments. All development work should be done in our sandbox environment. </p>
                                    <p>Each API request uses the HTTP POST method and requires HTTPS as well as the header parameter <br/> <strong>Content-Type = application/json</strong>. Each of your requests will have a different body depending on which operation is invoked, and the available requests are described below. </p>
                                    <p><strong>We have Tokenized system implemented for entire process.</strong></p>
                                    <p>Token are small packets of data which store the information of the users, it does not store the password, but helps validates the <strong>Server system</strong> about the user passes the information.</p>
                                    <br/><br/>
                                    <h3>API Configuration and Setup</h3>
                                    <p><strong>Iframe URL : </strong><a href="https://instant.devwebapi.azurewebsites.net/InstantPayForm?amt&order&appkey">
                                        https://instant.devwebapi.azurewebsites.net/InstantPayForm?amt&order&appkey
                                    </a></p>
                                    <ul>
                                        <li>Copy link into the iframe source code of the website.</li>
                                        <li>Set the size of the window and pass the parameters, such as the amount, order id and app key.</li>
                                    </ul>
                                    <p><strong>Parameters</strong></p>
                                    <table class="table table-hover table-bordered">
                                    <tbody>
                                    <tr class="table__head">
                                    <td>
                                    <p><strong>Parameter Name</strong></p>
                                    </td>
                                    <td>
                                    <p><strong>Required</strong></p>
                                    </td>
                                    <td>
                                    <p><strong>Data type</strong></p>
                                    </td>
                                    <td>
                                    <p><strong>Description</strong></p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <p><strong>Order ID</strong></p>
                                    </td>
                                    <td>
                                    <p>Yes</p>
                                    </td>
                                    <td>
                                    <p>String</p>
                                    </td>
                                    <td>
                                    <p>Product/service purchased Order ID</p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <p><strong>Appkey</strong></p>
                                    </td>
                                    <td>
                                    <p>Yes</p>
                                    </td>
                                    <td>
                                    <p>String</p>
                                    </td>
                                    <td>
                                    <p>System generated token mapped to merchant</p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <p><strong>Amount</strong></p>
                                    </td>
                                    <td>
                                    <p>Yes</p>
                                    </td>
                                    <td>
                                    <p>String</p>
                                    </td>
                                    <td>
                                    <p>Cost of the product/service</p>
                                    </td>
                                    </tr>
                                    </tbody>
                                    </table>
                                        </div>



                                    <div class="tab-pane" id="merchant-login">
                                        <h3>Merchant Login</h3>
                                        <p><strong>URL</strong> : <a href="https://instantpay-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/merchantValidator">https://instantpay-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/merchantValidator</a></p>
                                        <ul>
                                        <li>The Login operation enables a connection with Instant API operations.</li>
                                        <li>Authenticate your account using your credentials (API Username and API Password).</li>
                                        <li>Post login the merchant is validated by the system and granted access.</li>
                                        </ul>
                                        <p><strong>Headers</strong></p>
                                        <p>Content-Type= "application/json"</p>
                                        <p>X-Authorized-token = "Token"</p>
                                        <p>X-Authorized-Appkey = "APP KEY"</p>
                                        
                                        <p><strong>Request Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                    </td>
                                                    <td>
                                                    <p><strong>Required</strong></p>
                                                    </td>
                                                    <td>
                                                    <p><strong>Data type</strong></p>
                                                    </td>
                                                    <td>
                                                    <p><strong>Description</strong></p>
                                                    </td>
                                                    </tr>
                                            </thead>
                                        <tbody>
                                        <tr>
                                        <td>
                                        <p><strong>Username</strong></p>
                                        </td>
                                        <td>
                                        <p>Yes</p>
                                        </td>
                                        <td>
                                        <p>String</p>
                                        </td>
                                        <td>
                                        <p>Merchant Username/User id</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p><strong>Password</strong></p>
                                        </td>
                                        <td>
                                        <p>Yes</p>
                                        </td>
                                        <td>
                                        <p>String</p>
                                        </td>
                                        <td>
                                        <p>Merchant Password</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p><strong>Appkey</strong></p>
                                        </td>
                                        <td>
                                        <p>Yes</p>
                                        </td>
                                        <td>
                                        <p>String</p>
                                        </td>
                                        <td>
                                        <p>System generated token mapped to merchant</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        
<div class="code__card">
<p><strong>Request</strong></p>
<pre>
{`X-Authorized-token = "token"
X-Authorized-userId = "API USERNAME"
X-Authorized-password = "API PASSWORD"
X-Authorized-Appkey = "AA14"
Origin = ""`}
</pre>
</div>
                                        
                                        <p><strong>Response Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                        <thead>
                                        <tr>
                                        <td>
                                        <p><strong>Parameter Name</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Required</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Data type</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Description</strong></p>
                                        </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td>
                                        <p><strong>Valid user</strong></p>
                                        </td>
                                        <td>
                                        <p>Yes</p>
                                        </td>
                                        <td>
                                        <p>String</p>
                                        </td>
                                        <td>
                                        <p>Merchant Username/User id verified</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p><strong>First level token</strong></p>
                                        </td>
                                        <td>
                                        <p>Yes</p>
                                        </td>
                                        <td>
                                        <p>String</p>
                                        </td>
                                        <td>
                                        <p>Carries merchant information and <br></br>validates if merchant is valid for accessing the system</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Response</strong></p>
<pre>
{`{
    "message": "Valid user",
    "status": true,
    "responseData": 
{
        "firstLevelToken": "+jP8z2GVFQMMukr2UXj5sA==",
        "secondLevelToken": null,
        "customerId": null
    },
    "statusCode": 101
}`}
</pre>
</div>

                                        <p><strong>Note: </strong>If Merchant fails to validate details he will be redirected to the login page of website and asked for Registration details and login detail on <strong>Instant pay</strong> portal.</p>
                                    </div>
                                    
                                    <div class="tab-pane" id="customer-validator">
                                        <h3>Customer Validator</h3>
                                        <p><strong>URL : </strong><a href="https://instantpay-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/customervalidator">https://instantpay-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/customervalidator</a></p>
                                        <ul>
                                        <li>Once the customer user places the order on the merchant website, Customer user is directed to the checkout option.</li>
                                        <li>At check out when he selects the Instant pay as the mode of payment, he is redirected to the <strong>Instant pay </strong></li>
                                        </ul>
                                        <p>Once the details are filled it, the server validates the details and check if the customer user is eligible for the credit.</p>
                                        <p><strong>Headers&nbsp;</strong></p>
                                        <p>Content-Type= "application/json"</p>
                                        <p>X-Authorized-token = "Token"</p>
                                        <p>X-Authorized-Appkey = "APP KEY"</p>
                                        <p><strong>Request Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Required</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Username</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Customer Username/User id</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Password</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Customer Password</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Appkey</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>System generated token mapped to merchant</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>First level token</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Carries merchant information and validates if merchant is valid for <br></br>accessing the system</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Request</strong></p>
<pre>
{`X-Authorized-token = "First level token"
X-Authorized-customerId = "z2GVFQMMukr"
X-Authorized-Appkey = "AA14"`}
</pre>
</div>
                                        <p><strong>Note</strong>: Here the <strong>App key</strong> helps to identify the specific merchant to the user and redirects the payment accordingly.</p>
                                        <p><strong>Response Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Required</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>First level token</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Carries merchant information and validates if merchant is valid <br></br> for accessing the system</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Second level token</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Carries the information about the customer user to the server.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Customer ID</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>The unique identity given to the customer from server.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Response</strong></p>
<pre>
{`{

"message": "Valid user",
"status": true,
"responseData": 
{
    "firstLevelToken": null,
    "secondLevelToken": "6gLYxTPXIciN6dJv/DlnBw==",
    "customerId": "cus_Ipt0UAZpknuSYO"
},
"statusCode": 101

}`}
</pre>
</div>
                                        <p><strong>Note : </strong>If customer user fails to validate details he will redirected to the login page of website and asked for Registration details and login detail on <strong>Instant pay</strong> portal.</p>
                                    </div>
                                    
                                    <div class="tab-pane" id="customer-authorization">
                                        <h3>Customer Payment Authorization</h3>
                                        <p><strong>URL </strong>: <a href="https://instant-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/customerpayment">https://instant-dev-mrchntwebapi.azurewebsites.net/api/InstantPay/customerpayment</a></p>
                                        <p>Once the customer is validated he is authorized to make the payment through the portal.</p>
                                        <p><strong>Headers</strong></p>
                                        <p>Content-Type= "application/json"</p>
                                        <p>X-Authorized-token = "Token"</p>
                                        <p>X-Authorized-Appkey = "APP KEY"</p>
                                        <p><strong>Request Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Required</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Second level token</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Carries the information about the customer user to the server.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Amount</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>The cost of service or the product to be paid by the customer.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Appkey</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>System generated token mapped to merchant</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Merchant Order ID</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>System generated product/service identification number <br></br> mapped to the purchased product/service.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Request </strong></p>
<pre>
{`{
    "SecondlevelToken": "r8hkfg4VpMWIJuey79hMNv+thbFH9SP5FkBMtr/S72M=",
    "Amount": 100,
    "APPKey": "AA14",
    "MerchantOrderID": "ssd323434"
}`}
</pre>
</div>
                                        <p><strong>Response Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>paymentGType</strong></p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Payment gateway</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>Amount</strong></p>
                                                </td>
                                                <td>
                                                    <p>Decimal</p>
                                                </td>
                                                <td>
                                                    <p>Amount to be paid</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>balanceTransactionId</strong></p>
                                                </td>
                                                <td>
                                                    <p>Decimal</p>
                                                </td>
                                                <td>
                                                    <p>Card transaction token</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>customerId</strong></p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Customer detail token</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>paymentMethod</strong></p>
                                                </td>
                                                <td>
                                                    <p>Decimal</p>
                                                </td>
                                                <td>
                                                    <p>Mode of payment.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>cardType</strong></p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Card company details</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>cardExpMonth</strong></p>
                                                </td>
                                                <td>
                                                    <p>Date and time</p>
                                                </td>
                                                <td>
                                                    <p>Month of card expiry</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>cardExpYear</strong></p>
                                                </td>
                                                <td>
                                                    <p>Date</p>
                                                </td>
                                                <td>
                                                    <p>Year of card expiry</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>cardLast4Digits</strong></p>
                                                </td>
                                                <td>
                                                    <p>Integer</p>
                                                </td>
                                                <td>
                                                    <p>Last 4 digits of the card</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Response Body</strong></p>
<pre>
{`{
    "message": "Success",
    "status": true,
    "responseData": {
        "paymentGType": "Stripe",
        "amount": 100,
        "balanceTransactionId": "txn_1IFjHkJjvVY99yl2Et8ujRhI",
        "customerId": "cus_Infxw1uEyrDQdQ",
        "chargeId": "ch_1IFjHjJjvVY99yl2Ya4ORbXG",
        "paymentMethod": "card_1IC4bZJjvVY99yl2A5RbKKYc",
        "cardType": "mastercard",
        "cardExpMonth": 3,
        "cardExpYear": 2022,
        "cardLast4Digits": 4444,
        "status": "succeeded"
    },
    "statusCode": 101
}`}
</pre>
</div>
                                    </div>
                                    
                                    <div class="tab-pane" id="refund">
                                        <h3>Refund</h3>
                                        <p><strong>URL </strong>: <a href="https://instant-dev-mrchntwebapi.azurewebsites.net/api/Refund/refundrequest">https://instant-dev-mrchntwebapi.azurewebsites.net/api/Refund/refundrequest</a></p>

                                        <p>There are two types of refunds</p>
                                        <ul>
                                        <li><strong>Merchant Refund : </strong>Merchant refund is the process initiated by merchant user of <strong>Instant Pay</strong>, they have the access and permission to initiate the repayment or refund to the customer.</li>
                                        <li><strong>Merchant Website refund : </strong>Merchant Website Refund is the process in which a merchant seller website can process the refund request to the Merchant on behalf of customer.</li>
                                        </ul>
                                        
                                        <p><strong>Headers&nbsp;</strong></p>
                                        <p>Content-Type= "application/json"</p>
                                        <p>X-Authorized-token = "Token"</p>
                                        <p>X-Authorized-Appkey = "APP KEY"</p>
                                        <p><strong>Request Description</strong></p>
                                        <table class="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Required</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>OrderId</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>The alphanumeric identification token dedicated to particular purchase.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>UserId</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>The unique identity given to the customer from server.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>ActualAmount</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>The amount to be refunded as per request raised.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p><strong>IsMerchantrefundInitiated</strong></p>
                                                </td>
                                                <td>
                                                    <p>Yes</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>Initiates the request for processing the refund, when the parameter <br></br> is true, the request get committed and refund is processed <br></br> to the customer.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Request</strong></p>
<pre>
{`{
    "OrderId": "Test",   
    "UserID":1234,   
    "ActualAmount":  "Test",
    "IsMerchantRefundinitiated": true,  

}`}
</pre>
</div>
                                        <p><strong></strong><strong><br />Response Description</strong></p>
                                        <table class="table table-hover table-bordered table-responsive">
                                            <thead>
                                                <tr>
                                                <td>
                                                    <p><strong>Parameter Name</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Required</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Data type</strong></p>
                                                </td>
                                                <td>
                                                    <p><strong>Description</strong></p>
                                                </td>
                                            </tr>
                                            </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="2">
                                                    <p><strong>Message</strong></p>
                                                </td>
                                                <td>
                                                    <p>Success</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>If the app key token matches to the merchant, refund will be initiated successfully.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Invalid App key</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>If App key token fails to match merchant, the refund process will stop.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2">
                                                    <p><strong>Status</strong></p>
                                                </td>
                                                <td>
                                                    <p>True</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>If request is raised by the merchant validated, the refund will initiate.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>False</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>If merchant fails to validate the request, refund will be stopped.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2">
                                                    <p><strong>Response data</strong></p>
                                                </td>
                                                <td>
                                                    <p>Refund Instant successfully</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>the refund process is successfully completed.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Subscription details not found</p>
                                                </td>
                                                <td>
                                                    <p>String</p>
                                                </td>
                                                <td>
                                                    <p>If server fails to fetch the merchant detail.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
<div class="code__card">
<p><strong>Refund successful</strong></p>
<pre>
{`{
    "message": "Success",
    "status": true,
    "responseData": "Refund Instant Successfully",
    "statusCode": 101
}
Response Success`}
</pre>
</div>

<div class="code__card">
<p><strong>Refund Failure</strong></p>
<pre>
{`{
    "message": "Invalid App Key.",
    "status": false,
    "responseData": "Subscription Details Not Found",
    "statusCode": 102
}
Response Failure`}
</pre>
</div>
                                    </div>
                                    
                                    <div class="tab-pane" id="success">
                                        <h3>Response Codes</h3>
                                        <p>The HTTP response codes indicate if a request to the server has been successfully processed or not. This page lists the most common response codes in the system. The API-specific response codes and messages are described in the respective API reference chapters.</p>
                                        <p><strong>Success:</strong></p>
                                        <p>The following tables list the most common response codes in the system when a request is successfully processed.</p>
                                        <p><strong>1xx</strong></p>
                                        <table class="table table-hover table-bordered">
                                        <thead>
                                        <tr>
                                        <td>
                                        <p><strong>Response Code</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Description</strong></p>
                                        </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td>
                                        <p>101</p>
                                        </td>
                                        <td>
                                        <p>Successful</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p>102</p>
                                        </td>
                                        <td>
                                        <p>Request failure</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        <p><strong><br />101</strong></p>
                                        <p>When a user processes the request in the API, if the API call is completed successfully the <strong>101</strong> success token will be generated, and the user will be directed to the desired page.</p>
                                        <br/>
                                        <p><strong>102</strong></p>
                                        <p>When the user processes the request and it has some invalid data the API call will not be successful and <strong>102</strong> token will be generated.</p>
                                    </div>
                                    
                                    <div class="tab-pane" id="error-handling">
                                        <h3>Error Handling</h3>
                                        <p>There are two types of error codes:</p>
                                        <ul>
                                        <li>Client (4xx): Authentication failure or invalid domain on the client side</li>
                                        <li>Server (5xx): Server errors</li>
                                        </ul>
                                        <p>The following tables list the most common error codes in the server system.</p>
                                        <p><strong>4xx</strong></p>
                                        <hr></hr>
                                        <table class="table table-hover table-bordered">
                                        <thead>
                                        <tr>
                                        <td>
                                        <p><strong>Error Code</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Description</strong></p>
                                        </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td>
                                        <p>400</p>
                                        </td>
                                        <td>
                                        <p>Bad request</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p>403</p>
                                        </td>
                                        <td>
                                        <p>Forbidden</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p>404</p>
                                        </td>
                                        <td>
                                        <p>Not found</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        <p><strong><br /> </strong></p>
                                        <p><strong>400</strong></p>
                                        <p>The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error</p>
                                        <p><strong>403</strong></p>
                                        <p>The HTTP 403 Forbidden client error status response code indicates that the server understood the request but refuses to authorize it.</p>
                                        <p><strong>404</strong></p>
                                        <p>A 404 error message is a Hypertext Transfer Protocol (HTTP) status code indicating the server could not find the requested website.</p>
                                        <br></br><br></br>
                                        <p><strong>5xx</strong></p>
                                        <hr></hr>
                                        <table class="table table-hover table-bordered">
                                        <thead>
                                        <tr>
                                        <td>
                                        <p><strong>Error Code</strong></p>
                                        </td>
                                        <td>
                                        <p><strong>Description</strong></p>
                                        </td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        <td>
                                        <p>500</p>
                                        </td>
                                        <td>
                                        <p>Internal server error</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p>503</p>
                                        </td>
                                        <td>
                                        <p>Service unavailable</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                        <p>599</p>
                                        </td>
                                        <td>
                                        <p>Connection timed out</p>
                                        </td>
                                        </tr>
                                        </tbody>
                                        </table>
                                        <br/>
                                        <p><strong>500</strong></p>
                                        <p>The HyperText Transfer Protocol (HTTP) 500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.</p>
                                        <br/>
                                        <p><strong>503 </strong></p>
                                        <p>Service Unavailable. The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.</p>
                                        <br/>
                                        <p><strong>599</strong></p>
                                        <p>The HyperText Transfer Protocol (HTTP) 599 Internal Server Error server error response code indicates that the server encountered signal a network connection timeout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                </section>
                
                <div className="foot">
                    <footer className="container">
                        <div className="inpay">
                        <img src={InstantLogo} width="150px" className="logo__img" />
                        {/* <span>&copy; 1999-2020</span>
                        <a>Privacy Policy Terms and Conditions</a> */}
                        </div>
                        <div className="foryou">
                        <ul>
                            <li>
                            <Link to="/instantPayAboutUs">
                                <p>About Us</p>
                            </Link>
                            <Link to="/instantPayContactUs">
                                <p>Contact Us</p>
                            </Link>
                            </li>
                            <li>
                            <Link to="/instantPayPolicies">
                                <p>Policies</p>
                            </Link>
                            <Link to="/instantPayFaq">
                                <p>FAQ</p>
                            </Link>
                            </li>
                            <li>
                            <Link to="/apiDocMerchant">
                                <p>API Information</p>
                            </Link>
                            <Link to="/instantPayTermsAndCondition">
                                <p>Terms & Conditions</p>
                            </Link>
                            </li>
                        </ul>
                        </div>
                        <div className="signbtn">
                        <ul className="footerlink">
                            <li>
                            <a className="fa fa-facebook" href="https://www.facebook.com/" target="_blank"></a>
                            </li>
                            <li>
                            <a className="fa fa-twitter" href="https://twitter.com/" target="_blank"></a>
                            </li>
                            <li>
                            <a className="fa fa-linkedin" href="https://in.linkedin.com/" target="_blank"></a>
                            </li>
                            <li>
                            <a className="fa fa-instagram" href="https://www.instagram.com/" target="_blank"></a>
                            </li>
                            <li>
                            <a className="fa fa-youtube-play" href="https://www.youtube.com/" target="_blank"></a>
                            </li>
                        </ul>
                        </div>
                    </footer>
                    </div>
            </div>
        )
    }
}

export default apiDocMerchant
