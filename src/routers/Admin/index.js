import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./../../component/Admin/masterLayout";
import adminDashboard from "./adminDashboard";
import adminProfile from "./adminProfile";
import adminUserManagement from "./adminUserManagement";
import adminMerchantManagement from "./adminMerchantManagement";
import adminUserManagementDetails from "./adminUserManagementDetails";
import adminMerchantManagementDetails from "./adminMerchantManagementDetails";
import adminSetting from "./adminSetting";
import splitPaymentManagement from "./../Settings/Admin/splitPaymentManagement";
import paymentManagement from "../Settings/Admin/paymentManagement";
import { NotificationContainer } from "react-notifications";
import rolesPermission from "../Settings/Admin/rolesPermission";
import instantPayUserManagement from "../Settings/Admin/instantPayUserManagement";
import subscriptionManagement from "../Settings/Admin/subscriptionManagement";
import alertTemplateManagement from "../Settings/Admin/alertTemplateManagement";
import adminNotification from "./adminNotification";
import installmentDetails from "../Settings/Admin/installmentDetails";
import contentManagement from "../Settings/Admin/contentManagement";
import MerchantDetails from "../Settings/Admin/merchantDetails"

export class index extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route
          exact
          path={`${match.url}/dashboard`}
          component={adminDashboard}
        />
        <Route
          exact
          path={`${match.url}/adminProfile`}
          component={adminProfile}
        />
        <Route
          exact
          path={`${match.url}/adminUserManagement`}
          component={adminUserManagement}
        />
        <Route
          exact
          path={`${match.url}/adminMerchantManagement`}
          component={adminMerchantManagement}
        />
        <Route
          exact
          path={`${match.url}/adminUserManagementDetails`}
          component={adminUserManagementDetails}
        />
        <Route
          exact
          path={`${match.url}/adminMerchantManagementDetails`}
          component={adminMerchantManagementDetails}
        />
        <Route
          exact
          path={`${match.url}/adminSetting`}
          component={adminSetting}
        />
        <Route
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
          path={`${match.url}/subscriptionManagement`}
          component={subscriptionManagement}
        />
        <Route
          exact
          path={`${match.url}/alertTemplateManagement`}
          component={alertTemplateManagement}
        />
        <Route
          exact
          path={`${match.url}/adminNotification`}
          component={adminNotification}
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
        />
        <Route
          exact
          path={`${match.url}/merchantDetails`}
          component={MerchantDetails}
        />
        <NotificationContainer />
      </Layout>
    );
  }
}

export default index;
