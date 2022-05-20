import React, { Component } from 'react'
import { Tabs } from 'antd';
import { Table, Tag, Space } from 'antd';
import { Card } from 'antd';
import leftarrow from "./../../../assets/Images/leftarrow.png";

import Header from "./splitHeader";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";
import { Link } from "react-router-dom";

import onepayFooterLogo from "../../../assets/Images/onepay-footer-logo.png";

class splitAPIDoc extends Component {
    render() {

        return (
            <div className="apibg">
                <Header />
                <div className="back__btn mt-3 mb-3" >
                    <a href="./"><img src={leftarrow} alt="backarrow" /></a>
                </div>
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
                                                    <li><a class="active" href="#about-overview" data-toggle="tab">About One Pay</a></li>
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
                                                    <li><a href="#installment-plan" data-toggle="tab">Installment Plan</a></li>
                                                    <li><a href="#installment-details" data-toggle="tab">Installment Details</a></li>
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
                                            <h3>About One Pay</h3>
                                            <p>Our Platform enables customers to avail EMIs offered on credit cards issued by all major banks. After the purchase is done, the customer is charged on a monthly/weekly basis, according to the credit card billing cycle or payment terms agreed on our website.</p>
                                            <p>Merchants/Customers can get the information regarding the EMI structure, can view the equated installments, can repay early or close the EMI prior the structured dates.</p>
                                        </div>

                                        <div class="tab-pane" id="purpose-overview">
                                            <h3>Purpose</h3>
                                            <p>The objective of this document is to enable users to work with the various API frameworks and help them understand our system environment.</p>
                                            <p>These API’s will help you execute/monitor your Subscriptions and information related to it can be traced in real time.</p>
                                            <p>Our REST API’s  has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.</p>
                                        </div>

                                        <div class="tab-pane" id="api-calls">
                                            <h3>API Calls</h3>
                                            <p>One Pay Offers <strong>Sandbox</strong> and <strong>Production</strong> environments. All development work should be done in our sandbox environment.</p>
                                            <p>One Pay API request uses the HTTP POST method and requires HTTPS as well as the header parameter <br /> <strong>Content-Type = application/json</strong>.</p>
                                            <p>Your requests will have a different body depending on which operation is called.</p>
                                            <p><strong>We have Tokenized system implemented for entire process.</strong></p>
                                            <p>Token are small packets of data which store the information of the users, it does not store the password, but helps validates the Server system about the user passes the information.</p>

                                            <br /><br />
                                            <h3>API Configuration and Setup</h3>
                                            <p><strong>Iframe URL : </strong><a href="https://www.onepay.ai/OnePayForm?amt=&order=&appkey=">
                                                https://www.onepay.ai/OnePayForm?amt=&order=&appkey=
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
                                            <p><strong>URL</strong> : <a href="https://merchant.onepay.ai/api/OnePay/merchantValidator">
                                                https://merchant.onepay.ai/api/OnePay/merchantValidator</a></p>
                                            <ul>
                                                <li>The Login operation enables a connection with One pay API operations</li>
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
X-Authorized-userId = "API USER ID"
X-Authorized-password = "API PASSWORD"
X-Authorized-Appkey = "APP KEY"
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

                                            <p><strong>Note: </strong>If Merchant fails to validate details he will be redirected to the login page of website and asked for Registration details and login detail on <strong>One pay</strong> portal.</p>
                                        </div>

                                        <div class="tab-pane" id="customer-validator">
                                            <h3>Customer Validator</h3>
                                            <p><strong>URL : </strong><a href="https://merchant.onepay.ai/api/OnePay/customervalidator">
                                                https://merchant.onepay.ai/api/OnePay/customervalidator
                                        </a></p>
                                            <ul>
                                                <li>Once the customer user places the order on the merchant website, Customer user is directed to the checkout option.</li>
                                                <li>At check out when he selects the One pay as the mode of payment, he is redirected to the <strong>One pay </strong>portal.</li>
                                            </ul>
                                            <p>Once the details are filled it, the server validated the details and check if the customer user is eligible for the credit.</p>
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
X-Authorized-customerId = "API CUSTOMER ID"
X-Authorized-Appkey = "APP KEY"`}
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
                                            <p><strong>Note : </strong>If customer user fails to validate details he will redirected to the login page of website and asked for Registration details and login detail on <strong>One pay</strong> portal.</p>
                                        </div>

                                        <div class="tab-pane" id="installment-plan">
                                            <h3>Installment Plan</h3>
                                            <p><strong>URL : </strong><a href="https://merchant.onepay.ai/api/OnePay/getloanduration">
                                                https://merchant.onepay.ai/api/OnePay/getloanduration
                                        </a></p>
                                            <p>The Installment plan will be displayed once the customer is validated.</p>
                                            <ul>
                                                <li>The installment plan details display the number of installment that can be configured for the eligible customer.</li>
                                                <li>This gives the customer/merchant user a consolidated view on how an Installment plan will be for the purchase.</li>
                                            </ul>
                                            <br />
                                            <p><strong>Headers</strong></p>
                                            <p>Content-Type= "application/json"</p>
                                            <p>X-Authorized-token = "Token"</p>
                                            <p>X-Authorized-Appkey = "APP KEY"</p>
                                            <br />
                                            <p><strong>Request Description</strong></p>
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
                                                            <p><strong>X Authorized token</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>A Token is alphanumeric unique key generated every time merchant <br /> user is created, this is modified whenever user details are changed <br /> or modified a new token is generated.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>X Authorized Appkey</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>APP key is the unique key allotted to the Merchant to validated his <br /> subscription, App key is only  granted once the merchant buys <br /> subscription plan it maps the merchant to the plan and <br />offers them services accordingly.</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="code__card">
                                                <p><strong>Request</strong></p>
                                                <pre>
                                                    {`{

X-Authorized-token = "TOKEN"
X-Authorized-Appkey = "APP KEY"
Origin = ""

}`}
                                                </pre>
                                            </div>
                                            <p><strong>Response Description</strong></p>
                                            <table class="table table-hover table-bordered">
                                                <tbody>
                                                    <tr class="table__head">
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
                                                    <tr>
                                                        <td>
                                                            <p><strong>Period</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>The term of which credit is required month/week</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Pay date</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Date</p>
                                                        </td>
                                                        <td>
                                                            <p>Date of installment cycle</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Payment</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Amount to be paid as installment</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Current balance</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Existing balance of the credit plan</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Interest</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Rate of interest charged</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Principal</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Purchase amount</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Duration</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Date and time</p>
                                                        </td>
                                                        <td>
                                                            <p>Current consumed months</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="code__card">
                                                <p><strong>Response</strong></p>
                                                <pre>
                                                    {`{
"LoanAmount":12000  
}
Response Body
{
    "message": "Success",
    "status": true,
    "responseData": [
        {
            "period": 9,
            "payDate": null,
            "payment": 0,
            "currentbalance": 0,
            "interest": 0,
            "principal": 0,
            "duration": "M"
        },
        {
            "period": 3,
            "payDate": null,
            "payment": 0,
            "currentbalance": 0,
            "interest": 0,
            "principal": 0,
            "duration": "M"
        },
        {
            "period": 6,
            "payDate": null,
            "payment": 0,
            "currentbalance": 0,
            "interest": 0,
            "principal": 0,
            "duration": "M"
        }
    ],
    "statusCode": 101
}`}
                                                </pre>
                                            </div>

                                        </div>

                                        <div class="tab-pane" id="installment-details">
                                            <h3>Installment Details</h3>
                                            <p><strong>URL : </strong><a href="https://merchant.onepay.ai/api/OnePay/getinstallmentdetail">
                                                https://merchant.onepay.ai/api/OnePay/getinstallmentdetail
                                        </a></p>
                                            <ul>
                                                <li>The once the plan is selected customer user can select the installment cycle from the options offered.</li>
                                                <li>Customer user can select the duration of the credit loan offered.</li>
                                                <li>Instalment cycles are predefined by the system server, Merchant cannot change or modify the cycle.</li>
                                                <li>Instalment cycle once selected cannot be reversed.</li>
                                            </ul>

                                            <p><strong>Headers</strong></p>
                                            <p>Content-Type= "application/json"</p>
                                            <p>X-Authorized-token = "Token"</p>
                                            <p>X-Authorized-Appkey = "APP KEY"</p>

                                            <p><strong>Request Description</strong></p>
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
                                                            <p><strong>Loan amount</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>Generated at the merchants website as per the pricing of the product <br /> or service.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Interest rate</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>Interest rate will set by One Pay server, according to the offer and eligibility <br /> of customer user.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Loan Period</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>Loan Period will be offered according to the pricing of product.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Start payment date</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Yes</p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>Start payment date will be the date on which the first instalment <br /> will be deducted from the customer user account.</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="code__card">
                                                <p><strong>Request</strong></p>
                                                <pre>
                                                    {`{
"LoanAmount":5000,   
"InterestRate":20,   
"LoanPeriod": 3,  
 "StartPaymentDate":"2021-01-29 13:07:43.983"
}`}
                                                </pre>
                                            </div>

                                            <p><strong>Response Description</strong></p>
                                            <table class="table table-hover table-bordered">
                                                <tbody>
                                                    <tr class="table__head">
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
                                                    <tr>
                                                        <td>
                                                            <p><strong>Period</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>String</p>
                                                        </td>
                                                        <td>
                                                            <p>The term of which credit is required month/week</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Pay date</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Date and time</p>
                                                        </td>
                                                        <td>
                                                            <p>Date of installment cycle</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Payment</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Amount to be paid as installment</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Current balance</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Existing balance of the credit plan</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Interest</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Interest amount charged</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Principal</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>decimal</p>
                                                        </td>
                                                        <td>
                                                            <p>Purchase amount</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p><strong>Duration</strong></p>
                                                        </td>
                                                        <td>
                                                            <p>Date and time</p>
                                                        </td>
                                                        <td>
                                                            <p>Current consumed months</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="code__card">
                                                <p><strong>Response </strong></p>
                                                <pre>
                                                    {`{
    "message": "",
    "status": true,
    "responseData": [
        {
            "period": 1,
            "payDate": "01/29/2021 13:08:00",
            "payment": 1722.51,
            "currentbalance": 3361.00,
            "interest": 83.51,
            "principal": 1639.00,
            "duration": null
        },
        {
            "period": 2,
            "payDate": "02/28/2021 13:08:00",
            "payment": 1722.51,
            "currentbalance": 1694.00,
            "interest": 55.51,
            "principal": 1667.00,
            "duration": null
        },
        {
            "period": 3,
            "payDate": "03/28/2021 13:08:00",
            "payment": 1722.51,
            "currentbalance": 0.00,
            "interest": 28.51,
            "principal": 1694.00,
            "duration": null
        }
    ],
    "statusCode": 101
}`}
                                                </pre>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="refund">
                                            <h3>Refund</h3>
                                            <p><strong>URL : </strong><a href="https://merchant.onepay.ai/api/Refund/refundrequest">https://merchant.onepay.ai/api/Refund/refundrequest</a></p>

                                            <p>There are two types of refunds</p>
                                            <ol>
                                                <li><strong>Merchant Refund : </strong>Merchant refund is the process initiated by merchant user of <strong>One Pay</strong>, they have the access and permission to initiate the repayment or refund to the customer.</li>
                                                <li><strong>Merchant Website refund : </strong>Merchant Website Refund is the process in which a merchant seller website can process the refund request to the Merchant on behalf of customer.</li>
                                            </ol>
                                            <p>In Split pay refund can be done partly too, if the customer has paid the part installment or a single installment and refund request is initiated, customer is liable to get the refund amount and Merchant can refund of the paid amount.</p>
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
                                            <br />
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
                                            <br />
                                            <p><strong>500</strong></p>
                                            <p>The HyperText Transfer Protocol (HTTP) 500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.</p>
                                            <br />
                                            <p><strong>503 </strong></p>
                                            <p>Service Unavailable. The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.</p>
                                            <br />
                                            <p><strong>599</strong></p>
                                            <p>The HyperText Transfer Protocol (HTTP) 599 Internal Server Error server error response code indicates that the server encountered signal a network connection timeout.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-fluid footer__block">
          <div className="row">
            <div className="container">

            <footer className="footer__secton">
              <div className="inpay footer__logo">
                <img src={onepayFooterLogo} width="50px" className="logo__img" />
              </div>
              <div className="footer__Links">
                <ul>
                  <li>
                      <Link to="/">
                          <a>For You</a>
                      </Link>
                  </li>

                  <li>

                      <Link to="/onePayforbusiness">
                          <a>For Business</a>
                      </Link>
                  </li>
                  
                  {/* <li>
                      <Link to="#">
                          <a>Shop</a>
                      </Link>
                  </li> */}

                  <li>
                      <Link to="/splitAPIDoc">
                          <a>API Information</a>
                      </Link>
                  </li>
                </ul>
              </div>

              <div className="footer__socail">
                  <label>Follow Us :</label>
                  <ul>
                    <li>
                      <a className="fa fa-facebook" href="https://www.facebook.com/Onepay-103675854977782" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-instagram" href="https://www.instagram.com/onepay_officials/" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-linkedin" href="https://www.linkedin.com/company/one-pay/about/?viewAsMember=true" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-twitter" href="https://twitter.com/OnePay9" target="_blank"></a>
                    </li>
                  </ul>
              </div>
            </footer>
            <div className="copyright__text">
                <p>© Text, Inc. 2019. We love our users!</p>
            </div>
            </div>
          </div>
        </div>

                {/* <div className="foot">
                    <footer className="container">
                        <div className="inpay">
                        <img src={OnePayLogo} width="150px" className="logo__img" />
                        </div>
                        <div className="foryou">
                        <ul>
                            <li>
                            <Link to="/onePayAboutUs">
                                <p>About Us</p>
                            </Link>
                            <Link to="/onePayContactUs">
                                <p>Contact Us</p>
                            </Link>
                            </li>
                            <li>
                            <Link to="/onePayPolicies">
                                <p>Policies</p>
                            </Link>
                            <Link to="/onePayFAQ">
                                <p>FAQ</p>
                            </Link>
                            </li>
                            <li>
                            <Link to="/splitAPIDoc">
                                <p>API Information</p>
                            </Link>
                            <Link to="/onePayTermsAndCondition">
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
                    </div> */}
            </div>
        )
    }
}

export default splitAPIDoc
