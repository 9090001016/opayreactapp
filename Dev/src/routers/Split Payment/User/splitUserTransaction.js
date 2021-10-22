import React, { Component } from "react";
import Filter from "./../../../assets/Images/filter.png";
import CSV from "./../../../assets/Images/csv.png";
import WhiteDropdown from "./../../../assets/Images/WhiteDropdown.png";
import InfoIcon from "./../../../assets/Images/Infoblue.png";
import { Table, Popover, DatePicker } from "antd";
import config from "../../../helpers/config";
import { userAuthHeader } from "../../Split Payment/User/splitUserAuthHeader";
import axios from "axios";
import Visa from "./../../../assets/Images/visa.png";
import MasterCard from "./../../../assets/Images/mastercard.png";
import AmericanExpress from "./../../../assets/Images/american-express.png";
import DinerClub from "./../../../assets/Images/diners-club.png";
import { CSVLink } from "react-csv";
import { parse } from "querystring";
import { parseDate } from "tough-cookie";
import { Drawer } from "antd";
import Down from "./../../../assets/Images/download.png";
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = "DD-MM-YYYY";

class splitUserTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
      transactionsData: [],
      orderID: null,
      merchantorderId: "",
      merchantName: "",
      transactionID: null,
      paymentProcessor: null,
      transactionDateFrom: null,
      transactionDateTo: null,
      transactionAmount: "",
      paymentMethod: null,
      visibleFilter: false,
      placement: "bottom",
      mobileView: false,
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      transactionCSVData: []
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
    this.handleGetTransactionsGridData();
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
  handleFilterbuttonClick = () => {
    this.setState({ isFilter: !this.state.isFilter });
  };
  handleInstallmentsDetails(installmentsDetails) {
    

    // setTimeout(function () {
    this.props.history.push({
      pathname: "installmentDetails",
      installmentsDetails: installmentsDetails,
    });
    // }, 1000);
  }

  handleDateOnChange = (dates, dateStrings) => {
    if (dates !== null) {
      this.setState({ transactionDateFrom: dates[0]._d, transactionDateTo: dates[1]._d });
    } else {
      this.setState({ transactionDateFrom: null, transactionDateTo: null });
    }
  };

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGetTransactionsGridData(pagination, sorter) {
    
    let self = this;
    var paging = pagination !== undefined ? pagination : this.state.pagination;
    self.setState({
      loading: true
    });
    var startDate = this.state.transactionDateFrom !== null ? moment(this.state.transactionDateFrom).format('YYYY-MM-DD') : this.state.transactionDateFrom;
    var endDate = this.state.transactionDateTo !== null ? moment(this.state.transactionDateTo).format('YYYY-MM-DD') : this.state.transactionDateTo;

    axios({
      method: "post",
      url: config.apiUrl + "OnePayUserTransaction/CustomerTransactionHistory",
      headers: userAuthHeader(),
      data: {
        OrderID: this.state.orderID,
        TransactionID: this.state.transactionID,
        MerchantOrderId: this.state.merchantorderId,
        MerchantName: this.state.merchantName,
        TransactionDateFrom: startDate,
        TransactionDateTo: endDate,
        TransactionAmount: this.state.transactionAmount
          ? parseInt(this.state.transactionAmount)
          : 0.0,
        UserName: null,
        MerchantName: null,
        PaymentProcessor: this.state.paymentProcessor,
        PaymentMethod: this.state.paymentMethod,
        CustomerCard: null,
        PaymentStatus: null,
        // SortColumn: sorter !== undefined ? (sorter.field !== undefined ? sorter.field : "transactionDate") : "transactionDate",
        SortBy: sorter !== undefined ? (sorter.order !== undefined ? (sorter.order == "ascend" ? "asc" : "desc") : "desc") : "desc",
        Page: (paging.current).toString(),
        Size: (paging.pageSize).toString()
      },
    }).then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (data.length !== 0) {
            paging.total = parseInt(data[0].totalRowCount);
            self.setState({
              transactionsData: data,
              loading: false,
              pagination: paging
            });
            self.handleGetTransactionsCSV();
          } else {
            paging.total = 0
            self.setState({
              transactionsData: [],
              loading: false,
              pagination: paging
            });
          }
        } else {
          self.setState({
            transactionsData: [],
            loading: false,
            pagination: paging
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetTransactionsCSV() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "OnePayUserTransaction/CustomerTransactionHistory",
      headers: userAuthHeader(),
      data: {
        OrderID: "",
        TransactionID: "",
        TransactionDateFrom: null,
        TransactionDateTo: null,
        TransactionAmount: 0.0,
        UserName: "",
        MerchantName: "",
        PaymentProcessor: "",
        PaymentMethod: "",
        CustomerCard: "",
        PaymentStatus: "",
        SortColumn: "orderID",
        SortBy: "desc",
        Page: "1",
        Size: (this.state.pagination.total).toString()
      },
    })
      .then(function (res) {
        
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            transactionCSVData: data
          });

        } else {
          self.setState({
            transactionCSVData: []
          });
        }
      })
      .catch((data) => {
        self.setState({
          transactionCSVData: []
        });
      });
  }


  onShowSizeChange = (pagination, pagesize, sorter) => {
    this.handleGetTransactionsGridData(pagination, sorter)
  }

  handleSearch() {
    var pagination = {
      current: 1,
      pageSize: 10,
      total: 0
    }
    this.handleGetTransactionsGridData(pagination)
  }

  render() {
    function disabledDate(current) {
      // Can not select days before today and today
      return current > new Date();
    }
    const { placement, visibleFilter } = this.state;
    const headers = [
      { label: "Order ID", key: "orderId" },
      // { label: "Transaction ID", key: "transactionID" },
      // { label: "Transaction Date", key: "transactionDate" },
      { label: "Installments", key: "installment" },
      { label: "Amount Transacted (AU$)", key: "transactionAmount" },
      { label: "Merchant", key: "merchantName" },
      // { label: "Payment Processor", key: "paymentProcessor" },
      // { label: "Payment Method", key: "customerCard" },
      // { label: "Status", key: "paymentStatus" },
    ];
    const merchantinfo = (
      <div className="userDashpopover">
        <div className="subsc">
          <label>Bank Name</label>
          <label>ICICI Bank</label>
        </div>
        <div className="subsc">
          <label>Bank Branch</label>
          <label>Kandivali</label>
        </div>
      </div>
    );
    const columns = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant Order ID",
        dataIndex: "merchantOrderId",
        key: "merchantOrderId",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Transaction ID",
      //   dataIndex: "transactionID",
      //   key: "transactionID",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Transaction Date",
      //   dataIndex: "transactionDate",
      //   key: "transactionDate",
      //   className: "mob-none",
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
        className: "mob-none",
        render: (row, item) => {
          return (
            <div>
              <label>{item.isRefundSuccess ? "-$" : "$"}{item.transactionAmount}</label>
            </div>
          );
        },
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        className: "mob-none",
        sorter: true,
        sortDirections: ['ascend', 'descend', 'ascend']
      },
      // {
      //   title: "Refund Status",
      //   key: "refundStatus",
      //   dataIndex: "refundStatus",
      //   render: (row, item) => {
      //     return (item.isRefundSuccess === true ?
      //       "Refund Success" : "Refund Failed")
      //   }
      // }
      // {
      //   title: "Payment Processor",
      //   dataIndex: "paymentProcessor",
      //   key: "paymentProcessor",
      //   className: "mob-none",
      //   sorter: true,
      //   sortDirections: ['ascend', 'descend', 'ascend']
      // },
      // {
      //   title: "Payment Method ",
      //   dataIndex: "customerCard",
      //   key: "customerCard",
      //   className: "mob-none",
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
      //   className: "mob-none",
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
      //                 <label>{item.refundInitiated}</label>
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

    return (
      <div className="UserTrans">
        <h3 className="Usermana">Transactions</h3>
        <div className="exfilter">
          <CSVLink
            data={this.state.transactionCSVData}
            headers={headers}
            filename={"user-trasactions.csv"}
            className="csv"
          >
            <img src={CSV} alt="Export" />
            Export to CSV
          </CSVLink>
          <label
            className="filte"
            onClick={this.handleFilterbuttonClick.bind(this)}
          >
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
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Order Id"
                name="orderID"
                value={this.state.orderID}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Merchant Order Id"
                name="merchantorderId"
                value={this.state.merchantorderId}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Merchant Name"
                name="merchantName"
                value={this.state.merchantName}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Txn Id"
                name="transactionID"
                value={this.state.transactionID}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Payment Processor"
                name="paymentProcessor"
                value={this.state.paymentProcessor}
                onChange={this.handleOnChange.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3">
              <RangePicker
                className="calendar"
                format={dateFormat}
                onChange={this.handleDateOnChange}
                disabledDate={disabledDate}
              ></RangePicker>
            </div> */}
            {/* <div className="col-12 col-md-3">
              <input type="text" placeholder="Enter Total No. of Txn upto" />
            </div> */}
            {/* <div className="col-12 col-md-3">
              <label className="Totalamount">
                Total No. of Transaction upto
              </label>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
              </div>
            </div> */}
            {/* <div className="col-12 col-md-3">
              <label className="Totalamount">
                Total Amount Transacted upto
              </label>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" value="50" />
              </div>
            </div> */}
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Amount"
                name="transactionAmount"
                value={this.state.transactionAmount}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            {/* <div className="col-12 col-md-3">
              <input
                type="text"
                placeholder="Enter Payment method"
                name="paymentMethod"
                value={this.state.paymentMethod}
                onChange={this.handleOnChange.bind(this)}
              />
            </div> */}
            <div className="col-12 col-md-3">
              <div className="search text-left">
                <button className="m-0" onClick={this.handleSearch.bind(this)}>
                  Search
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="Userdashtable">
          <Table
            columns={columns}
            expandedRowRender={(row) => {
              return (
                <React.Fragment>
                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Order ID:</label>
                        <label className="expandemailtext">{row.orderId}</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Transaction ID:</label>
                        <label className="expandemailtext">{row.transactionID}</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Transaction Date:</label>
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
                        <label className="expandemail">Merchant:</label>
                        <label className="expandemailtext">{row.merchantName}</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Payment Processor:</label>
                        <label className="expandemailtext">{row.paymentProcessor}</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Payment Method:</label>
                        <label className="expandemailtext">{row.customerCard}</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Status:</label>
                        <label className="expandemailtext">{row.paymentStatus}</label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-12 col-sm-6 mb-3">
                      <div className="mobilevi">
                        <label className="expandemail">Status:</label>
                        <label className="expandemailtext">
                          {row.isActive ? "Active" : "Inactive"}
                        </label>
                      </div>
                    </div>
                  </div> */}
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
            expandIconColumnIndex={this.state.mobileView ? 10 : -1}
            expandIconAsCell={false}
            dataSource={this.state.transactionsData}
            pagination={{
              current: this.state.pagination.current,
              pageSize: this.state.pagination.pageSize,
              total: this.state.pagination.total,
              position: ["bottomCenter"],
              showSizeChanger: true
            }}
            onChange={this.onShowSizeChange}
          />
        </div>
        {/* <div className="pagination">
          <ul>
            <li>
              <a hrf="">&lt;</a>
            </li>
            <li className="active">
              <a hrf="">1</a>
            </li>
            <li>
              <a hrf="">2</a>
            </li>
            <li>
              <a hrf="">3</a>
            </li>
            <li>
              <a hrf="">4</a>
            </li>
            <li>
              <a hrf="">5</a>
            </li>
            <li>
              <a hrf="">&gt;</a>
            </li>
          </ul>
          <div className="selectopt">
            <select>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div> */}
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
                  <input
                    type="text"
                    placeholder="Enter Order Id"
                    name="orderID"
                    value={this.state.orderID}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Trasaction Id"
                    name="transactionID"
                    value={this.state.transactionID}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Payment Processor"
                    name="paymentProcessor"
                    value={this.state.paymentProcessor}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  {/* <input type="text" className="calendar"placeholder="Start Date - End Date"/> */}
                  <RangePicker
                    className="calendar"
                    format={dateFormat}
                    onChange={this.handleDateOnChange}
                    disabledDate={disabledDate}
                  ></RangePicker>
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total No. of Transaction upto"
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Total Amount Transacted upto"
                  />
                </div>
                {/* <div className="col-12 col-md-3">
                  <label className="Totalamount">
                    Total No. of Transaction upto
                  </label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value="50" />
                  </div>
                </div> */}
                {/* <div className="col-12 col-md-3">
                  <label className="Totalamount">
                    Total Amount Transacted upto
                  </label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value="50" />
                  </div>
                </div> */}
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    name="transactionAmount"
                    value={this.state.transactionAmount}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-3">
                  <input
                    type="text"
                    placeholder="Enter Payment method"
                    name="paymentMethod"
                    value={this.state.paymentMethod}
                    onChange={this.handleOnChange.bind(this)}
                  />
                </div>
                <div className="col-12 col-md-12">
                  <div className="search">
                    <button
                      onClick={this.onCloseFilter.bind(this)}
                      className="mr-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.handleGetTransactionsGridData.bind(this)}
                    >
                      Search
                    </button>
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

export default splitUserTransaction;
