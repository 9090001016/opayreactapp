import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./../../component/User/masterLayout";
import userDashboard from "./userDashboard";
import userTransaction from "./userTransaction";
import paymentDetail from "./paymentDetail";
import userNotification from "./userNotification";
import userProfile from "./userProfile";
import installmentDetails from "./installmentDetails";
import { NotificationContainer } from "react-notifications";

class index extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Route
          exact
          path={`${match.url}/userDashboard`}
          component={userDashboard}
        />
        <Route
          exact
          path={`${match.url}/userTransaction`}
          component={userTransaction}
        />
        <Route
          exact
          path={`${match.url}/paymentDetail`}
          component={paymentDetail}
        />
        <Route
          exact
          path={`${match.url}/userNotification`}
          component={userNotification}
        />
        <Route
          exact
          path={`${match.url}/userProfile`}
          component={userProfile}
        />
        <Route
          exact
          path={`${match.url}/installmentDetails`}
          component={installmentDetails}
        />
        <NotificationContainer />
      </Layout>
    );
  }
}

export default index;
