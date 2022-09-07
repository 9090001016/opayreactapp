import React from 'react'
import OnePayLogo from "../../../assets/Images/allicons/main-logo 1.png";
import Instagram from "../../../../src/assets/Images/allicons/Instagram.png";
import LinkedIn from "../../../../src/assets/Images/allicons/LinkedIn.png";
import Twitter from "../../../../src/assets/Images/allicons/Twitter.png";
import Facebook from "../../../../src/assets/Images/allicons/Facebook.png";
import { NavLink } from 'react-router-dom';

const FooterMobile = () => {
  return (
    <div>
        <footer className='footer2'>
                <div className='grid grid_five_columns footer_part2'>
                    <div>
                        <NavLink to="#">
                            <div className='footer_onepay_btn1' >
                                <img src={OnePayLogo} alt="btn_img" className='footer_onepay_btn' />
                            </div>
                        </NavLink>
                        <p className='gap_maintain'>one-click checkout is the technique
                            of allowing customers to make
                            purchases with the payment and
                            shipping
                        </p>
                    </div>
                    <div>
                        <NavLink to="#"><p>For Business</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'>For You</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'>Shop</p></NavLink>
                    </div>
                    <div>
                        <NavLink to="#"><p>Press & Media</p></NavLink>
                        <NavLink to="#"> <p className='gap_maintain'>Blog</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'>Contact</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'> Notification</p></NavLink>
                    </div>
                    <div>
                        <NavLink to="#"><p>Licenses</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'>Terms & Conditions</p></NavLink>
                        <NavLink to="#"><p className='gap_maintain'>Privacy</p></NavLink>
                    </div>
                    <div>
                        <p>CONNECT WITH US</p>
                        <div className="bulk_images">
                            <NavLink to="#"><img src={Instagram} alt="" /></NavLink>
                            <NavLink to="#"><img src={LinkedIn} alt="" /></NavLink>
                            <NavLink to="#"><img src={Twitter} alt="" /></NavLink>
                            <NavLink to="#"><img src={Facebook} alt="" /></NavLink>
                        </div>
                    </div>
                </div>
            </footer>
    </div>
  )
}

export default FooterMobile