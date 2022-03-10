import React, { Component } from "react";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import Back from "../../../assets/Images/sign-in-bg.jpg";
import offerChecklist from "../../../assets/Images/offer__checklist.png";
import userIcon from "../../../assets/Images/user-icon.jpg";
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
import worksicons5 from "./../../../assets/Images/worksicons_05.png";

import newlogo1 from "../../../assets/Images/newslogo_1.png";
import newlogo2 from "../../../assets/Images/newslogo_2.png";
import newlogo3 from "../../../assets/Images/newslogo_3.png";
import newlogo4 from "../../../assets/Images/newslogo_4.png";
import newlogo5 from "../../../assets/Images/newslogo_5.png";

import partner__img1 from "../../../assets/Images/partner__img1.png";
import partner__logo1 from "../../../assets/Images/partner__logo1.png";

import onpeyicon1 from "../../../assets/Images/sign-up-icon.png";
import onpeyicon2 from "../../../assets/Images/install-icon.png";
import onpeyicon3 from "../../../assets/Images/grow-icon.png";

import onpeyicon4 from "../../../assets/Images/zero-interest.png";
import onpeyicon5 from "../../../assets/Images/easy-signup.png";
import onpeyicon6 from "../../../assets/Images/repayment.png";
import onpeyicon7 from "../../../assets/Images/sustainable.png";

import onpeyicon8 from "../../../assets/Images/grow-business-bottom.png";
import onpeyLogoButton from "../../../assets/Images/onepay-btn-logo.png";
import onepayLogoIcon from "../../../assets/Images/blue-logo.png";
import onepayFooterLogo from "../../../assets/Images/onepay-footer-logo.png";




