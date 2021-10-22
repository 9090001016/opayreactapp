import React, { Component } from "react";
import { Route } from "react-router-dom";
import SplitLayout from "./masterLayout";
import SplitMerchantDashboard from "./splitMerchantDashboard";
import SplitTransactionHistory from "./splitTransactionHistory";
import SplitMerchantSetting from "./splitMerchantSetting";
import SplitRolespermission from "../Setting/Merchant/rolespermission";
import SplitMerchantUserManagement from "../Setting/Merchant/merchantusermanagement";
import { NotificationContainer } from "react-notifications";
import SplitNotification from "./splitNotification";
import SplitSalesReport from "./splitSalesReport";
import SplitMerchantSubscription from "./splitMerchantSubscription";
import SplitPlanPayment from "./splitPlanPayment";
import SplitCurrentActivePlan from "./splitCurrentActivePlan";
import SplitMerchantProfile from "./splitMerchantProfile";
import SplitTransactionHistoryDetails from "./splitTransactionHistoryDetails";
import splitCheckout from "./splitCheckout";
import SplitCardDetails from "./splitCardDetails";

export class index extends Component {
  render() {
    
    const { match } = this.props;
    return (
      <SplitLayout>
        <Route
          exact
          path={`${match.url}/dashboard`}
          component={SplitMerchantDashboard}
        />
        <Route
          exact
          path={`${match.url}/transaction-history`}
          component={SplitTransactionHistory}
        />
        <Route
          exact
          path={`${match.url}/transaction-history-details`}
          component={SplitTransactionHistoryDetails}
        />
        <Route
          exact
          path={`${match.url}/merchantSetting`}
          component={SplitMerchantSetting}
        />
        <Route
          exact
          path={`${match.url}/rolespermission`}
          component={SplitRolespermission}
        />
        <Route
          exact
          path={`${match.url}/merchantusermanagement`}
          component={SplitMerchantUserManagement}
        />
        <Route
          exact
          path={`${match.url}/notification`}
          component={SplitNotification}
        />
        <Route
          exact
          path={`${match.url}/salesReport`}
          component={SplitSalesReport}
        />
        <Route
          exact
          path={`${match.url}/merchantSubscription`}
          component={SplitMerchantSubscription}
        />
        <Route
          exact
          path={`${match.url}/planPayment`}
          component={SplitPlanPayment}
        />
        <Route
          exact
          path={`${match.url}/currentActivePlan`}
          component={SplitCurrentActivePlan}
        />
        <Route
          exact
          path={`${match.url}/merchantProfile`}
          component={SplitMerchantProfile}
        />
        <Route
          exact
          path={`${match.url}/checkout`}
          component={splitCheckout}
        />
        <Route
          exact
          path={`${match.url}/carddetails`}
          component={SplitCardDetails}
        />
        <NotificationContainer />
      </SplitLayout>
    );
  }
}

export default index;
