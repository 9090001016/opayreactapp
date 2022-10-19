import React, { Component } from "react";
import Aux from "./child";
import Header from "./Header";

export class masterLayout extends Component {
    render() {
        const { children } = this.props;
        return (
          <Aux>
            <Header />
            <div className="main-content">
              {children}
            </div>
          </Aux>
        );
    }
}

export default masterLayout
