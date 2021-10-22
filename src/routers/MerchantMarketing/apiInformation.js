import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import config from "./../../helpers/config";
import axios from "axios";
import Header from "./../MerchantMarketing/header";
import InstantLogo from "./../../assets/Images/Instant-logo.png";

const { TabPane } = Tabs;
class apiInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staticContent: [],
    };
  }

  componentDidMount() {
    this.handleGetStaticContent();
  }

  handleGetStaticContent() {
    let self = this;

    axios({
      method: "get",
      url: config.apiUrl + "MerchantMarketing/APIInformationDetails",
    })
      .then(function (res) {
        
        let data = res.data.responseData;
        self.setState({
          staticContent: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  hanlecallback(key) {
    console.log(key);
  }
  render() {
    const { staticContent } = this.state;
    return (
      <div className="marketingApi">
        <div className="merchantMar">
          <Header />
        </div>
        <div className="container topbottom">
          <h3>API Information</h3>
          <div className="apitab">
            <Tabs defaultActiveKey="1" onChange={this.hanlecallback.bind(this)}>
              <TabPane tab="One Click" key="1">
                {staticContent.filter(e => e.title == "One Click").map(item => (
                  <p className="mt-2">{item.contentText}</p>
                ))}
              </TabPane>
              {/* <TabPane tab="Split Payment" key="2">
                {staticContent.filter(e => e.title == "Split Payment").map(item => (
                  <p className="mt-2">{item.contentText}</p>
                ))}
              </TabPane>
              <TabPane tab="One Click & Split Payment Combo" key="3">
                {staticContent.filter(e => e.title == "One Click & Split Payment Combo").map(item => (
                  <p className="mt-2">{item.contentText}</p>
                ))}
              </TabPane> */}
            </Tabs>
          </div>
        </div>
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
    );
  }
}

export default apiInformation;
