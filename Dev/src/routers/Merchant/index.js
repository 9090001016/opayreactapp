import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./../../component/MerchantMarketing/masterLayout";
import merchantDashboard from "./merchantDashboard";
import transactionHistory from "./transactionHistory";
import merchantSetting from "./merchantSetting";
import rolespermission from "../Settings/Merchant/rolespermission";
import merchantusermanagement from "../Settings/Merchant/merchantusermanagement";
import { NotificationContainer } from "react-notifications";
import notification from "./notification";
import salesReport from "./salesReport";
import { merchantSubscription } from "./merchantSubscription";
import planPayment from "./planPayment";
import currentActivePlan from "./currentActivePlan";
import merchantProfile from "./merchantProfile";
import transactionHistoryDetails from "./transactionHistoryDetails";
import instantCheckout from "./instantCheckout";
import cardDetails from "./cardDetails";

export class index extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route
          exact
          path={`${match.url}/dashboard`}
          component={merchantDashboard}
        />
        <Route
          exact
          path={`${match.url}/transaction-history`}
          component={transactionHistory}
        />
        <Route
          exact
          path={`${match.url}/transaction-history-details`}
          component={transactionHistoryDetails}
        />
        <Route
          exact
          path={`${match.url}/merchantSetting`}
          component={merchantSetting}
        />
        <Route
          exact
          path={`${match.url}/rolespermission`}
          component={rolespermission}
        />
        <Route
          exact
          path={`${match.url}/merchantusermanagement`}
          component={merchantusermanagement}
        />
        <Route
          exact
          path={`${match.url}/notification`}
          component={notification}
        />
        <Route
          exact
          path={`${match.url}/salesReport`}
          component={salesReport}
        />
        <Route
          exact
          path={`${match.url}/merchantSubscription`}
          component={merchantSubscription}
        />
        <Route
          exact
          path={`${match.url}/planPayment`}
          component={planPayment}
        />
        <Route
          exact
          path={`${match.url}/currentActivePlan`}
          component={currentActivePlan}
        />
        <Route
          exact
          path={`${match.url}/merchantProfile`}
          component={merchantProfile}
        />
        <Route
          exact
          path={`${match.url}/checkout`}
          component={instantCheckout}
        />
        <Route
          exact
          path={`${match.url}/carddetails`}
          component={cardDetails}
        />
        <NotificationContainer />
      </Layout>
    );
  }
}

export default index;
