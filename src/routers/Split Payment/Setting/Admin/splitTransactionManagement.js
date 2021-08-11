import React, { Component } from "react";
import { Table, Popover, Spin, DatePicker } from "antd";
import CSV from "./../../../../assets/Images/csv.png";
import InfoIcon from "./../../../../assets/Images/Infoblue.png";
import Filter from "./../../../../assets/Images/filter.png";
import WhiteDropdown from "./../../../../assets/Images/WhiteDropdown.png";
import config from "./../../../../helpers/config";
import axios from "axios";
import { authHeader } from "../../helpers/splitAuthHeader";
import Visa from "./../../../../assets/Images/visa.png";
import MasterCard from "./../../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../../assets/Images/american-express.png";
import DinerClub from "./../../../../assets/Images/diners-club.png";
import { Drawer } from "antd";
import Down from "./../../../../assets/Images/download.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";

class paymentManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
      customerTransactionsData: [],
      merchantTransactionsData: [],
      activeTab: "customer",
      visibleFilter: false,
      placement: "bottom",
      mobileView: false,
      loadingCustomer: false,
      loadingMerchant: false,
      paginationCustomer: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      paginationMerchant: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      orderId: "",
      transactionId: "",
      startDate: null,
      endDate: null,
      userName: "",
      merchantName: "",
      totalTransactionAmount: "",
      paymentProcessor: "",
      status: "",
      loadingSearchCustomer: false,
      hdnOrderId: false,
      hdnUserName: false,
      hdnTransactionId: true,
      hdnPaymentProcessor: true,
      hdnDate: true,
      hdnStatus: true,
      customerTransactionsDataCSV: []
    };
  }
  showDrawerFilter = () => {
    this.setState({ visibleFilter: true });
  };
  onCloseFilter = () => {
    this.setState({ visibleFilter: false });
  };
  onChange = (e) => {
    this.setState({ placement: e.target.value });
  };
  componentDidMount() {
    this.handleGetCustomerTransactionsList();
    if (window.screen.width > 768) {
      this.setState({
        mobileView: false,
      });
    } else {
      this.setState({
        mobileView: true,
      });
    }
  }

  handleInstallmentsDetails(installmentsDetails) {
    

    this.props.history.push({
      pathname: "installmentDetails",
      installmentsDetails: installmentsDetails,
    });
  }

  handleGetCustomerTransactionsList(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.paginationCustomer;
    self.setState({
      loadingCustomer: true,
      loadingSearchCustomer: true
    });
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayPaymentManagement/CustomerTransactionManagement",
      headers: authHeader(),
      data: {
        OrderID: this.state.orderId,
        TransactionID: this.state.transactionId,
        TransactionDateFrom: startDate,
        TransactionDateTo: endDate,
        TransactionAmountfilter: this.state.totalTransactionAmount
          ? parseInt(this.state.totalTransactionAmount)
          : 0.0,
        UserName: this.state.userName,
        MerchantName: this.state.merchantName,
        PaymentProcessor: this.state.paymentProcessor,
        PaymentMethod: null,
        CustomerCard: null,
        PaymentStatus: this.state.status,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "createdDate") : "createdDate",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            // paging.current = paging.current;
            // paging.pageSize = paging.pageSize;
            paging.total = parseInt(data[0].totalRowCount);
            self.setState({
              customerTransactionsData: data,
              loadingCustomer: false,
              paginationCustomer: paging,
              loadingSearchCustomer: false
            });
          } else {
            paging.total = 0;
            self.setState({
              customerTransactionsData: [],
              loadingCustomer: false,
              paginationCustomer: paging,
              loadingSearchCustomer: false
            });
          }
        } else {
          paging.total = 0;
          self.setState({
            customerTransactionsData: [],
            loadingCustomer: false,
            paginationCustomer: paging,
            loadingSearchCustomer: false
          });
        }
        self.handleGetCustomerTransactionsCSV(pagination, sorter);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetMerchantTransactionsList(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.paginationMerchant;
    self.setState({
      loadingMerchant: true,
      loadingSearchCustomer: true
    });
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayPaymentManagement/MerchantTransactionManagement",
      headers: authHeader(),
      data: {
        TransactionID: this.state.transactionId,
        TransactionDateFrom: startDate,
        TransactionDateTo: endDate,
        TransactionAmountfilter: this.state.totalTransactionAmount
          ? parseInt(this.state.totalTransactionAmount)
          : 0.0,
        MerchantName: this.state.merchantName,
        PaymentProcessor: this.state.paymentProcessor,
        PaymentMethod: null,
        PaymentStatus: this.state.status,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "createdDate") : "createdDate",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            paging.total = parseInt(data[0].totalRowCount);
            self.setState({
              merchantTransactionsData: data,
              loadingMerchant: false,
              paginationMerchant: paging,
              loadingSearchCustomer: false
            });
          } else {
            paging.total = 0;
            self.setState({
              merchantTransactionsData: [],
              loadingMerchant: false,
              paginationMerchant: paging,
              loadingSearchCustomer: false
            });
          }
        } else {
          paging.total = 0;
          self.setState({
            merchantTransactionsData: [],
            loadingMerchant: false,
            paginationMerchant: paging,
            loadingSearchCustomer: false
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetCustomerTransactionsCSV(pagination, sorter) {
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.paginationCustomer;
    var startDate = this.state.startDate !== null ? moment(this.state.startDate).format('YYYY-MM-DD') : this.state.startDate;
    var endDate = this.state.endDate !== null ? moment(this.state.endDate).format('YYYY-MM-DD') : this.state.endDate;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayPaymentManagement/CustomerTransactionManagement",
      headers: authHeader(),
      data: {
        OrderID: this.state.orderId,
        TransactionID: this.state.transactionId,
        TransactionDateFrom: startDate,
        TransactionDateTo: endDate,
        TransactionAmountfilter: this.state.totalTransactionAmount
          ? parseInt(this.state.totalTransactionAmount)
          : 0.0,
        UserName: this.state.userName,
        MerchantName: this.state.merchantName,
        PaymentProcessor: this.state.paymentProcessor,
        PaymentMethod: null,
        CustomerCard: null,
        PaymentStatus: this.state.status,
        SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "createdDate") : "createdDate",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: "1",
        Size: (this.state.paginationCustomer.total).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            self.setState({
              customerTransactionsDataCSV: data
            });
          } else {
            self.setState({
              customerTransactionsDataCSV: []
            });
          }
        } else {
          self.setState({
            customerTransactionsDataCSV: []
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUserDetails(orderId, merchantId, userId) {
    

    this.props.history.push({
      pathname: "installmentDetails",
      installmentsDetails: {
        orderId: orderId,
        merchantId: merchantId,
        userId: userId
      }
    });
  }

  handleMerchantDetails(merchantId) {
    

    this.props.history.push({
      pathname: "merchantDetails",
      merchantId: merchantId,
    });
  }

  async handleTabChange(tabName) {
    const { activeTab } = this.state;
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    await this.setState({
      orderId: "",
      transactionId: "",
      startDate: null,
      endDate: null,
      userName: "",
      merchantName: "",
      totalTransactionAmount: "",
      paymentProcessor: "",
      status: ""
    })
    if (tabName !== activeTab) {
      if (tabName === "merchant") {
        this.handleGetMerchantTransactionsList(pagination);
        await this.setState({
          activeTab: "merchant",
          hdnOrderId: true,
          hdnUserName: true,
          hdnTransactionId: false,
          hdnPaymentProcessor: false,
          hdnDate: false,
          hdnStatus: false
        });
      } else {
        this.handleGetCustomerTransactionsList(pagination);
        await this.setState({
          activeTab: "customer",
          hdnOrderId: false,
          hdnUserName: false,
          hdnTransactionId: true,
          hdnPaymentProcessor: true,
          hdnDate: true,
          hdnStatus: true
        });
      }
    }
  }

  handleFilterbuttonClick = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };

  onShowSizeChangeCustomer = (pagination, pagesize, sorter) => {
    this.handleGetCustomerTransactionsList(pagination, sorter)
  }

  onShowSizeChangeMerchant = (pagination, pagesize, sorter) => {
    this.handleGetMerchantTransactionsList(pagination, sorter)
  }

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSearchCustomer() {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetCustomerTransactionsList(pagination);
    this.handleGetMerchantTransactionsList(pagination);
  }

  handleDateOnChange = (dates, dateStrings) => {
    if (dates !== null) {
      this.setState({ startDate: dates[0]._d, endDate: dates[1]._d });
    } else {
      this.setState({ startDate: null, endDate: null });
    }
  };

  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }

  show(e, id) {
    if (document.getElementById(id))
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }

  render() {
    function disabledDate(current) {
      // Can not select days before today and today
      return current > new Date();
    }
    const { placement, visibleFilter } = this.state;
    const columnsCustomer = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend']
      },
      // {
      //   title: "Trasaction ID",
      //   dataIndex: "transactionID",
      //   key: "transactionID",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Trasaction Date",
      //   dataIndex: "transactionDate",
      //   key: "transactionDate",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      {
        title: "Installments",
        dataIndex: "installment",
        key: "installment",
        className: "mob-none",
        render: (row, item) =>
          item.installment === "-" ? (
            item.installment
          ) : (
              <span
                className="custom-link"
                onClick={() =>
                  this.handleInstallmentsDetails({
                    orderId: item.orderId,
                    merchantId: item.merchantId,
                    userId: item.userId,
                  })
                }
              >
                {item.installment}
              </span>
            ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Amount Transacted (AU$)",
        dataIndex: "transactionAmount",
        key: "transactionAmount",
        render: (row, item) => {
          return (
            <div>
              <label>{"$"}{item.transactionAmount} </label>
              {/* <label>{"$"}{item.transactionAmount}</label> */}
            </div>
          )
        },
        sorter: true,
        className: "mob-none",
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Transaction Date",
        dataIndex: "transactionActuaDate",
        key: "transactionActuaDate",
        className: "mob-none",
        render: (row, item) => {
          return (
            <div>
              <label>{moment(item.transactionActuaDate).format("DD-MM-YYYY hh:mm")}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "User",
        dataIndex: "userName",
        key: "userName",
        className: "mob-none",
        render: (row, item) => (
          <span
            className="custom-link"
            onClick={() => this.handleUserDetails(item.orderId, item.merchantId, item.userId)}
          >
            {item.userName}
          </span>
        ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        className: "mob-none",
        // render: (row, item) => (
        //   <span
        //     className="custom-link"
        //     onClick={() => this.handleMerchantDetails(item.merchantId)}
        //   >
        //     {item.merchantName}
        //   </span>
        // ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Payment Processor",
      //   dataIndex: "paymentProcessor",
      //   key: "paymentProcessor",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Payment Method",
      //   dataIndex: "customerCard",
      //   key: "customerCard",
      //   render: (row, item) =>
      //     item.customerCard.toLowerCase().trim() === "visa" ? (
      //       <img src={Visa} alt="icon missing" className="cards-icon" />
      //     ) : item.customerCard.toLowerCase().trim() === "master card" ? (
      //       <img src={MasterCard} alt="icon missing" className="cards-icon" />
      //     ) : item.customerCard.toLowerCase().trim() === "american express" ? (
      //       <img
      //         src={AmericanExpress}
      //         alt="icon missing"
      //         className="cards-icon"
      //       />
      //     ) : item.customerCard.toLowerCase().trim() === "diner club" ? (
      //       <img src={DinerClub} alt="icon missing" className="cards-icon" />
      //     ) : (
      //               item.customerCard
      //             ),
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Status",
      //   dataIndex: "paymentStatus",
      //   key: "paymentStatus",
      //   render: (row, item) => {
      //     return (
      //       <div className="amazontext">
      //         <label
      //           className={
      //             item.paymentStatus.toLowerCase().trim() === "failed"
      //               ? "failed"
      //               : item.paymentStatus.toLowerCase().trim() === "success"
      //                 ? "success"
      //                 : item.paymentStatus.toLowerCase().trim() === "progress"
      //                   ? "custom-link"
      //                   : "refundtext"
      //           }
      //         >
      //           {item.paymentStatus}
      //         </label>
      //         <Popover
      //           content={
      //             <div className="refundpopover">
      //               <div className="subsc">
      //                 <label>Refund Amount</label>
      //                 <label>{item.refundAmount}</label>
      //               </div>
      //               <div className="subsc">
      //                 <label>Refund Date</label>
      //                 <label>{item.refundedDate}</label>
      //               </div>
      //               <div className="subsc">
      //                 <label>Refund Initiated By</label>
      //                 <label>{item.refundInitiatedBy}</label>
      //               </div>
      //             </div>
      //           }
      //           placement="bottom"
      //           trigger="hover"
      //         >
      //           {item.paymentStatus === "Refunded" && (
      //             <img src={InfoIcon} alt="InfoIcon" />
      //           )}
      //         </Popover>
      //       </div>
      //     );
      //   },
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
    ];
    const columnsMerchant = [
      {
        title: "Trasaction ID",
        dataIndex: "transactionID",
        key: "transactionID",
        sorter: true,
        className: "mob-none",
        sortDirections: ['descend', 'ascend', 'descend']
      },
      {
        title: "Trasaction Date",
        dataIndex: "transactionDate",
        key: "transactionDate",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Amount Transacted (AU$)",
        dataIndex: "transactionAmount",
        key: "transactionAmount",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        className: "mob-none",
        render: (row, item) => (
          <span
            className="custom-link"
            onClick={() => this.handleMerchantDetails(item.merchantId)}
          >
            {item.merchantName}
          </span>
        ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Processor",
        dataIndex: "paymentProcessor",
        key: "paymentProcessor",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Payment Method",
        dataIndex: "customerCard",
        key: "customerCard",
        className: "mob-none",
        render: (row, item) =>
          item.customerCard.toLowerCase().trim() === "visa" ? (
            <img src={Visa} alt="icon missing" className="cards-icon" />
          ) : item.customerCard.toLowerCase().trim() === "mastercard" ? (
            <img src={MasterCard} alt="icon missing" className="cards-icon" />
          ) : item.customerCard.toLowerCase().trim() === "american express" ? (
            <img
              src={AmericanExpress}
              alt="icon missing"
              className="cards-icon"
            />
          ) : item.customerCard.toLowerCase().trim() === "diner club" ? (
            <img src={DinerClub} alt="icon missing" className="cards-icon" />
          ) : (
                    item.customerCard
                  ),
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Status",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        render: (row, item) => {
          return (
            <div className="amazontext">
              <label
                className={
                  item.paymentStatus.toLowerCase().trim() === "failed"
                    ? "failed"
                    : item.paymentStatus.toLowerCase().trim() === "success"
                      ? "success"
                      : item.paymentStatus.toLowerCase().trim() === "progress"
                        ? "custom-link"
                        : "refundtext"
                }
              >
                {item.paymentStatus}
              </label>
              <Popover
                content={
                  <div className="refundpopover">
                    <div className="subsc">
                      <label>Refund Amount</label>
                      <label>{item.refundAmount}</label>
                    </div>
                    <div className="subsc">
                      <label>Refund Date</label>
                      <label>{item.refundedDate}</label>
                    </div>
                    <div className="subsc">
                      <label>Refund Initiated By</label>
                      <label>{item.refundInitiatedBy}</label>
                    </div>
                  </div>
                }
                placement="bottom"
                trigger="hover"
              >
                {item.paymentStatus === "Refunded" && (
                  <img src={InfoIcon} alt="InfoIcon" />
                )}
              </Popover>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "Action",
        render: (row, item) => {
          return item.paymentStatus.toLowerCase().trim() === "refund init" ? (
            <Popover
              content={
                <div className="deletepopover text-center" id={"merchant" + item.merchantId}>
                  <h3>Are you sure to refund ?</h3>
                  <button className="delete"
                  onClick={() =>
                    this.hide(
                      this,
                      "merchant" + item.merchantId
                    )
                  }
                  >Cancel</button>
                  <button className="refundbt">Refund</button>
                </div>
              }
              placement="bottomRight"
              trigger="click"
            >
              <div className="refund">
                <button
                onClick={() =>
                  this.show(this, "merchant" + item.merchantId)
                } 
                >Refund</button>
              </div>
            </Popover>
          ) : (
              "-"
            );
        },
      },
    ];

    const headersEndCustomer = [
      { label: "Order ID", key: "orderId" },
      // { label: "Installments", key: "installment" },
      { label: "Amount Transacted (AU$)", key: "transactionAmount" },
      { label: "User", key: "userName" },
      { label: "Merchant", key: "merchantName" }
    ];

    const headersMerchant = [
      { label: "Trasaction ID", key: "transactionID" },
      { label: "Trasaction Date", key: "transactionDate" },
      { label: "Amount Transacted (AU$)", key: "transactionAmount" },
      { label: "Merchant", key: "merchantName" },
      { label: "Payment Processor", key: "paymentProcessor" },
      { label: "Payment Method", key: "customerCard" },
      { label: "Status", key: "paymentStatus" }
    ];


    return (
      <div className="paymentmana">
        <h3 className="Usermana">End Customer Transaction Management</h3>
        <div className="exfilter">
          {this.state.activeTab == "customer" ? (
            <CSVLink
              data={this.state.customerTransactionsDataCSV}
              headers={headersEndCustomer}
              filename={"End Customer.csv"}
              className="csv"
            >
              <img src={CSV} alt="Export" />
            Export to CSV
            </CSVLink>) : (<CSVLink
              data={this.state.merchantTransactionsData}
              headers={headersMerchant}
              filename={"Merchant.csv"}
              className="csv"
            >
              <img src={CSV} alt="Export" />
            Export to CSV
            </CSVLink>)}
          <label className="filte" onClick={this.handleFilterbuttonClick.bind(this)}>
            <img src={Filter} alt="Export" />
            Filter
            <img src={WhiteDropdown} alt="Dropdown" className="WhDrop" />
          </label>
        </div>
        <label className="filt" onClick={this.showDrawerFilter.bind(this)}>
          <img src={Filter} alt="Export" />
        </label>
        {this.state.isFilter ? (
          <div className="row m-0 w-100 back">
            <div className="col-12 col-md-3" hidden={this.state.hdnOrderId}>
              <input type="text"
                placeholder="Enter Order Id"
                name="orderId"
                value={this.state.orderId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3" hidden={this.state.hdnTransactionId}>
              <input type="text"
                placeholder="Enter Transaction Id"
                name="transactionId"
                value={this.state.transactionId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3" hidden={this.state.hdnUserName}>
              <input type="text"
                placeholder="Enter User Name"
                name="userName"
                value={this.state.userName}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input type="text"
                placeholder="Enter Merchant Name"
                name="merchantName"
                value={this.state.merchantName}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Total Amount Txn upto"
                name="totalTransactionAmount"
                value={this.state.totalTransactionAmount}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            <div className="col-12 col-md-3" hidden={this.state.hdnPaymentProcessor}>
              <input
                type="text"
                placeholder="Enter Payment Processor"
                name="paymentProcessor"
                value={this.state.paymentProcessor}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3" hidden={this.state.hdnDate}>
              <RangePicker
                className="calendar"
                format={dateFormat}
                onChange={this.handleDateOnChange}
                disabledDate={disabledDate}
              ></RangePicker>
            </div>
            <div className="col-12 col-md-3" hidden={this.state.hdnStatus}>
              <select
                name="status"
                value={this.state.status}
                onChange={this.handleOnChange.bind(this)}
              >
                <option value="">Select Status</option>
                <option value="Refund Init">Refund Init</option>
                <option value="Progress">Progress</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div className="col-12 col-md-3">
              <div className="search" style={{textAlign:"left"}}>
                <button className="m-0" onClick={this.handleSearchCustomer.bind(this)}
                  disabled={this.state.loadingSearchCustomer}>
                  {this.state.loadingSearchCustomer && (
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faCircleNotch}
                      size="sm"
                      spin
                    />
                  )}
                Search
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="paytab">
          <div className="secondtab mb-4 mt-4 w-100">
            <ul className="nav nav-tabs w-100" role="tablist">
              {/* <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#noti-Tab"
                  role="tab"
                  aria-controls="noti-Tab"
                  aria-selected="true"
                  onClick={() => this.handleTabChange("customer")}
                >
                  End Customer
                </a>
              </li> */}
              {/* <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#email-Tab"
                  role="tab"
                  aria-controls="email-Tab"
                  aria-selected="false"
                  onClick={() => this.handleTabChange("merchant")}
                >
                  Merchant
                </a>
              </li> */}
            </ul>
          </div>
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="noti-Tab"
              role="tabpanel"
              aria-labelledby="noti-Tab"
            >
              <div className="paymenttable">
                <Spin spinning={this.state.loadingCustomer}>
                  <Table
                    columns={columnsCustomer}
                    expandedRowRender={(row) => {
                      return (
                        <React.Fragment>
                          <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">OrderId:</label>
                                <label className="expandemailtext">{row.orderId}</label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">transactionID:</label>
                                <label className="expandemailtext">{row.transactionID}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">Trasaction Date:</label>
                                <label className="expandemailtext">{row.transactionDate}</label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">Installments:</label>
                                <label className="expandemailtext">{row.installment}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">Amount Transacted (AU$):</label>
                                <label className="expandemailtext">{row.transactionAmount}</label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">User:</label>
                                <label className="expandemailtext">{row.userName}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">MerchantName:</label>
                                <label className="expandemailtext">{row.merchantName}</label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">Payment Processor:</label>
                                <label className="expandemailtext">{row.paymentProcessor}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">customerCard:</label>
                                <label className="expandemailtext">{row.customerCard}</label>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                              <div className="mobilevi">
                                <label className="expandemail">Created By:</label>
                                <div className="amazontext">
                                  <label className="expandemailtext">
                                    {row.createBy}
                                  </label>
                                  <Popover
                                    content={
                                      <div className="userpopover">
                                        <div className="subsc">
                                          <label>Created By</label>
                                          <label>{row.createBy}</label>
                                        </div>
                                        <div className="subsc">
                                          <label>Created On</label>
                                          <label>{row.createDate}</label>
                                        </div>
                                        <div className="subsc">
                                          <label>Modified By</label>
                                          <label>{row.updateBy}</label>
                                        </div>
                                        <div className="subsc">
                                          <label>Modified On</label>
                                          <label>{row.updateDate}</label>
                                        </div>
                                      </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                  >
                                    <img src={InfoIcon} alt="InfoIcon" />
                                  </Popover>
                                </div>
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
                    expandIconColumnIndex={this.state.mobileView ? 8 : -1}
                    expandIconAsCell={false}
                    dataSource={this.state.customerTransactionsData}
                    pagination={{
                      current: this.state.paginationCustomer.current,
                      pageSize: this.state.paginationCustomer.pageSize,
                      total: this.state.paginationCustomer.total,
                      position: ["bottomCenter"],
                      showSizeChanger: true
                    }}
                    onChange={this.onShowSizeChangeCustomer}
                  />
                </Spin>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="email-Tab"
              role="tabpanel"
              aria-labelledby="email-Tab"
            >
              <div className="paymenttable">
                <Spin spinning={this.state.loadingMerchant}>
                  <Table
                    columns={columnsMerchant}
                    dataSource={this.state.merchantTransactionsData}
                    pagination={{
                      current: this.state.paginationMerchant.current,
                      pageSize: this.state.paginationMerchant.pageSize,
                      total: this.state.paginationMerchant.total,
                      position: ["bottomCenter"],
                      showSizeChanger: true
                    }}
                    onChange={this.onShowSizeChangeMerchant}
                  />
                </Spin>
              </div>
            </div>
          </div>
        </div>
        <div className="fl">
          <Drawer
            placement={placement}
            closable={false}
            onClose={this.onCloseFilter}
            visible={visibleFilter}
            key={placement}
            className="f2"
          >
            <div className="drarfilter">
              <div className="row m-0 w-100 back">
                <div className="col-12 col-md-3">
                  <input type="text" placeholder="Enter User Id" />
                </div>
                <div className="col-12 col-md-3">
                  <input type="text" placeholder="Enter Name" />
                </div>
                <div className="col-12 col-md-3">
                  <input type="text" placeholder="Enter Email" />
                </div>
                <div className="col-12 col-md-3">
                  <input type="text" placeholder="Enter Contact No." />
                </div>
                <div className="col-12 col-md-3">
                  <label className="Totalamount">
                    Total No. of Transaction upto
                  </label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value="50" />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <label className="Totalamount">
                    Total Amount Transacted upto
                  </label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value="50" />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    className="calendar"
                    placeholder="Start Date - End Date"
                  />
                </div>
                <div className="col-12 col-md-3">
                  <select>
                    <option>Select Status</option>
                    <option>Select Status 1</option>
                    <option>Select Status 2</option>
                  </select>
                </div>
                <div className="col-12 col-md-12">
                  <div className="search">
                    <button onClick={this.onCloseFilter.bind(this)} className="mr-1">Cancel</button>
                    <button>Search</button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default paymentManagement;
