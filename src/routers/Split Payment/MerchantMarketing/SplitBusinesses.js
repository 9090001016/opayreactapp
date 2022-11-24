import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import OnePayLogo from "../../../assets/Images/allicons/whiteLogo.png";
import OnePayLogo1 from "../../../assets/Images/allicons/main-logo 1.png";
import businessLandingPage from '../../../assets/Images/allicons/businessLandingPage.png';
import businesspage from '../../../assets/Images/allicons/businesspage.png';
import component7 from '../../../assets/Images/allicons/Component 7.png';
import component8 from '../../../assets/Images/allicons/Component 8.png';
import component9 from '../../../assets/Images/allicons/Component 9.png';
import component10 from '../../../assets/Images/allicons/Component 10.png';
import arrow_mark from '../../../assets/Images/allicons/Vector.png';
import signup_whiteicon from '../../../assets/Images/allicons/signup_whiteicon.png';
import setting_whiteicon from '../../../assets/Images/allicons/setting_whiteicon.png';
import grow_whiteicon from '../../../assets/Images/allicons/grow_whiteicon.png';
import sideImage from '../../../assets/Images/allicons/sideImage.png';
import JoinTodayLogo from '../../../assets/Images/allicons/logo only 1.png';
import Footer from './Footer';
import FooterMobile from './FooterMobile'
import { Link } from 'react-scroll'


