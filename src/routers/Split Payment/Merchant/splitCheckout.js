import React, {Component} from 'react'
import officeleather from "./../../../assets/Images/officeleather.png";
import shoes from "./../../../assets/Images/shoes.png";

class splitCheckout extends Component {
    render() {
        return (
            <div className="checkout">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Retailer</th>
                            <th scope="col">Attributes</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Shipping</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img className="offbag"
                                    src={officeleather}
                                    alt="officeleather"/>
                            </td>
                            <td>Marni</td>
                            <td>Color: Blue<br/>Size: One Size</td>
                            <td>1</td>
                            <td>$15.00</td>
                            <td>$2160.00</td>
                        </tr>
                        <tr>
                            <td>
                                <img className="shoes"
                                    src={shoes}
                                    alt="shoes"/>
                            </td>
                            <td>Marni</td>
                            <td>Color: Blue<br/>Size: One Size</td>
                            <td>1</td>
                            <td>$15.00</td>
                            <td>$2160.00</td>
                        </tr>
                        <tr>
                            <td>
                                <img className="offbag"
                                    src={officeleather}
                                    alt="officeleather"/>
                            </td>
                            <td>Marni</td>
                            <td>Color: Blue<br/>Size: One Size</td>
                            <td>1</td>
                            <td>$15.00</td>
                            <td>$2160.00</td>
                        </tr>
                        <tr>
                            <td>
                                <img className="shoes"
                                    src={shoes}
                                    alt="shoes"/>
                            </td>
                            <td>Marni</td>
                            <td>Color: Blue<br/>Size: One Size</td>
                            <td>1</td>
                            <td>$15.00</td>
                            <td>$2160.00</td>
                        </tr>
                    </tbody>
                </table>
                <ul class="list-group payselt">
                    <li class="list-group-item">
                        <div className="radio-item">
                            <input type="radio" id="card1" name="card" value="ca1"/>
                            <label htmlFor="card1">&nbsp; Google Pay</label>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="radio-item">
                            <input type="radio" id="card1" name="card" value="ca1"/>
                            <label htmlFor="card1">&nbsp; Paytm</label>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="radio-item">
                            <input type="radio" id="card1" name="card" value="ca1"/>
                            <label htmlFor="card1">&nbsp; Instant Pay</label>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className="radio-item">
                            <input type="radio" id="card1" name="card" value="ca1"/>
                            <label htmlFor="card1">&nbsp;  One Click &nbsp;&nbsp;</label>
                        </div>
                    </li>
                </ul>
                <div className="text-center w-100 mt-5">
                    <div className="sign-in-card">
                        <label className="sign-in">Pay With Instant Pay</label>
                        <form name="sign-in-form">
                            <div className="input-cntr">
                                <div className="input-icons">
                                    {/* <img src={avatar} alt="icon missing" /> */} </div>
                                <input type="text" placeholder="Enter Email ID"/>
                            </div>
                            <div className="input-cntr">
                                <div className="input-icons">
                                    {/* <img src={lock} alt="icon missing" /> */} </div>
                                <input placeholder="Enter Password" name="password"/>
                                <div className="input-icons cursor-pointer m-0 ml-2"></div>
                            </div>
                            <div className="flex-parted">
                                <span></span>
                                {/* <Link
                  to="onePayMerchantForgotPassword"
                  className="font-14-500 color-dark-blue"
                >
                  Forgot Password ?
                </Link> */} </div>
                            <button type="submit" className="butn mx-auto">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default splitCheckout
