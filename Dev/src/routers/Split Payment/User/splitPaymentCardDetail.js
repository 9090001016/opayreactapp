import React, { Component } from 'react'
import { Table, Popover } from "antd";
import RedDelete from "./../../../assets/Images/delete.png";
import BlueEdit from "./../../../assets/Images/editt.png";
import Modal from "react-responsive-modal";
import CloseIcon from "./../../../assets/Images/CloseWhBold.png";
import Down from "./../../../assets/Images/download.png";
import config from "./../../../helpers/config"
import axios from "axios"
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader"
import { ElementsConsumer, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { NotificationManager } from "react-notifications";
import visa from "./../../../assets/Images/visa.png";
import mastercard from "./../../../assets/Images/mastercard.png";
import americanexpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";


const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

class SplitPaymentCardDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addCard: false,
      newAddCard: false,
      editCard: false,
      mobileView: false,
      cardHolderName: "",
      paymentDetails: [],
      paymentGatewayType: [],
      cardConf: false,
      customerCardId: 0,
      visible: {},
      expiryMonth: "",
      expiryYear: "",
      cACardHolderName: "",
      cACardNumber: "",
      expiryMonth: "",
      expiryYear: ""

    }
  }
  componentDidMount() {
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
    this.handleGetDefaultPaymentGateway();
    this.handleGetCardDetails();
  }
  handleaddCardOpen() {
    this.setState({ addCard: true, visible: {}, cardHolderName: "" });
  }
  handleaddCardClose() {
    this.setState({ addCard: false });
  }
  handlenewAddCardClose() {
    this.setState({ newAddCard: false });
  }
  handlenewAddCardOpen() {
    this.setState({ newAddCard: true });
  }
  handleeditCardOpen() {
    this.setState({ editCard: true, visible: {} });
  }
  handleeditCardClose() {
    this.setState({ editCard: false });
  }

  handleGetCardDetails() {
    
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayPaymentDetail/getcarddetails",
      headers: userAuthHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          

          self.setState({
            paymentDetails: data
          })
        } else {
          self.setState({
            paymentDetails: []
          })
        }
      })
      .catch(function (res) {
        
        // self.setState({
        //     loading: false,
        // });
        console.log(res);
      });
  }

  handleAddCardDetails() {
    
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayPaymentDetail/getcarddetails",
      headers: userAuthHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          

          self.setState({
            paymentDetails: data
          })
        } else {
          self.setState({
            paymentDetails: []
          })
        }
      })
      .catch(function (res) {
        
        // self.setState({
        //     loading: false,
        // });
        console.log(res);
      });
  }

  handleGetDefaultPaymentGateway() {
    
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "OnePayPaymentDetail/getdefaultpaymentgateway",
      headers: userAuthHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          
          self.setState({
            paymentGatewayType: data
          })
          // NotificationManager.success("Record Saved Successfully");
          // NotificationManager.success(data);
          // setTimeout(function () {
          //     self.props.history.push({
          //         pathname: "/instantPayHome"
          //     });
          // }, 1000);
          // self.setState({
          //     loading: false,
          // });
        } else {
          // NotificationManager.error("Failed");
          // self.setState({
          //     loading: false,
          // });
        }
      })
      .catch(function (res) {
        
        // self.setState({
        //     loading: false,
        // });
        console.log(res);
      });
  }

  handleSubmit = async event => {
    
    event.preventDefault();

    if (this.state.paymentGatewayType.length > 0) {
      var paymentGatewayName = this.state.paymentGatewayType[0].paymentGatewayName;
      switch (paymentGatewayName) {
        case "Stripe":
          const { stripe, elements } = this.props;
          if (!stripe || !elements) {
            return;
          }

          const cardElement = elements.getElement(CardNumberElement);
          const result = await stripe.createToken(cardElement);
          if (result.error) {
            NotificationManager.error(result.error.message);
            // console.log(result.error.message);
          } else {
            console.log(result.token);
            // this.handleSubmitSubscriptionDetails(result.token, cardElement);
            // const { error, paymentMethod } = await stripe.createPaymentMethod({
            //   type: 'card',
            //   card: cardElement,
            // });

            // if (error) {
            //   console.log('[error]', error);
            // } else {
            // console.log('[PaymentMethod]', paymentMethod);
            this.handleSaveCardDetails(result.token);
            // }
          };
          break;


        case "Card Access":
          break;

        default:
          break;

      }
    }
    //switch case



  };

  handleSaveCardDetails(cardDetails) {
    
    let self = this;
    if (this.state.cardHolderName[0] !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "OnePayPaymentDetail/savecarddetails",
        headers: userAuthHeader(),
        data: {
          CardToken: cardDetails.id,
          CardId: cardDetails.card.id,
          CardType: cardDetails.card.brand,
          CardName: this.state.cardHolderName[0],
          CardExpiryMonth: cardDetails.card.exp_month,
          CardExpiryYear: cardDetails.card.exp_year,
          Last4Digits: parseInt(cardDetails.card.last4),
          PaymentGatewaySourceID: this.state.paymentGatewayType[0].paymentGatewaySourceId,
          // PaymentMethodId: finalPaymentDetails.id,
          PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName
          // PaymentGatewayType: "Stripe",
          // PaymentDetails: {
          //     CardToken: cardDetails.token.id,
          //     CardType: cardDetails.token.card.brand
          // },
          // SubscriptionItem: {
          //     SubscriptionPrice: 800
          // }
        }
      })
        .then(function (res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            
            NotificationManager.success("Record Saved Successfully");
            self.setState({
              addCard: false
            })
            self.handleGetCardDetails();
            // NotificationManager.success("Record Saved Successfully");
            // NotificationManager.success(data);
            // setTimeout(function () {
            //     self.props.history.push({
            //         pathname: "/instantPayHome"
            //     });
            // }, 1000);
            // self.setState({
            //     loading: false,
            // });
          } else {
            NotificationManager.error(status);
            // NotificationManager.error("Failed");
            // self.setState({
            //     loading: false,
            // });
          }
        })
        .catch(function (res) {
          
          // self.setState({
          //     loading: false,
          // });
          console.log(res);
        });
    } else {
      NotificationManager.error("Please enter the card holder name.")
    }
  }

  // handleSaveCardAccessDetails() {
  //   
  //   let self = this;
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "PaymentDetail/savecarddetails",
  //     headers: authHeader(),
  //     data: {
  //       // CardToken: cardDetails.id,
  //       // CardId: cardDetails.card.id,
  //       // CardType: cardDetails.card.brand,
  //       CardName: this.state.cardHolderName[0],
  //       CardExpiryMonth: cardDetails.card.exp_month,
  //       CardExpiryYear: cardDetails.card.exp_year,
  //       Last4Digits: parseInt(cardDetails.card.last4),
  //       PaymentGatewaySourceID: this.state.paymentGatewayType[0].paymentGatewaySourceId,
  //       // PaymentMethodId: finalPaymentDetails.id,
  //       PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName
  //       // PaymentGatewayType: "Stripe",
  //       // PaymentDetails: {
  //       //     CardToken: cardDetails.token.id,
  //       //     CardType: cardDetails.token.card.brand
  //       // },
  //       // SubscriptionItem: {
  //       //     SubscriptionPrice: 800
  //       // }
  //     }
  //   })
  //     .then(function (res) {
  //       let status = res.data.message;
  //       let data = res.data.responseData;
  //       if (status === "Success") {
  //         
  //         NotificationManager.success("Record Saved Successfully");
  //         self.setState({
  //           addCard: false
  //         })
  //         self.handleGetCardDetails();
  //         // NotificationManager.success("Record Saved Successfully");
  //         // NotificationManager.success(data);
  //         // setTimeout(function () {
  //         //     self.props.history.push({
  //         //         pathname: "/instantPayHome"
  //         //     });
  //         // }, 1000);
  //         // self.setState({
  //         //     loading: false,
  //         // });
  //       } else {
  //         NotificationManager.success(data);
  //         // NotificationManager.error("Failed");
  //         // self.setState({
  //         //     loading: false,
  //         // });
  //       }
  //     })
  //     .catch(function (res) {
  //       
  //       // self.setState({
  //       //     loading: false,
  //       // });
  //       console.log(res);
  //     });
  // }

  handleOnChange(e) {
    
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  handleDefaultCardConfirm(customerCardId) {
    
    var paymentDetails = this.state.paymentDetails;
    for (var i = 0; i < paymentDetails.length; i++) {
      if (paymentDetails[i].customerCardId == customerCardId) {
        paymentDetails[i].isDefault = true;
      } else {
        paymentDetails[i].isDefault = false;
      }
    }
    this.setState({
      cardConf: true,
      customerCardId,
      paymentDetails
    })

  }

  handlDefaultCardConfirmClose() {
    this.setState({
      cardConf: false
    })
    this.handleGetCardDetails();
  }

  handlUpdateDefaultCard() {
    let self = this;
    axios({
      method: "put",
      url: config.apiUrl + "OnePayPaymentDetail/updatecarddetails",
      headers: userAuthHeader(),
      data: {
        CustomerCardId: this.state.customerCardId,
        IsDefault: true
      }
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          
          NotificationManager.success("Record Updated Successfully");
          self.setState({
            cardConf: false
          })
          self.handleGetCardDetails();
        } else {
          NotificationManager.success(data);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  handlDeleteCardDetails(customerCardId) {
    let self = this;
    axios({
      method: "delete",
      url: config.apiUrl + "OnePayPaymentDetail/deletecarddetails",
      headers: userAuthHeader(),
      params: {
        CardId: customerCardId
      }
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          
          NotificationManager.success("Record Deleted Successfully");
          self.hide(
            this,
            "card" + customerCardId
          )
          self.handleGetCardDetails();
        } else {
          NotificationManager.success(data);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }

  hide(e, id) {
    // document.getElementById(
    //   id
    // ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //   "none";
    let visible = {};
    visible[id] = false;
    this.setState({
      visible
    })
  }

  show(e, id) {
    // if (document.getElementById(id))
    //   document.getElementById(
    //     id
    //   ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
    //     "block";
    let visible = {};
    visible[id] = true;
    this.setState({
      visible
    })
  }

  handleOnChangeExpiryMonth(e) {
    
    var month = e.target.value;
    if (parseInt(month) > 12) {
      month = this.state.expiryMonth;
    }
    this.setState({
      [e.target.name]: month
    })
  }

  handleOnChangeExpiryYear(e) {
    
    var value = e.target.value;
    this.setState({
      [e.target.name]: value
    })
  }

  handleSaveCACardDetails(cardDetails) {
    
    let self = this;
    if (this.state.cACardHolderName[0] !== "" && this.state.cACardNumber[0] !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "OnePayPaymentDetail/savecarddetails",
        headers: userAuthHeader(),
        data: {
          PaymentGatewaySourceID: this.state.paymentGatewayType[0].paymentGatewaySourceId,
          PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName,
          CardName: this.state.cACardHolderName[0],
          CardNumber: this.state.cACardNumber[0],
          CardExpiryMonth: parseInt(this.state.expiryMonth),
          CardExpiryYear: parseInt(this.state.expiryYear)
          // CardId: cardDetails.card.id,
          // CardType: cardDetails.card.brand,
          // CardName: this.state.cardHolderName[0],
          // CardExpiryMonth: cardDetails.card.exp_month,
          // CardExpiryYear: cardDetails.card.exp_year,
          // Last4Digits: parseInt(cardDetails.card.last4),
          // PaymentGatewaySourceID: this.state.paymentGatewayType[0].paymentGatewaySourceId,
          // PaymentMethodId: finalPaymentDetails.id,
          // PaymentGatewayType: this.state.paymentGatewayType[0].paymentGatewayName
          // PaymentGatewayType: "Stripe",
          // PaymentDetails: {
          //     CardToken: cardDetails.token.id,
          //     CardType: cardDetails.token.card.brand
          // },
          // SubscriptionItem: {
          //     SubscriptionPrice: 800
          // }
        }
      })
        .then(function (res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            
            NotificationManager.success("Record Saved Successfully");
            self.setState({
              newAddCard: false
            })
            self.handleGetCardDetails();
            // NotificationManager.success("Record Saved Successfully");
            // NotificationManager.success(data);
            // setTimeout(function () {
            //     self.props.history.push({
            //         pathname: "/instantPayHome"
            //     });
            // }, 1000);
            // self.setState({
            //     loading: false,
            // });
          } else {
            NotificationManager.error("Record already exists.");
            // NotificationManager.error("Failed");
            // self.setState({
            //     loading: false,
            // });
          }
        })
        .catch(function (res) {
          
          // self.setState({
          //     loading: false,
          // });
          console.log(res);
        });
    } else {
      NotificationManager.error("Please enter the card holder name.")
    }
  }

  render() {
    const columns = [
      {
        title: "Card Holder Name",
        dataIndex: "cardName",
        key: "cardName",
        className: "mob-none",
        sorter: (a, b) => {
          return a.cardName.localeCompare(b.cardName)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Card Type",
        dataIndex: "cardType",
        key: "cardType",
        className: "mob-none",
        sorter: (a, b) => {
          return a.cardType.localeCompare(b.cardType)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
        render: (text, record, index) => (
          (() => {
            if (record.cardType !== null && record.cardType !== "") {
              return (
                record.cardType.toLowerCase().trim() === "visa" ? (
                  <img className="visaind" src={visa} alt="visa" />
                ) : record.cardType.toLowerCase().trim() === "mastercard" ? (
                  <img className="visaind" src={mastercard} alt="visa" />
                ) : record.cardType.toLowerCase().trim() === "american express" ? (
                  <img className="visaind" src={americanexpress} alt="visa" />
                ) : record.cardType.toLowerCase().trim() === "diner club" ? (
                  <img className="visaind" src={DinerClub} alt="visa" />
                ) : (
                          record.cardType
                        )
              )
            }
          })()
        ),
      },
      {
        title: "Card Number",
        dataIndex: "cardNumber",
        key: "cardNumber",
        sorter: (a, b) => {
          return a.cardNumber.localeCompare(b.cardNumber)
        },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Card Expiry",
        dataIndex: "cardexpiry",
        key: "cardexpiry",
        className: "mob-none",
        render: (text, record, index) => (
          record.cardExpiryMonth > 9?
          (record.cardExpiryMonth + "-" + record.cardExpiryYear):
          ("0"+record.cardExpiryMonth + "-" + record.cardExpiryYear)
        ),
        // sorter: (a, b) => {
        //   return a.cardExpiryYear.localeCompare(b.cardExpiryYear)
        // },
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: "Primary Card",
        dataIndex: "primarycard",
        key: "primarycard",
        className: "mob-none",
        render: (text, record, index) => (
          <div className="radio-item">
            <input type="radio" id={"pricard" + record.customerCardId} checked={record.isDefault} onClick={this.handleDefaultCardConfirm.bind(this, record.customerCardId)} />
            <label htmlFor={"pricard" + record.customerCardId}></label>
          </div>
        ),
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "Action",
        render: (row, item) => {
          return (
            item.isDefault == false ?
              <div className="action">
                <div className="editdele">
                  {/* <img src={BlueEdit} alt="Edit" onClick={this.handleeditCardOpen.bind(this)} /> */}
                  <Popover
                    content={
                      <div className="deletepopover text-center">
                        <h3>Are you sure to delete ?</h3>
                        <button className="delete"
                          onClick={() =>
                            this.hide(
                              this,
                              "card" + item.customerCardId
                            )
                          }
                        >Cancel</button>
                        <button className="delete" onClick={this.handlDeleteCardDetails.bind(this, item.customerCardId)}> Delete</button>
                      </div>
                    }
                    placement="bottomRight"
                    trigger="click"
                    visible={this.state.visible["card" + item.customerCardId] == undefined ? false :
                      this.state.visible["card" + item.customerCardId]}
                  >
                    <img src={RedDelete} alt="Delete"
                      onClick={() =>
                        this.show(this, "card" + item.customerCardId)
                      }
                    />
                  </Popover>
                </div>
              </div> : null
          );
        },
      },
    ];

    // const data = [
    //   {
    //     key: "1",
    //     no: "1",
    //     cardin: <label>Credit Card ending with 7896</label>,
    //     cardname: <label>Lorem Ipsum</label>,
    //     cardexpiry: <label>10-2023</label>,
    //     primarycard:
    //       <div className="radio-item">
    //         <input type="radio" id="card1" name="card" value="ca1" />
    //         <label htmlFor="card1"></label>
    //       </div>
    //   },
    //   {
    //     key: "2",
    //     no: "2",
    //     cardin: <label>Credit Card ending with 5647</label>,
    //     cardname: <label>Lorem Ipsum</label>,
    //     cardexpiry: <label>01-2025</label>,
    //     primarycard:
    //       <div className="radio-item">
    //         <input type="radio" id="card2" name="card" value="ca2" />
    //         <label htmlFor="card2"></label>
    //       </div>
    //   },
    //   {
    //     key: "3",
    //     no: "3",
    //     cardin: <label>Credit Card ending with 4509</label>,
    //     cardname: <label>Lorem Ipsum</label>,
    //     cardexpiry: <label>04-2021</label>,
    //     primarycard:
    //       <div className="radio-item">
    //         <input type="radio" id="card3" name="card" value="ca3" />
    //         <label htmlFor="card3"></label>
    //       </div>
    //   },
    // ];
    const { stripe, error, processing } = this.props;

    return (
      <div>
        <div className="userpayment">
          <h3 className="Usermana">Add Card Details</h3>
          {this.state.paymentGatewayType.length > 0 &&
            (this.state.paymentGatewayType[0].paymentGatewayName).toLowerCase() == "stripe" ?
            (<label className="add" onClick={this.handleaddCardOpen.bind(this)}>Add New</label>) :
            (<label className="add" onClick={this.handlenewAddCardOpen.bind(this)}>Add</label>)}
          <div className="userpaymenttable">
            <Table
              columns={columns}
              expandedRowRender={(row) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Card Info:</label>
                          <label className="expandemailtext">{row.cardin}</label>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Card Holder Name:</label>
                          <label className="expandemailtext">
                            {row.cardname}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Card Expiry:</label>
                          <label className="expandemailtext">
                            {row.cardexpiry}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mobilevi">
                          <label className="expandemail">Status:</label>
                          <label className="expandemailtext">
                            {row.isActive ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
              expandIcon={({ expanded, onExpand, record }) =>
                expanded ? (
                  <div className="expandown1">
                    <img src={Down} onClick={e => onExpand(record, e)} />
                  </div>
                ) : (
                    <div className="expandown">
                      <img src={Down} onClick={e => onExpand(record, e)} />
                    </div>
                  )}
              expandIconColumnIndex={this.state.mobileView ? 6 : -1}
              expandIconAsCell={false}
              dataSource={this.state.paymentDetails}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true
              }}
            />
          </div>
          {/* Add Role */}
          <Modal
            open={this.state.addCard}
            onClose={this.handleaddCardClose.bind(this)}
            modalId="addcardModal"
            overlayId="overlay"
          >
            <form className="Form" onSubmit={this.handleSubmit}>
              <div className="backtext">
                <h3 className="eduser">Add Card Details</h3>
                <img src={CloseIcon} alt="CloseIcon" className="closeicon"
                  onClick={this.handleaddCardClose.bind(this)} />
              </div>
              <div className="edituser">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>Card Holder Name</label>
                      <input type="text"
                        name="cardHolderName"
                        value={this.state.cardHolderName}
                        placeholder="Enter card holder name"
                        onChange={this.handleOnChange.bind(this)}
                      />
                      {/* <span class="Error">Required Field</span> */}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>Card Number</label>
                      {/* <input type="text" placeholder="Enter card number" /> */}
                      <div className="inpuu">
                        <CardNumberElement
                          options={{
                            style: {
                              base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                  color: '#aab7c4',
                                },
                              },
                              invalid: {
                                color: '#9e2146',
                              },
                            },
                          }}
                        />
                      </div>
                      {/* <span class="Error">Required Field</span> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>Expiry Date</label>
                      <div className="d-flex inpuu">
                        <CardExpiryElement />
                      </div>
                      {/* <span class="Error">Required Field</span> */}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>CVC</label>
                      <div className="inpuu">
                        <CardCvcElement />
                      </div>

                      {/* <span class="Error">Required Field</span> */}
                    </div>
                  </div>

                </div>
                {/* <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label class="switch">
                        <input type="checkbox" 
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="Editbtn">
                  {/* <button className="btn">Add</button> */}
                  <button type="submit" className="btn" processing={processing} error={error} disabled={!stripe}>
                    Add
                  </button>
                </div>
              </div>
            </form>
          </Modal>
          {/* Edit Role */}

          <Modal
            open={this.state.editCard}
            onClose={this.handleeditCardClose.bind(this)}
            modalId="addcardModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Edit Card Details</h3>
              <img src={CloseIcon} alt="CloseIcon" className="closeicon"
                onClick={this.handleeditCardClose.bind(this)} />
            </div>
            <div className="edituser">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Card Holder Name</label>
                    <input type="text" placeholder="Enter card holder name" />
                    <span class="Error">Required Field</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Card Number</label>
                    <input type="text" placeholder="Enter card number" />
                    <span class="Error">Required Field</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Expiry Date</label>
                    <div className="d-flex">
                      <select className="mr-1">
                        <option>Month</option>
                        <option>Month 1</option>
                        <option>Month 2</option>
                      </select>
                      <select>
                        <option>Year</option>
                        <option>Year 1</option>
                        <option>Year 2</option>
                      </select>
                    </div>
                    <span class="Error">Required Field</span>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="marginbot">
                    <label>Zip/Postal Code</label>
                    <input type="text" placeholder="Enter Zip/Postal Code" />
                    <span class="Error">Required Field</span>
                  </div>
                </div>
              </div>
              <div className="Editbtn">
                <button className="btn">Save</button>
              </div>
            </div>
          </Modal>
          <Modal
            open={this.state.cardConf}
            onClose={this.handlDefaultCardConfirmClose.bind(this)}
            modalId="addcardModal"
            overlayId="overlay"
          >
            <div className="backtext">
              <h3 className="eduser">Primary Card Confirmation</h3>
              <img src={CloseIcon} alt="CloseIcon" className="closeicon"
                onClick={this.handlDefaultCardConfirmClose.bind(this)} />
            </div>
            <div className="edituser">
              <p>Are you sure want to set default primary card?</p>
              <div className="Editbtn">
                {/* <button className="btn">Add</button> */}
                <button className="btn add-btn" onClick={this.handlUpdateDefaultCard.bind(this)}>
                  Save
                  </button>
                <button className="btn" onClick={this.handlDefaultCardConfirmClose.bind(this)}>
                  Cancel
                  </button>
              </div>
            </div>
          </Modal>
          {/* addd neww */}
          <div className="">
            <Modal
              open={this.state.newAddCard}
              onClose={this.handlenewAddCardClose.bind(this)}
              modalId="addcardModal"
              overlayId="overlay"
            >
              {/* <form className="Form" onSubmit={this.handleSubmit}> */}
              <div className="backtext">
                <h3 className="eduser">Add Card Details</h3>
                <img src={CloseIcon} alt="CloseIcon" className="closeicon"
                  onClick={this.handlenewAddCardClose.bind(this)} />
              </div>
              <div className="edituser">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>Card Holder Name</label>
                      <input type="text"
                        placeholder="Enter card Holder Name"
                        name="cACardHolderName"
                        value={this.state.cACardHolderName}
                        onChange={this.handleOnChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="marginbot">
                      <label>Card Number</label>
                      <input type="text" placeholder="Enter card number" maxLength="16"
                        name="cACardNumber"
                        value={this.state.cACardNumber}
                        onChange={this.handleOnChange.bind(this)} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-3">
                    <div className="marginbot">
                      <label>Expiry Month</label>
                      <input type="text"
                        name="expiryMonth"
                        value={this.state.expiryMonth}
                        onChange={this.handleOnChangeExpiryMonth.bind(this)}
                        placeholder="MM" maxLength="2"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className="marginbot">
                      <label>Expiry Year</label>
                      <input type="text"
                        name="expiryYear"
                        value={this.state.expiryYear}
                        onChange={this.handleOnChangeExpiryYear.bind(this)}
                        placeholder="YY" maxLength="2"
                      />
                      {/* <input type="text"
                        name="YY"
                        placeholder="YY" maxLength="2"
                      /> */}
                      {/* Dropedown */}
                      {/* <select>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="Editbtn">
                  <button className="btn" onClick={this.handleSaveCACardDetails.bind(this)}>
                    Add
                  </button>
                </div>
              </div>
              {/* </form> */}
            </Modal>
          </div>
          {/*  */}
        </div>
      </div>
    )
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <SplitPaymentCardDetail stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
