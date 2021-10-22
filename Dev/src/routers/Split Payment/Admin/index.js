import React, { Component } from "react";
import { Route } from "react-router-dom";
import SplitLayout from "./splitMasterLayout";
import SplitAdminDashboard from "./splitAdminDashboard";
import SplitAdminProfile from "./splitAdminProfile";
import SplitAdminUserManagement from "./splitAdminUserManagement";
import SplitAdminMerchantManagement from "./splitAdminMerchantManagement";
import SplitAdminUserManagementDetails from "./splitAdminUserManagementDetails";
import SplitAdminMerchantManagementDetails from "./splitAdminMerchantManagementDetails";
import SplitAdminSetting from "./splitAdminSetting";
import SplitPaymentManagement from "../Setting/Admin/splitPaymentManagement";
import SplitTransactionManagement from "../Setting/Admin/splitTransactionManagement";
import { NotificationContainer } from "react-notifications";
import SplitRolesPermission from "../Setting/Admin/splitRolesPermission";
import SplitInstantPayUserManagement from "../Setting/Admin/splitInstantPayUserManagement";
import SplitSubscriptionManagement from "../Setting/Admin/splitSubscriptionManagement";
import SplitAlertTemplateManagement from "../Setting/Admin/splitAlertTemplateManagement";
import SplitAdminNotification from "./splitAdminNotification";
import SplitInstallmentDetails from "../Setting/Admin/splitInstallmentDetails";
import SplitMerchantDetails from "../Setting/Admin/splitMerchantDetails";
// import contentManagement from "../Settings/Admin/contentManagement";

export class index extends Component {
  render() {
    
    const { match } = this.props;
    return (
      <SplitLayout>
        <Route
          exact
          path={`${match.url}/dashboard`}
          component={SplitAdminDashboard}
        />
        <Route
          exact
          path={`${match.url}/adminProfile`}
          component={SplitAdminProfile}
        />
        <Route
          exact
          path={`${match.url}/adminUserManagement`}
          component={SplitAdminUserManagement}
        />
        <Route
          exact
          path={`${match.url}/adminMerchantManagement`}
          component={SplitAdminMerchantManagement}
        />
        <Route
          exact
          path={`${match.url}/adminUserManagementDetails`}
          component={SplitAdminUserManagementDetails}
        />
        <Route
          exact
          path={`${match.url}/adminMerchantManagementDetails`}
          component={SplitAdminMerchantManagementDetails}
        />
        <Route
          exact
          path={`${match.url}/adminSetting`}
          component={SplitAdminSetting}
        />
        <Route
          exact
          path={`${match.url}/adminNotification`}
          component={SplitAdminNotification}
        />
        <Route
          exact
          path={`${match.url}/subscriptionManagement`}
          component={SplitSubscriptionManagement}
        />
        <Route
          exact
          path={`${match.url}/splitPaymentManagement`}
          component={SplitPaymentManagement}
        />
        <Route
          exact
          path={`${match.url}/paymentManagement`}
          component={SplitTransactionManagement}
        />
        <Route
          exact
          path={`${match.url}/installmentDetails`}
          component={SplitInstallmentDetails}
        />
        <Route
          exact
          path={`${match.url}/merchantDetails`}
          component={SplitMerchantDetails}
        />
        <Route
          exact
          path={`${match.url}/alertTemplateManagement`}
          component={SplitAlertTemplateManagement}
        />
        <Route
          exact
          path={`${match.url}/rolesPermission`}
          component={SplitRolesPermission}
        />
        <Route
          exact
          path={`${match.url}/instantPayUserManagement`}
          component={SplitInstantPayUserManagement}
        />
        {/* <Route
          exact
          path={`${match.url}/splitPaymentManagement`}
          component={splitPaymentManagement}
        />
        <Route
          exact
          path={`${match.url}/paymentManagement`}
          component={paymentManagement}
        />
        <Route
          exact
          path={`${match.url}/rolesPermission`}
          component={rolesPermission}
        />
        <Route
          exact
          path={`${match.url}/instantPayUserManagement`}
          component={instantPayUserManagement}
        />
        
        <Route
          exact
          path={`${match.url}/alertTemplateManagement`}
          component={alertTemplateManagement}
        />
        
        <Route
          exact
          path={`${match.url}/installmentDetails`}
          component={installmentDetails}
        />
        <Route
          exact
          path={`${match.url}/contentManagement`}
          component={contentManagement}
        /> */}
        <NotificationContainer />
      </SplitLayout>
    );
  }
}

export default index;
