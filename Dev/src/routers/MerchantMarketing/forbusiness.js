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

import instanticon1 from "../../assets/Images/instanticons_1.jpg";
import instanticon4 from "../../assets/Images/instanticons_4.png";
import instanticon5 from "../../assets/Images/instanticons_5.png";

import partner__img1 from "../../assets/Images/partner__img1.png";
import partner__logo1 from "../../assets/Images/partner__logo1.png";


class forbusiness extends Component {
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
                 <h4>INSTANT</h4>
                 <p>Allow your customers to check out of your store with the things they want in only One click and without passwords.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>LEVERAGE SCALE</h4>
                 <p>Take advantage of the network scale provided by instant. Any Instant user can buy in any Instant partner’s shop with only One click and without needing any passwords.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>INCREASE YOUR SALES</h4>
                 <p>88% of shoppers abandon their carts before pressing the buy button. Those are missed opportunities that we want to help you convert into sales.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>FLEXIBLE PAYMENT PROCESSING PLATFORM</h4>
                 <p>Businesses can choose if they want to use our payment processing platform or keep the one they like.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>SAFE</h4>
                 <p>We use top-tier technology in security and encryption technology to protect you from fraud and save your information.</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>EASY</h4>
                 <p>It’s easy to set up, just copy the code snippet and paste it in your website to get it running. You will get your website conversion numbers rocketing up within the minute!</p>
               </div>
             </div>
             <div>
               <img src={slider__bg} />
               <div className="carousel-caption">
                 <h4>SUPPORT</h4>
                 <p>we also have Instant support 24/7 for your business. We consider you, our partner, the more you sell, the more we grow.</p>
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
                <p>Create an account and link it to the bank account where you want to receive the payments.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={instanticon4} alt="Search" />
                </div>
                <h4>Download</h4>
                <p>Install the Instant button in your online store.</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="Safar text-center">
                <div className="safarimg">
                  <img src={instanticon5} alt="Shop" />
                </div>
                <h4>Grow</h4>
                <p>Get ready to see your conversion rates going places they had never been before.</p>
              </div>
            </div>

          </div>
        </div>
        
        <div className="foot">
          <footer className="container">
            <div className="inpay">
            <img src={InstantLogo} width="150px" className="logo__img" />
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

export default forbusiness;
