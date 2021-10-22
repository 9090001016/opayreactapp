import React, { Component } from "react";
import Back from "../../../assets/Images/sign-in-bg.jpg";
import slider__bg from "../../../assets/Images/slider__bg.png";
import Instant from "../../../assets/Images/Instant-Pay-User-Management.png";
import { Link } from "react-router-dom";
import config from "../../../helpers/config";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./splitHeader";
import OnePayLogo from "./../../../assets/Images/OnePay-logo.png";

import worksicons1 from "./../../../assets/Images/worksicons_01.png";
import worksicons2 from "./../../../assets/Images/worksicons_02.png";
import worksicons3 from "./../../../assets/Images/worksicons_03.png";
import worksicons4 from "./../../../assets/Images/worksicons_04.png";

import partner__img1 from "../../../assets/Images/partner__img1.png";
import partner__logo1 from "../../../assets/Images/partner__logo1.png";


class splitHome extends Component {
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
      url: config.apiUrl + "OnePayMerchantMarketing/MerchantHomePageStaticData",
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

  handleLearnMoreClick(type, text) {
    let self = this;
    setTimeout(function () {
      self.props.history.push({
        pathname: "onePayWhyInstant",
        type: type,
        text: text
      });
    }, 1000);
  }

  render() {
    const { staticContent } = this.state;
    return (
      <div className="marketingHome">
        <div className="merchantMar">
          <Header />
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            autoPlay
            swipeable
            emulateTouch
            stopOnHover
            infiniteLoop
          >
            {/* {staticContent.filter(e => e.contentType == "Content").map(item => (
              <div>
                <img src={Back} />
                <div className="carousel-caption">
                  <h4>{item.title}</h4>
                  <p>{item.contentText}</p>
                  <Link to="/onePaySignUpHome">
                    <button>Sign Up</button>
                  </Link>
                </div>
              </div>))} */}
              <div className="slider__content">
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>Get what you need now, pay it over time</h4>
                 <p>Use your existing credit to buy what you need online and pay it in a way that fits your budget.</p>
               </div>
             </div>
             <div className="slider__content">
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>Instant Approval</h4>
                 <p>You don’t have to wait long times to be approved to start enjoying the benefits of using OnePay</p>
               </div>
             </div>
             <div className="slider__content">
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>There’s no interest rates</h4>
                 <p>You can spend without worrying about the interest rates, we only charge you a small subscription to use our service.</p>
               </div>
             </div>
             {/* <div>
               <img src={Back} />
               <div className="carousel-caption">
                 <h4>Fully Trustable &amp; Reliable</h4>
                 <p>{staticContent.content3}</p>
                 <Link to="/merchantLogin">
                   <button>Sign Up</button>
                 </Link>
               </div>
             </div> */}
          </Carousel>
        </div>
        <div className="container topbottom">
          <h3>How it works</h3>
          <div className="row">
            {/* {staticContent.filter(e => e.contentType == "Why Instant").map(item => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safar text-center">
                  <div className="safarimg">
                    <img src={Instant} alt="safar" />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.contentText}</p>
                  <button type="button" onClick={this.handleLearnMoreClick.bind(this, item.title, item.contentText)}>Learn More</button>
                </div>
              </div>))} */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons1} alt="Sign up" />
                </div>
                <h4>Sign Up</h4>
                <p>Create an account using your credit card</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons2} alt="Get Approved Instantly" />
                </div>
                <h4>Get Approved Instantly</h4>
                <p>Our verfication process will approve your account in no time.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons3} alt="Start Buying" />
                </div>
                <h4>Start Buying</h4>
                <p>Go to your favorite online stores and get what you want, now.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons4} alt="Installments" />
                </div>
                <h4>Pay in 4 Installments</h4>
                <p>Program your 4 installments repayments and relax.</p>
              </div>
            </div>
            {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={Instant} alt="Ptotected" />
                </div>
                <h4>Protected</h4>
                <p>{staticContent.field4}</p>
                <button type="button" onClick={this.handleLearnMoreClick.bind(this, "Protected", staticContent.field4)}>Learn More</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="container-fluid partner__section">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                 <h3>Shop with OnePay</h3>
                </div>
                <div className="col-lg-4">
                  <div className="partner__block">
                    <div className="overlay__img">
                      <img src={partner__img1} className="img-fluid" />
                    </div>
                    <div className="partner__logo">
                      <img src={partner__logo1} className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="partner__block">
                    <div className="overlay__img">
                      <img src={partner__img1} className="img-fluid" />
                    </div>
                    <div className="partner__logo">
                      <img src={partner__logo1} className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="partner__block">
                    <div className="overlay__img">
                      <img src={partner__img1} className="img-fluid" />
                    </div>
                    <div className="partner__logo">
                      <img src={partner__logo1} className="img-fluid" />
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        {/* <div className="topbotto">
          <div className="container">
            <h3>Instant is used by</h3>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Zomato</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Ola</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Netflix</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Make my trip</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Flipkart</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Pizza Hut</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>Gaana</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="Safarnew">
                  <h3>netmeds</h3>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="foot">
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
        </div>
      </div>
    );
  }
}

export default splitHome;
