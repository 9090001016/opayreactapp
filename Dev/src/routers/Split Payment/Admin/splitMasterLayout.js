import React, { Component } from "react";
import SplitAux from "./splitChild";
import SplitHeader from "./SplitHeader";

export default class splitMasterLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <SplitAux>
        <SplitHeader />
        <div className="main-content" style={{ backgroundColor: "#f5f8f9" }}>
          {children}
        </div>
      </SplitAux>
    );
  }
}
