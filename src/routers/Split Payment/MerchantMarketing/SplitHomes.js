import React from 'react'
import { NavLink } from 'react-router-dom'
import mainLogo from "../../../assets/Images/allicons/Image20220809123815.png"
import payment_icon from '../../../assets/Images/allicons/payment_icon.png';
import shop_icon from '../../../assets/Images/allicons/shop_icon.png';
import signup_icon from '../../../assets/Images/allicons/sign up icon psd.png';
import arrow_mark from '../../../assets/Images/allicons/Vector.png'
import zerointerest from '../../../assets/Images/allicons/paragraphimages/zero-interest.jpg';
import easysignup from '../../../assets/Images/allicons/paragraphimages/easy-sign-up.jpg';
import repayment from '../../../assets/Images/allicons/paragraphimages/repayment.jpg';
import Sustainable from '../../../assets/Images/allicons/paragraphimages/Sustainable.jpg';
import darkblue from '../../../assets/Images/allicons/logo dark blue 2.png';
import footerPara from '../../../assets/Images/allicons/footer-para-images.png';
import JoinTodayLogo from '../../../assets/Images/allicons/logo only 1.png'
import Footer from './Footer';
import FooterMobile from './FooterMobile'
import OnePayLogo from "../../../assets/Images/allicons/main-logo 1.png";
import { useEffect } from 'react';

const SplitHomes = () => {
    useEffect(() => {
    console.log(window.innerWidth)
    }, [])
    
    return (
        <div className='whole_page'>
            <section className='landing_section'>
                <div className='header_part'>
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand1" to="/">
                                <img src={OnePayLogo} alt="" className='main_heading_logo' />
                            </NavLink>
                            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="collapsibleNavId">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link white_bg">
                                    <li className="nav-item">
                                        <NavLink className="nav-link foryou" aria-current="page" to="/">For Me</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link foryou" to="/onePayforbusiness">For Business</NavLink>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className='main_section'>
                        <div className='left_side'>
                            <h1>Buy Now</h1>
                            <h1>Pay Later</h1>
                            <p>Split the payment of all the things
                                you buy into interest-free installments
                            </p>
                            <NavLink to="/onePayUserSignUp">
                                <button className='signup_btn'>sign up</button>
                            </NavLink>
                        </div>
                        <div className='right_side'>
                            <img src={mainLogo} alt="mainlogo_img" className='mainLogo' />
                        </div>
                    </div>
                </div>
                <div className='how_it_works'>
                    <div>
                        <img src={arrow_mark} alt="arrow_img" className='arrow_img' />
                    </div>
                    <div className='how_it_works_leftside'>
                        <p>for you</p>
                        <h2>How it works</h2>
                    </div>
                    <div className='how_it_works_rightside'>
                        <div className='inner_box'>
                            <img src={signup_icon} alt="signupIcon" />
                            <p>sign up</p>
                        </div>
                        <div className='inner_box'>
                            <img src={shop_icon} alt="shopIcon" />
                            <p>shop</p>
                        </div>
                        <div className='inner_box'>
                            <img src={payment_icon} alt="payImg" />
                            <p>Pay</p>
                        </div>
                    </div>
                    <div className='horizental_line'>
                        <hr />
                    </div>
                </div>
            </section>

            <section className='installment_section'>
                <div className='how_it_works_leftside'>
                    <p>for you</p>
                    <h2>Pay in 4 Installments</h2>
                </div>

                <div className='card_section'>
                    <div className='zero_interest'>
                        <img src={zerointerest} alt="zerointerest_img" className='zero_interest_img' />
                        <div className='odd_paragraph'>
                            <h3 className='header_main'>Zero Interest</h3>
                            <h4 className='header_para'> Transparent fees</h4>
                            <p className='small_para'>There’s no interest on your purchase, you only pay a $6 flat fee a month only when you are using it.</p>
                        </div>
                    </div>
                </div>

                <div className='card_section'>
                    <div className='zero_interest'>

                        <div className='even_paragraph'>
                            <h3 className='header_main'>Easy Sign-up</h3>
                            <h4 className='header_para'>Only One Step</h4>
                            <p className='small_para'>
                                Create your account and start buying from our partner websites instantly.
                            </p>
                        </div>
                        <img src={easysignup} alt="zerointerest_img" className='zero_interest_img' />

                    </div>
                </div>

                <div className='card_section'>
                    <div className='zero_interest'>
                        <img src={repayment} alt="zerointerest_img" className='zero_interest_img' />
                        <div className='odd_paragraph'>
                            <h3 className='header_main'>Repayments</h3>
                            <h4 className='header_para'>Schedule your installments</h4>
                            <p className='small_para'>
                                Program your automatic debit in 2 week intervals and forget about it.
                            </p>
                        </div>

                    </div>
                </div>

                <div className='card_section'>
                    <div className='zero_interest'>

                        <div className='even_paragraph'>
                            <h3 className='header_main'>Sustainable</h3>
                            <h4 className='header_para'>Use existing credit</h4>
                            <p className='small_para'>
                                We use your existing credit to help you keep your finances healthy and sustainable.
                            </p>
                        </div>

                        <img src={Sustainable} alt="zerointerest_img" className='zero_interest_img' />

                    </div>
                </div>
                <div className='horizental_line2'>
                    <hr />
                </div>
            </section>

            <section className='break_payment'>
                <div className='how_it_works_leftside'>
                    <p>shop</p>
                    <h2>Break your payment in installments</h2>
                </div>
                <div className='break_payment_mainDiv'>
                    <div className='break_payment_leftside'>
                        <img src={footerPara} alt="footer_para_img" />
                    </div>
                    <div className='break_payment_rightside'>
                        <h3>Browse and buy from your favourite online stores</h3>
                        <p>Start shopping on our powerful eCommerce platform and explore limitless products
                            from your favourite brands.
                        </p>
                        <button>
                            <img src={darkblue} alt="darkbluelogo" />
                        </button>
                    </div>
                </div>
                <div className='horizental_line3'>
                    <hr />
                </div>
            </section>

            <section className='join_section'>
                <h4>
                    Join OnePay and unleash the full potential
                    of what you can do.
                </h4>
                <button>
                    <img src={JoinTodayLogo} alt="" />
                    <p>Join Today</p>
                </button>
            </section>
            {window.innerWidth > 630 ?
                <>
                    <Footer />
                    <div className='support'>© Text, Inc. 2019. We love our users!</div>
                </>
                : 
                <FooterMobile />
                
            }


        </div>
    )
}

export default SplitHomes