class splitforbusiness extends Component {
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
          <div className="banner__section forbusiness__bg">
            <div className="banner__btn">
              <h3>Grow your online <br/> business </h3>
              <button className="yellow__btn"> <img src={onepayLogoIcon} className="mr-2" /> Sign Up</button>
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
          className="d-none">
              <div>
               <img src={Back} />
               <div className="carousel-caption">
                 <h4>An easier way to pay</h4>
                 <p>Offer your customers an easier way to pay you while making sure that they will indeed pay.</p>
               </div>
             </div>
             <div>
               <img src={Back} />
               <div className="carousel-caption">
                 <h4>Low Interest Rates</h4>
                 <p>Let us help you get a higher purchase spend while giving you the lowest interest rate in the market.</p>
               </div>
             </div>
             <div>
               <img src={Back} />
               <div className="carousel-caption">
                 <h4>Higher Conversion Rate</h4>
                 <p>Get a higher conversion rate by allowing your customers to spend more while staying in their budget.</p>
               </div>
             </div>
          </Carousel> */}
        </div>

        <div className="container-fluid">
          <div className="row works__section">
              <div className="col-md-12 col-12">
                  <div className="top__head">
                    <h4 className="sub__text">For Business </h4>
                    <h3 className="heading__text">How it works</h3>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon1} alt="Sign Up" />
                    </div>
                    <h4>Sign Up</h4>
                    <p>Create your account, connect it to your bank account and start receiving your payments.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon2} alt="Sign Up" />
                    </div>
                    <h4>Install</h4>
                    <p>Put the Instant button on your online store. </p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="works__block">
                    <div className="img__block">
                      <img src={onpeyicon3} alt="Sign Up" />
                    </div>
                    <h4>Grow</h4>
                    <p>Get ready to see your conversion rates going places they had never been before.</p>
                  </div>
                </div>

          </div>
        </div>

        <div className="container-fluid">
          <div className="row instant__section">
              <div className="col-md-12 col-12">
                  <div className="top__head">
                    <h4 className="sub__text">For Business</h4>
                    <h3 className="heading__text">Multiply your sales</h3>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 instant__img">
                    <div className="img__block">
                      <img src={onpeyicon4} alt="Sign Up" />
                    </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 instant__text">
                  <div className="text__block">
                    <h3>130%</h3>
                    <h4>Increase AOV</h4>
                    <p>Using OnePay, see your average order value increase to heights you never exoerienced before.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 nopassword__text">
                  <div className="text__block">
                    <h3>155%</h3>
                    <h4>Increase in revenue</h4>
                    <p>Experience up to 155% incrrease in revenue by allowing your customers to finance their purchase with Onepay.</p>
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
                    <h3>Less Friction</h3>
                    <h4>Less doubt</h4>
                    <p>By giving your customers a financing option like Onepay they’ll feel vetter about their decission and are more inclined to check-out their cart.</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-6 col-lg-6 easy__text">
                  <div className="text__block">
                    <h3>37%</h3>
                    <h4>Reduction In Cart Abandonment</h4>
                    <p>Experience up to a 37% reduction incart abandonment when combining OnePay with Instant.</p>
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
                      <h4 className="sub__text">Sell</h4>
                      <h3 className="heading__text">Grow your business with instant</h3>
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
                    <h4>Just create your account</h4>
                    <p>If your website is built in WOOCOMMERCE just search and install the Plug In. We are working on all the APIs for the most popular website hosting services in the market. </p>
                    <p className="mt-2">Meanwhile, you can install instant by checking the instructions by clicking the API menu at the bottom of the page.</p>
                    <button class="yellow__btn"><img src={onpeyLogoButton} /></button>
                  </div>
                </div>
            </div>
        </div>
       
        <div className="contianer-fluid join__section">
            <div className="row">
              <div className="col-md-6">
                    <div className="left__block">
                      <h4 className="sub__text">Give your business a better chance. Join Instant and unleash the power of the best checkout in the market.</h4>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="right">
                      <button class="yellow__btn"><img src={onepayLogoIcon} />Join Today</button>
                    </div>
                </div>
            </div>
        </div>

        {/* <div className="container offer__checklist">
             <div className="row">
                <div className="col-md-12">
                  <div className="checklist__img">
                    <img src={offerChecklist} className="img-fluid"/>
                  </div>
                </div>
             </div>
        </div>
        <div className="container topbottom">
          <h3>How it works for Business</h3>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons1} alt="Sign up" />
                </div>
                <h4>Sign Up</h4>
                <p>Create a business account and set the bank account where you want to be paid.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons2} alt="Get Approved Instantly" />
                </div>
                <h4>Get Approved</h4>
                <p>Our verfication process will approve your account in short time.</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons5} alt="Start Buying" />
                </div>
                <h4>Add The OnePay Button</h4>
                <p>Add OnePay's button to your checkout options</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={worksicons4} alt="Installments" />
                </div>
                <h4>Customers Pay in 4 Installments</h4>
                <p>Program your 4 installments repayments and relax.</p>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* <div className="container article__section">
            <div className="row">
              <div className="col-md-12">
                <h3>Articles</h3>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo1} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo2} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo3} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo4} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo5} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo2} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo3} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo4} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo5} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo1} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo5} className="img-fluid" />
                  </a>
                </div>
              </div>
              <div className="col-md-2">
                <div className="article__block">
                  <a href="#" target="_blank">
                    <img src={newlogo1} className="img-fluid" />
                  </a>
                </div>
              </div>
            </div>
        </div> */}
        
        {/* <div className="container testimonial__section">
            <div className="col-md-12">
              <h3>Testimonails</h3>
              <div className="slider__section">
                    <OwlCarousel className="owl-theme" loop margin={30} items="3" autoplay>
                      <div className="item">
                        <div class="content__section">
                            <div className="user__img">
                              <img src={userIcon} className="img-fluid img-circle"/>
                            </div>
                            <div className="text__block">
                              <i class="fa fa-quote-left" aria-hidden="true"></i>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                              
                              <h3>Hum</h3>
                              <h4>@humrashid</h4>
                            </div>
                        </div>
                      </div>
                    </OwlCarousel>
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
                      <Link to="/customer">
                          <a>For You</a>
                      </Link>
                  </li>

                  <li>

                      <Link to="/merchant">
                          <a>For Business</a>
                      </Link>
                  </li>
                  
                  <li>
                      <Link to="#">
                          <a>Shop</a>
                      </Link>
                  </li>

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
                      <a className="fa fa-facebook" href="https://www.facebook.com/" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-instagram" href="https://www.instagram.com/" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-linkedin" href="https://in.linkedin.com/" target="_blank"></a>
                    </li>
                    <li>
                      <a className="fa fa-twitter" href="https://twitter.com/" target="_blank"></a>
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

export default splitforbusiness;
