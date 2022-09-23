import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import OnePayLogo from "../../../assets/Images/allicons/whiteLogo.png";
import OnePayLogo1 from "../../../assets/Images/allicons/main-logo 1.png";

const MerchantLogins = () => {
    let isMobile = true;
    const [navbarMerchant, setNavbarMerchant] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [offsetY, setOffsetY] = useState(0);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
        isMobile = window.innerWidth > 912 ? true : false;
      };
    const changeBg = () => {
        if (window.scrollY >= 5 && window.innerWidth > 577) {
            setNavbarMerchant(true);
        } else if (window.innerWidth < 577) {
            setNavbarMerchant(true);
        }
        else {
            setNavbarMerchant(false);
        }
    }
    const handleScroll = () => {
        setOffsetY(window.pageYOffset);
    }
    window.addEventListener('scroll', changeBg);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleWindowSizeChange);
        return () =>{ window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleWindowSizeChange);
    }
    }, [width]);
    useEffect(() => {
        changeBg();
    }, [navbarMerchant])
    
    return (
        <div className='merchant_login_page'>
            {navbarMerchant || width > 912 ?
                <div className='navbarLogin'>
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand1" to="/">
                                <img src={OnePayLogo1} alt="" className='main_heading_logo business_logo login_logo' />
                            </NavLink>
                            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="collapsibleNavId">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link signin_link">
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
                </div>
                :
                <div className='navbarLoginScroll'>
                    <nav className="navbar navbar-expand-sm navbar-light chnage_size">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand1" to="/">
                                <img src={OnePayLogo} alt="" className='main_heading_logo business_logo' />
                            </NavLink>
                            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="collapsibleNavId">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0 own_link signin_link">
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
                </div>
            }
        </div>
    )
}

export default MerchantLogins