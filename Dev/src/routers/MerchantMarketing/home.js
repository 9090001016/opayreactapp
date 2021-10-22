import React, { Component } from "react";
import Back from "../../assets/Images/sign-in-bg.jpg";
import slider__bg from "../../assets/Images/slider__bg.png";
import Instant from "../../assets/Images/Instant-Pay-User-Management.png";
import { Link } from "react-router-dom";
import config from "./../../helpers/config";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "./../MerchantMarketing/header";

import InstantLogo from "./../../assets/Images/Instant-logo.png";

import slidericon1 from "../../assets/Images/slidericons_1.png";
import slidericon2 from "../../assets/Images/slidericons_2.png";
import slidericon3 from "../../assets/Images/slidericons_3.png";
import slidericon4 from "../../assets/Images/slidericons_4.png";
import slidericon5 from "../../assets/Images/slidericons_5.jpg";

import instanticon1 from "../../assets/Images/instanticons_1.jpg";
import instanticon2 from "../../assets/Images/instanticons_2.jpg";
import instanticon3 from "../../assets/Images/instanticons_3.jpg";

import partner__img1 from "../../assets/Images/partner__img1.png";
import partner__logo1 from "../../assets/Images/partner__logo1.png";


class home extends Component {
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
      url: config.apiUrl + "MerchantMarketing/MerchantHomePageStaticData",
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
        pathname: "instantPayWhyInstant",
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
                  <Link to="/instantPaySignUpHome">
                    <button>Sign Up</button>
                  </Link>
                </div>
              </div>))} */}
              <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                  <img src={slidericon1} className="slider__icon"/>
                 <h4>INSTANT</h4>
                 <p>When we say it’s Instant, we mean it.</p>
               </div>
             </div>
             <div>
                <img src={slider__bg} />
               <div className="carousel-caption">
                  <img src={slidericon2} className="slider__icon"/>
                 <h4>NO PASSWORDS</h4>
                 <p>Log in and check out instantly on all our partner sites without the need of a password, in only One step.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                  <img src={slidericon3} className="slider__icon"/>
                 <h4>SAFE</h4>
                 <p>We use top-tier technology in security and encryption to protect all your information. Plus, we do not sell or give away your information to any third parties.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                  <img src={slidericon4} className="slider__icon"/>
                 <h4>EASY</h4>
                 <p>Just create your account, link your preferred payment method, and fill out your delivery details. And you're ready to start buying from our partner e-commerce stores in only One click.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                  <img src={slidericon5} className="slider__icon"/>
                 <h4>UNIFIED</h4>
                 <p>“One check-out to rule them all”.
                  Manage and have the records of all your online purchases in one place.</p>
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
          <Header />
        </div>
        <div className="container topbottom">
          <h3>Why Instant ?</h3>
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

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={instanticon1} alt="Sign Up"/>
                </div>
                <h4>Sign Up</h4>
                <p>Create an account, fill up all your billing and shipping details and get ready to go.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={instanticon2} alt="Search" />
                </div>
                <h4>Search</h4>
                <p>Surf the web for the products you want and find the INSTANT button on the check-out of your favorite online shops.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={instanticon3} alt="Shop" />
                </div>
                <h4>Shop</h4>
                <p>Choose what you want and buy with only One click. 
                We will provide your billing and shipping information in a safer way to the store.</p>
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
        <div className="container-fluid partner__section">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                 <h3>Partners</h3>
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

export default home;