const SplitBusinesses = () => {
  let isMobile = true;
  const [width, setWidth] = useState(window.innerWidth);
  const [navbar, setNavbar] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const [navbarBar,setNavbarBar] = useState(false)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    isMobile = window.innerWidth > 912 ? true : false;
  };
  const changeBg = () => {
    if (window.scrollY >= 5 && window.innerWidth > 577) {
      setNavbar(true);
    } else if (window.innerWidth < 577) {
      setNavbar(true);
    }
    else {
      setNavbar(false);
    }
  }
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  }

  window.addEventListener('scroll', changeBg);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    changeBg();
    setNavbarBar(true)
  }, [navbar])

  return (
    <div className='whole_business_page'>
      {width > 912 ?
        <section className='business_landing_part'>
          <img src={businessLandingPage} alt="" />
        </section>
        :
        <section className='business_landing_part'>
          <img src={businesspage} alt="" />
        </section>
      }
      {navbar ?
        <div className='navbarS'>
          <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container-fluid">
              <NavLink className="navbar-brand1" to="/">
                <img src={OnePayLogo1} alt="" className='main_heading_logo business_logo' />
              </NavLink>
              <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="collapsibleNavId">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link">
                  <li className="nav-item">
                    <NavLink className="nav-link foryou" aria-current="page" to="/">For Me</NavLink>
                  </li>
                  <li className={navbarBar?"nav-item2":"nav-item"}>
                    <NavLink className={navbarBar?"nav-link3 foryou":"nav-link foryou"} to="/onePayforbusiness">For Business</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        :
        <div className='navbarSSS'>
          <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container-fluid">
              <NavLink className="navbar-brand1" to="/">
                <img src={OnePayLogo} alt="" className='main_heading_logo business_logo' />
              </NavLink>
              <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="collapsibleNavId">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link">
                  <li className="nav-item">
                    <NavLink className="nav-link foryou" aria-current="page" to="/">For Me</NavLink>
                  </li>
                  <li className={navbarBar?"nav-item2":"nav-item"}>
                    <NavLink className={navbarBar?"nav-link2 foryou":"nav-link foryou"} to="/onePayforbusiness">For Business</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      }

      <section className='for_business_how_it_works'>
        <div className='grow_business'>
          <h1>Grow Your Online Business</h1>
          <p>one-click checkout is the technique of allowing customers to make
            purchases with the payment and shipping
          </p><br /><br />
          <Link to="joinToday" spy={true} smooth={true}>
            <img src={arrow_mark} alt="arrow_img" className='dancing_arrow' />
          </Link>
            <NavLink className='purple_button' to='/onePaySignUp'>
              <p className='purple_signup'>Sign Up</p>
            </NavLink>
        </div>
        <div className='how_it_works_business'>
          <div className='left_side'>
            <h4>For Business</h4>
            <h3>How it works</h3>
          </div>
          <div className='right_side'>
            <div className='pink_box'>
              <p><img src={signup_whiteicon} alt='' />
                <h5>Sign Up</h5>
              </p>
              <h6>
                Create your account, connect it to your bank account and start receiving your payments.
              </h6>
            </div>
            <div className='pink_box'>
              <p className="install_pic">
                <img src={setting_whiteicon} alt='' />
                <h5>Install</h5>
              </p>
              <h6>Set up OnePay on your online store.</h6>

            </div>
            <div className='pink_box'>
              <p><img src={grow_whiteicon} alt='' />
                <h5>Grow</h5>
              </p>
              <h6>Get ready to see your conversion rates going places they had never been before.</h6>
            </div>
          </div>

        </div>
        <div className='horizental_line'>
          <hr />
        </div>
      </section>

      <section className='multiply_sales'>
        <div className='how_it_works_business'>
          <div className='left_side'>
            <h4>For Business</h4>
            <h3>Multiply your sales</h3>
          </div>
        </div>
        <div className='card_section'>
          <div className='zero_interest'>
            <img src={component7} alt="zerointerest_img" className='zero_interest_img1' />
            <div className='odd_paragraph1'>
              <h3 className='header_main'>130%</h3>
              <h4 className='header_para'>Increase AOV</h4>
              <p className='small_para'>
                Using OnePay, see your average order value increase to heights you never exoerienced before.
              </p>
            </div>
          </div>
        </div>

        <div className='card_section'>
          <div className='zero_interest'>

            <div className='even_paragraph1'>
              <h3 className='header_main'>155%</h3>
              <h4 className='header_para'>Increase in revenue</h4>
              <p className='small_para'>
                Experience up to 155% incrrease in revenue by allowing your
                customers to finance their purchase with Onepay.
              </p>
            </div>
            <img src={component8} alt="zerointerest_img" className='zero_interest_img1' />

          </div>
        </div>

        <div className='card_section'>
          <div className='zero_interest'>
            <img src={component9} alt="zerointerest_img" className='zero_interest_img1' />
            <div className='odd_paragraph1'>
              <h3 className='header_main'>Less Friction</h3>
              <h4 className='header_para'>Less doubt</h4>
              <p className='small_para'>
                By giving your customers a financing option like Onepay they’ll feel vetter about their
                decission and are more inclined to check-out their cart.
              </p>
            </div>

          </div>
        </div>

        <div className='card_section'>
          <div className='zero_interest'>

            <div className='even_paragraph1'>
              <h3 className='header_main'>37%</h3>
              <h4 className='header_para'>Reduction in Cart-Abandonment</h4>
              <p className='small_para'>
                Experience up to a 37% reduction incart abandonment when combining OnePay with Instant.
              </p>
            </div>

            <img src={component10} alt="zerointerest_img" className='zero_interest_img1' />

          </div>
        </div>
        <br /><br />

        <div className='horizental_line'>
          <hr />
        </div>

      </section>

      <section className='side_by_side'>
        <div className='how_it_works_business'>
          <div className='left_side'>
            <h4>Sell</h4>
            <h3>Grow your business with OnePay </h3>
          </div>
          <div className='side_image'>
            <img src={sideImage} alt='' />
            <div>
              <h5>Just create your account</h5>
              <p>
                If your website is built in WOOCOMMERCE just search and install the API.
                We are working on all the APIs for the most popular website hosting
                services in the market. Meanwhile, you can install instant by checking
                the instrictions by clicking the API menu at the bottom of the page.
              </p>
            </div>
          </div>
        </div>
        <br /><br />
        <div className='horizental_line'>
          <hr />
        </div>
      </section>

      <section className='join_section' id='joinToday'>
        <h4>
          Join OnePay and unleash the full potential
          of what you can do.
        </h4>
        <NavLink to="/onePaySignUp">
          <button className='Join_today'>
            <img src={JoinTodayLogo} alt="" />
            <p>Join Today</p>
          </button>
        </NavLink>
      </section>

      {width > 912 ?
        <>
          <Footer />
          <div className='support'>© Text, Inc. 2019. We love our users!</div>
        </>
        :
        <>
          <FooterMobile />
          <div className='support'>© Text, Inc. 2019. We love our users!</div>
        </>
      }
    </div>
  )
}

export default SplitBusinesses

// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import mainLogo from "../../../assets/Images/allicons/Image20220809123815.png"
// import payment_icon from '../../../assets/Images/allicons/payment_icon.png';
// import shop_icon from '../../../assets/Images/allicons/shop_icon.png';
// import signup_icon from '../../../assets/Images/allicons/sign up icon psd.png';
// import arrow_mark from '../../../assets/Images/allicons/Vector.png'
// import zerointerest from '../../../assets/Images/allicons/paragraphimages/zero-interest.jpg';
// import easysignup from '../../../assets/Images/allicons/paragraphimages/easy-sign-up.jpg';
// import repayment from '../../../assets/Images/allicons/paragraphimages/repayment.jpg';
// import Sustainable from '../../../assets/Images/allicons/paragraphimages/Sustainable.jpg';
// import darkblue from '../../../assets/Images/allicons/logo dark blue 2.png';
// import footerPara from '../../../assets/Images/allicons/footer-para-images.png';
// import JoinTodayLogo from '../../../assets/Images/allicons/logo only 1.png'
// import Footer from './Footer';
// import FooterMobile from './FooterMobile'
// import OnePayLogo from "../../../assets/Images/allicons/main-logo 1.png";
// import { useEffect } from 'react';
// import { Link } from 'react-scroll'

// const SplitHomes = () => {
//     let isDesktop = true;
//     const [footerSize, setFooterSize] = useState(window.innerWidth);
//     const [navbar,setNavbar] = useState(false);

//     const setFooter = () => {
//         setFooterSize(window.innerWidth);
//         isDesktop = window.innerWidth > 912 ? true : false;
//     }
//     useEffect(() => {
//         window.addEventListener('resize', setFooter);
//         setNavbar(true);

//         return () => {
//             window.removeEventListener('resize', setFooter);
//         };
//     }, []);


//     return (
//         <div className='whole_page'>

//             <section className='landing_section'>
//                 <div className='header_part'>
//                     <nav className="navbar navbar-expand-sm navbar-light bg-light">
//                         <div className="container-fluid">
//                             <NavLink className="navbar-brand1" to="/">
//                                 <img src={OnePayLogo} alt="" className='main_heading_logo' />
//                             </NavLink>
//                             <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
//                                 aria-expanded="false" aria-label="Toggle navigation">
//                                 <span className="navbar-toggler-icon"></span>
//                             </button>
//                             <div className="collapse navbar-collapse " id="collapsibleNavId">
//                                 <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link white_bg">
//                                     <li className={navbar?"nav-item1":"nav-item"}>
//                                         <NavLink className={navbar?"nav-link1 foryou":"nav-link foryou"}
//                                             aria-current="page" to="/">
//                                             For Me
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <NavLink className="nav-link foryou"
//                                             to="/onePayforbusiness">
//                                             For Business
//                                         </NavLink>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </nav>
//                     <div className='main_section'>
//                         <div className='left_side'>
//                             <h1>Buy Now</h1>
//                             <h1>Pay Later</h1>
//                             <p>Split the payment of all the things
//                                 you buy into interest-free installments
//                             </p>
//                             <NavLink to="/onePayUserSignUp">
//                                 <button className='signup_btn'>sign up</button>
//                             </NavLink>
//                         </div>
//                         <div className='right_side'>
//                             <img src={mainLogo} alt="mainlogo_img" className='mainLogo' />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='how_it_works'>
//                     <Link to="joinToday" spy={true} smooth={true}>
//                         <img src={arrow_mark} alt="arrow_img" className='arrow_img' />
//                     </Link>
//                     <div className='how_it_works_leftside'>
//                         <p>for you</p>
//                         <h2>How it works</h2>
//                     </div>
//                     <div className='right_side'>
//                         <div className='gray_box'>
//                             <p><img src={signup_icon} alt='' />
//                                 <h5>Sign Up</h5>
//                             </p>
//                             <h6>
//                                 Create your account, connect it to your bank account and start receiving your payments.
//                             </h6>
//                         </div>
//                         <div className='gray_box'>
//                             <p className='shopping'><img src={shop_icon} alt='' className='shop_pic' />
//                                 <h5>Shop </h5>
//                             </p>
//                             <h6>
//                                 Set up OnePay on your online store.
//                             </h6>
//                         </div>
//                         <div className='gray_box'>
//                             <p><img src={payment_icon} alt='' />
//                                 <h5>Grow</h5>
//                             </p>
//                             <h6>Get ready to see your conversion rates going places they had never been before.</h6>
//                         </div>
//                     </div>
//                     <br></br>
//                     <br></br>
//                     <div className='horizental_line'>
//                         <hr />
//                     </div>
//                 </div>
//             </section>

