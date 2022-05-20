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
import OnePayLogo from "./../../../assets/Images/onepaylogowhite.png";

import worksicons1 from "./../../../assets/Images/worksicons_01.png";
import worksicons2 from "./../../../assets/Images/worksicons_02.png";
import worksicons3 from "./../../../assets/Images/worksicons_03.png";
import worksicons4 from "./../../../assets/Images/worksicons_04.png";

import partner__img1 from "../../../assets/Images/partner__img1.png";
import partner__logo1 from "../../../assets/Images/partner__logo1.png";


import onpeyicon1 from "../../../assets/Images/sign-up-icon.png";
import onpeyicon2 from "../../../assets/Images/shop-cart-icon.png";
import onpeyicon3 from "../../../assets/Images/pay-icon.png";

import onpeyicon4 from "../../../assets/Images/zero-interest.png";
import onpeyicon5 from "../../../assets/Images/easy-signup.png";
import onpeyicon6 from "../../../assets/Images/repayment.png";
import onpeyicon7 from "../../../assets/Images/sustainable.png";

import onpeyicon8 from "../../../assets/Images/friends-social-bottom.png";
import onpeyLogoButton from "../../../assets/Images/onepay-btn-logo.png";
import onepayLogoIcon from "../../../assets/Images/blue-logo.png";
import onepayFooterLogo from "../../../assets/Images/onepay-footer-logo.png";


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
        <div className="banner__section">
            <div className="banner__btn">
              <h3>Shop in Installments <br/> with OnePay</h3>
              {/* <button className="yellow__btn"> <img src={onepayLogoIcon} className="mr-2" /> Sign Up</button> */}
              <Link to="/onePayUserSignUp" className="yellow__btn">
                  <img src={onepayLogoIcon} className="mr-2" /> Sign Up
              </Link>
            </div>
          </div>
          <Header />
          {/* <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            autoPlay
            swipeable
            emulateTouch
            stopOnHover
            infiniteLoop
          >
            
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
          </Carousel> */}
        </div>
        {/* <div className="container topbottom">
          <h3>How it works</h3>
          <div className="row">
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
          </div>
        </div> */}

        <div className="container-fluid">
          {/* <h6>{APIkey}</h6> */}
          <div className="row works__section">
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
            {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={Instant} alt="Flexible" />
                </div>
                <h4>Flexible</h4>
                <p>{staticContent.field2}</p>
                <button type="button" onClick={this.handleLearnMoreClick.bind(this, "Flexible", staticContent.field2)}>Learn More</button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={Instant} alt="Convenient" />
                </div>
                <h4>Convenient</h4>
                <p>{staticContent.field3}</p>
                <button type="button" onClick={this.handleLearnMoreClick.bind(this, "Convenient", staticContent.field3)}>Learn More</button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={Instant} alt="Ptotected" />
                </div>
                <h4>Protected</h4>
                <p>{staticContent.field4}</p>
                <button type="button" onClick={this.handleLearnMoreClick.bind(this, "Protected", staticContent.field4)}>Learn More</button>
              </div>
            </div> */}

              <div className="col-md-12 col-12">
                  <div className="top__head">
                    <h4 className="sub__text">For You</h4>
                    <h3 className="heading__text">How it works</h3>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon1} alt="Sign Up" />
                    </div>
                    <h4>Sign Up</h4>
                    <p>Create your account using your credit card and get approved instantly.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon2} alt="Sign Up" />
                    </div>
                    <h4>Shop</h4>
                    <p>Choose what you want and get it right now. </p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon3} alt="Sign Up" />
                    </div>
                    <h4>Pay in 4 Installments</h4>
                    <p>Program your 4 installments repayments and relax.</p>
                  </div>
                </div>

          </div>
        </div>

        <div className="container-fluid">
          <div className="row instant__section">
              <div className="col-md-12 col-12">
                  <div className="top__head">
                    <h4 className="sub__text">For You</h4>
                    <h3 className="heading__text">Pay in 4 Installments</h3>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 instant__img">
                    <div className="img__block">
                      <img src={onpeyicon4} alt="Sign Up" />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 instant__text">
                  <div className="text__block">
                    <h3>Zero Interest</h3>
                    <h4>Transparent fees</h4>
                    <p>There’s no interest on your purchase, you only pay a $6 flat fee a month only when you are using it.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 nopassword__text">
                  <div className="text__block">
                    <h3>Easy Sign-up</h3>
                    <h4>Only One Step</h4>
                    <p>Create your account and start buying from our partner websites instantly.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 nopassword__img">
                    <div className="img__block">
                      <img src={onpeyicon5} alt="Sign Up" />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 safe__img">
                    <div className="img__block">
                      <img src={onpeyicon6} alt="Sign Up" />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 safe__text">
                  <div className="text__block">
                    <h3>Repayemnts</h3>
                    <h4>Schedule your installments</h4>
                    <p>Program your automatic debit in 2 week intervals and forget about it.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 easy__text">
                  <div className="text__block">
                    <h3>Sustainable</h3>
                    <h4>Use existing credit</h4>
                    <p>We use your existing credit to help you keep your finances healthy and sustainable.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 easy__img">
                    <div className="img__block">
                      <img src={onpeyicon7} alt="Sign Up" />
                    </div>
                </div>

          </div>
        </div>
        

        <div className="contianer-fluid signup__section">
            <div className="row">
              <div className="col-md-12 col-12">
                    <div className="top__head">
                      <h4 className="sub__text">Shop</h4>
                      <h3 className="heading__text">Sign-up and Check-out in an instant</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="contianer-fluid signup__section p-0">
            <div className="row m-0">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 p-0">
                    <div className="img__block">
                      <img src={onpeyicon8} alt="Sign Up" />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                  <div className="text__block">
                    <h4>Browse and buy from your favourite online stores</h4>
                    <p>Start shopping on our powerful eCommerce platform and explore limitless products from your favourite brands.</p>
                    {/* <button class="yellow__btn"><img src={onpeyLogoButton} /></button> */}
                    <Link to="/onePaySignUp" className="yellow__btn text-center d-block">
                       <img src={onpeyLogoButton} />
                    </Link>
                  </div>
                </div>
            </div>
        </div>
       
        <div className="contianer-fluid join__section">
            <div className="row">
              <div className="col-md-6">
                    <div className="left__block">
                      <h4 className="sub__text">Join Instant and unleash the power of the best checkout in the market.</h4>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="right">
                      {/* <button class="yellow__btn"><img src={onepayLogoIcon} />Join Today</button> */}
                      <Link to="/onePayUserSignUp" className="yellow__btn">
                          <img src={onepayLogoIcon} className="mr-2" /> Join Today
                      </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* <div className="container-fluid partner__section">
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
        </div> */}

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
    );
  }
}

export default splitHome;