//             <section className='installment_section'>
//                 <div className='how_it_works_leftside'>
//                     <p>for you</p>
//                     <h2>Pay in 4 Installments</h2>
//                 </div>

//                 <div className='card_section'>
//                     <div className='zero_interest'>
//                         <img src={zerointerest} alt="zerointerest_img" className='zero_interest_img' />
//                         <div className='odd_paragraph'>
//                             <h3 className='header_main'>Zero Interest</h3>
//                             <h4 className='header_para'> Transparent fees</h4>
//                             <p className='small_para'>There’s no interest on your purchase, you only pay a $6 flat fee a month only when you are using it.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='card_section'>
//                     <div className='zero_interest'>

//                         <div className='even_paragraph'>
//                             <h3 className='header_main'>Easy Sign-up</h3>
//                             <h4 className='header_para'>Only One Step</h4>
//                             <p className='small_para'>
//                                 Create your account and start buying from our partner websites instantly.
//                             </p>
//                         </div>
//                         <img src={easysignup} alt="zerointerest_img" className='zero_interest_img' />

//                     </div>
//                 </div>

//                 <div className='card_section'>
//                     <div className='zero_interest'>
//                         <img src={repayment} alt="zerointerest_img" className='zero_interest_img' />
//                         <div className='odd_paragraph'>
//                             <h3 className='header_main'>Repayments</h3>
//                             <h4 className='header_para'>Schedule your installments</h4>
//                             <p className='small_para'>
//                                 Program your automatic debit in 2 week intervals and forget about it.
//                             </p>
//                         </div>

//                     </div>
//                 </div>

//                 <div className='card_section'>
//                     <div className='zero_interest'>

//                         <div className='even_paragraph'>
//                             <h3 className='header_main'>Sustainable</h3>
//                             <h4 className='header_para'>Use existing credit</h4>
//                             <p className='small_para'>
//                                 We use your existing credit to help you keep your finances healthy and sustainable.
//                             </p>
//                         </div>

//                         <img src={Sustainable} alt="zerointerest_img" className='zero_interest_img' />

//                     </div>
//                 </div>
//                 <div className='horizental_line2'>
//                     <hr />
//                 </div>
//             </section>

//             <section className='break_payment'>
//                 <div className='how_it_works_leftside'>
//                     <p>shop</p>
//                     <h2>Break your payment in installments</h2>
//                 </div>
//                 <div className='break_payment_mainDiv'>
//                     <div className='break_payment_leftside'>
//                         <img src={footerPara} alt="footer_para_img" />
//                     </div>
//                     <div className='break_payment_rightside'>
//                         <h3>Browse and buy from your favourite online stores</h3>
//                         <p>Start shopping on our powerful eCommerce platform and explore limitless products
//                             from your favourite brands.
//                         </p>
//                         <NavLink to="/onePayforbusiness">
//                             <button>
//                                 <img src={darkblue} alt="darkbluelogo" />
//                             </button>
//                         </NavLink>
//                     </div>
//                 </div>
//                 <div className='horizental_line3'>
//                     <hr />
//                 </div>
//             </section>

//             <section className='join_section' id="joinToday">
//                 <h4>
//                     Join OnePay and unleash the full potential
//                     of what you can do.
//                 </h4>
//                 <NavLink to="/onePayUserSignUp">
//                     <button className='Join_today'>
//                         <img src={JoinTodayLogo} alt="" />
//                         <p>Join Today</p>
//                     </button>
//                 </NavLink>
//             </section>

//             {footerSize > 912 ?
//                 <>
//                     <Footer />
//                     <div className='support'>© Text, Inc. 2019. We love our users!</div>
//                 </>
//                 :
//                 <>
//                     <FooterMobile />
//                     <div className='support'>© Text, Inc. 2019. We love our users!</div>
//                 </>
//             }
//         </div>
//     )
// }

// export default SplitHomes